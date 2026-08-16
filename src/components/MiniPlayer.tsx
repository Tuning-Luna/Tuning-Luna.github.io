import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TRACKS } from '../data/tracks'
import { handleSpotlight } from '../hooks/useSpotlight'
import {
  easingEmphasizedAccelerate,
  easingEmphasizedDecelerate,
  prefersReducedMotion,
  tween,
  type TweenHandle,
} from '../utils/motion'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { Section } from './Section'
import { Slider } from './Slider'
import { SmartImage } from './SmartImage'
import './MiniPlayer.css'

/** Only show the loading spinner once buffering has persisted this long. */
const SPINNER_DELAY_MS = 250
/** "Previous" restarts the current track instead of skipping back past this. */
const PREV_RESTART_S = 3
/** Volume persists alongside the theme/language prefs in localStorage. */
const VOLUME_KEY = 'tuning-luna-volume'
const DEFAULT_VOLUME = 50

// Motion timings follow the project's MD3 token scale (tokens.css:
// duration-short1 = 100ms, short2 = 200ms, short3 = 300ms). Curves come from
// the official md.sys.motion.easing.* tokens: emphasized-decelerate for
// arriving motion (glides, fade-in), emphasized-accelerate for leaving
// motion (mute retreat, fade-out).
const GLIDE_MS = 200 // slider click-jump glide
const MUTE_GLIDE_MS = 100 // mute snaps the handle to zero faster than it returns
const FADE_OUT_MS = 200 // leaving a track
const FADE_IN_MS = 300 // entering a track
/** Wheel notches step the volume by this much (%). */
const VOLUME_WHEEL_STEP = 5
// Volume jumps smaller than this apply instantly (drags, keyboard nudges);
// larger click-jumps glide from the previous position instead of teleporting.
const VOLUME_GLIDE_THRESHOLD = 8

/**
 * MD3 music player: album cover + track info + transport controls (previous /
 * play-pause / next) and a volume slider. The playlist comes from
 * `src/data/tracks` (every file in `src/assets/music/`), with playback URLs
 * already resolved to their final hashed asset paths at build time.
 *
 * `preload="metadata"` fetches just the audio header on page load (a few KB),
 * so a broken or unreachable file surfaces as an error state early. The full
 * file is still only downloaded when the visitor presses play.
 *
 * States: idle → loading (buffering) → ready/playing, or error (retryable).
 * Switching tracks fades the audio out/in; click-jumps on the volume slider
 * glide from the previous position; muting glides the volume handle to zero.
 * All animation collapses to instant changes under `prefers-reduced-motion`
 * (audio fades are kept — they prevent clicks, not motion).
 */
type Status = 'idle' | 'loading' | 'ready' | 'playing' | 'error'

const loadVolume = (): number => {
  try {
    const raw = localStorage.getItem(VOLUME_KEY)
    if (raw !== null) {
      const n = Number(raw)
      if (Number.isFinite(n)) return Math.min(100, Math.max(0, Math.round(n)))
    }
  } catch {
    // localStorage unavailable (blocked, private mode…) — use the default.
  }
  return DEFAULT_VOLUME
}

export function MiniPlayer() {
  const { t } = useTranslation()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [showLoading, setShowLoading] = useState(false)
  const [volume, setVolume] = useState<number>(loadVolume)
  const [muted, setMuted] = useState(false)
  /** Volume-handle position while it glides to/from zero on (un)mute; the
   *  remembered `volume` is untouched. */
  const [muteGlide, setMuteGlide] = useState<number | null>(null)
  /** Set before a track switch: the new track should start playing right away. */
  const resumeRef = useRef(false)
  /** Latest volume/muted for animation callbacks (no stale closures). */
  const volumeRef = useRef(volume)
  const mutedRef = useRef(muted)
  /** Track-switch fade multiplier: audio.volume = base × gain. */
  const gainRef = useRef(1)
  const fadeTweenRef = useRef<TweenHandle | null>(null)
  const fadeSettleRef = useRef<(() => void) | null>(null)
  const volumeGlideRef = useRef<TweenHandle | null>(null)
  const muteGlideRef = useRef<TweenHandle | null>(null)
  /** Bumped on every switch attempt; a number change mid-fade aborts the
   *  stale switch (rapid next/next/prev, or pausing during a fade). */
  const switchSeqRef = useRef(0)

  const track = TRACKS[index]

  /** Single place that writes the element volume: base (volume/mute state)
   *  times the switch-fade gain. Reads refs so animation frames never act on
   *  stale state. */
  const applyAudioVolume = useCallback(() => {
    const audio = audioRef.current
    if (audio) audio.volume = (mutedRef.current ? 0 : volumeRef.current / 100) * gainRef.current
  }, [])

  /** Fade the switch gain toward `target` (0..1). The returned promise always
   *  settles — including when superseded by a newer fade — so an awaiting
   *  track switch can proceed and bail on its sequence guard. */
  const fadeGain = useCallback(
    (target: number, durationMs: number) =>
      new Promise<void>((resolve) => {
        fadeSettleRef.current?.()
        fadeTweenRef.current?.cancel()
        let settled = false
        const settle = () => {
          if (settled) return
          settled = true
          resolve()
        }
        fadeSettleRef.current = settle
        fadeTweenRef.current = tween(
          gainRef.current,
          target,
          durationMs,
          target > gainRef.current ? easingEmphasizedDecelerate : easingEmphasizedAccelerate,
          (g) => {
            gainRef.current = g
            applyAudioVolume()
          },
          () => {
            fadeSettleRef.current = null
            fadeTweenRef.current = null
            settle()
          },
        )
      }),
    [applyAudioVolume],
  )

  /** Abort any fade and restore full gain (used when playback stops, so the
   *  next manual play isn't stuck at a partially faded volume). */
  const resetGain = useCallback(() => {
    fadeSettleRef.current?.()
    fadeSettleRef.current = null
    fadeTweenRef.current?.cancel()
    fadeTweenRef.current = null
    gainRef.current = 1
    applyAudioVolume()
  }, [applyAudioVolume])

  // Follow the real audio element state so the controls always match what the
  // browser is doing (buffering, blocked autoplay, ended, load failure).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setStatus('playing')
    const onPause = () => setStatus('ready')
    const onWaiting = () => setStatus('loading')
    // 'playing' (not 'play') is what fires when playback resumes after a
    // buffering stall, e.g. while scrubbing — without it the button would
    // flip back to "play" while the audio keeps sounding.
    const onPlaying = () => setStatus('playing')
    const onCanPlay = () => setStatus(audio.paused ? 'ready' : 'playing')
    const onError = () => setStatus('error')
    // A finished track advances the playlist and keeps playing (fading in).
    const onEnded = () => {
      if (TRACKS.length === 1) {
        audio.currentTime = 0
        gainRef.current = 0
        applyAudioVolume()
        void audio.play().catch(() => setStatus('error'))
        void fadeGain(1, FADE_IN_MS)
        return
      }
      resumeRef.current = true
      setIndex((i) => (i + 1) % TRACKS.length)
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
    }
  }, [applyAudioVolume, fadeGain])

  // Debounce the loading indicator: only surface it when buffering actually
  // persists, so an instant start goes straight play → pause with no flash.
  useEffect(() => {
    if (status !== 'loading') return
    const id = window.setTimeout(() => setShowLoading(true), SPINNER_DELAY_MS)
    return () => {
      window.clearTimeout(id)
      setShowLoading(false)
    }
  }, [status])

  useEffect(() => {
    volumeRef.current = volume
    mutedRef.current = muted
    applyAudioVolume()
  }, [volume, muted, applyAudioVolume])

  useEffect(() => {
    try {
      localStorage.setItem(VOLUME_KEY, String(volume))
    } catch {
      // Storage unavailable — volume just won't persist.
    }
  }, [volume])

  // Runs after a track switch has committed the new `src` attribute. The
  // per-track state was already reset in the switch handler; all that is left
  // is resuming playback (fading in) when the switch happened mid-song.
  useEffect(() => {
    const audio = audioRef.current
    if (audio && resumeRef.current) {
      resumeRef.current = false
      gainRef.current = 0
      applyAudioVolume()
      // Autoplay can still be blocked (e.g. strict mode after an auto-advance);
      // that is a paused player, not a broken one.
      void audio.play().catch((err: DOMException) => setStatus(err.name === 'NotAllowedError' ? 'ready' : 'error'))
      void fadeGain(1, FADE_IN_MS)
    }
  }, [index, applyAudioVolume, fadeGain])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || status === 'loading') return
    if (status === 'error') {
      // Retry a failed load by re-requesting the source.
      audio.load()
      setStatus('loading')
      void audio.play().catch(() => setStatus('error'))
      return
    }
    if (audio.paused) {
      // No optimistic loading state — the browser's 'waiting' event (debounced
      // above) shows the spinner only if data is genuinely slow to arrive.
      // play() can reject when the browser blocks autoplay or the load fails.
      void audio.play().catch(() => setStatus('error'))
    } else {
      // Pausing also invalidates any in-flight faded switch and restores full
      // gain for the next manual play.
      switchSeqRef.current++
      resetGain()
      audio.pause()
    }
  }

  const goTo = async (target: number, resume: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    const seq = ++switchSeqRef.current
    // Only audible playback needs a fade-out first.
    const audible = resume && !mutedRef.current && volumeRef.current > 0
    if (audible) {
      await fadeGain(0, FADE_OUT_MS)
      if (switchSeqRef.current !== seq) return
    }
    if (target === index) {
      // Wrapping around a one-track playlist: restart instead of switching
      // (setIndex would bail out on the unchanged value).
      audio.currentTime = 0
      if (resume) {
        gainRef.current = 0
        applyAudioVolume()
        void audio.play().catch(() => setStatus('error'))
        void fadeGain(1, FADE_IN_MS)
      }
      return
    }
    // Drop the outgoing track's stale status; the new one starts fresh once
    // its metadata arrives.
    resumeRef.current = resume
    setStatus('idle')
    setIndex(target)
  }

  const prev = () => {
    const audio = audioRef.current
    // Standard player behavior: "previous" restarts a track that is well
    // underway, and only skips back on a second press.
    if (audio && audio.currentTime > PREV_RESTART_S) {
      switchSeqRef.current++
      resetGain()
      audio.currentTime = 0
      return
    }
    void goTo((index - 1 + TRACKS.length) % TRACKS.length, audio ? !audio.paused : false)
  }

  const next = () => {
    const audio = audioRef.current
    void goTo((index + 1) % TRACKS.length, audio ? !audio.paused : false)
  }

  const onVolumeInput = (target: number) => {
    volumeGlideRef.current?.cancel()
    volumeGlideRef.current = null
    muteGlideRef.current?.cancel()
    muteGlideRef.current = null
    // Glide from wherever the handle visibly is (mid-glide value, or zero
    // while muted) so consecutive animations stay continuous.
    const from = muteGlide ?? (muted ? 0 : volume)
    setMuted(false)
    setMuteGlide(null)
    if (Math.abs(target - from) > VOLUME_GLIDE_THRESHOLD && !prefersReducedMotion()) {
      // Set the origin synchronously with the unmute so the first painted
      // frame holds the current position — the tween's first rAF frame would
      // otherwise arrive a paint too late and read as a jump. Animating the
      // volume state itself means the audible level follows the handle.
      setVolume(from)
      volumeGlideRef.current = tween(from, target, GLIDE_MS, easingEmphasizedDecelerate, (v) => setVolume(v), () => {
        volumeGlideRef.current = null
      })
    } else {
      setVolume(target)
    }
  }

  const toggleMute = () => {
    volumeGlideRef.current?.cancel()
    volumeGlideRef.current = null
    muteGlideRef.current?.cancel()
    muteGlideRef.current = null
    const next = !muted
    const from = muteGlide ?? (muted ? 0 : volume)
    const to = next ? 0 : volume
    setMuted(next) // the audio mutes instantly; only the handle glides
    if (prefersReducedMotion() || from === to) {
      setMuteGlide(null)
      return
    }
    // Same synchronous-origin trick as above: without it, the frame between
    // the click and the tween's first rAF callback shows the destination
    // value (0 / the stored volume) and the handle visibly jumps.
    setMuteGlide(from)
    muteGlideRef.current = tween(
      from,
      to,
      next ? MUTE_GLIDE_MS : GLIDE_MS,
      next ? easingEmphasizedAccelerate : easingEmphasizedDecelerate,
      (v) => setMuteGlide(v),
      () => {
        muteGlideRef.current = null
        setMuteGlide(null)
      },
    )
  }

  if (!track) return null

  const isError = status === 'error'
  const isPlaying = status === 'playing'
  const label = isError
    ? t('miniPlayer.error')
    : showLoading
      ? t('miniPlayer.loading')
      : isPlaying
        ? t('miniPlayer.pause')
        : t('miniPlayer.play')
  const displayVolume = muteGlide ?? (muted ? 0 : volume)
  const volumeIcon = displayVolume === 0 ? 'volumeMute' : displayVolume < 50 ? 'volumeLow' : 'volumeHigh'

  return (
    <Section
      id="mini-player"
      eyebrow={t('miniPlayer.eyebrow')}
      title={t('miniPlayer.title')}
      subtitle={t('miniPlayer.subtitle')}
    >
      <div className="mini-player spotlight" onMouseMove={handleSpotlight}>
        <audio ref={audioRef} src={track.url} preload="metadata" />
        <div className="mini-player__main">
          <SmartImage
            className="mini-player__cover"
            src={track.coverUrl}
            alt=""
            width={56}
            height={56}
            fallback={<Icon name="music" size={24} />}
          />
          <span className="mini-player__info">
            <span className="mini-player__title">{track.title}</span>
            <span className="mini-player__artist">{track.artist}</span>
          </span>
          <span className="mini-player__transport">
            <IconButton
              icon="skipBack"
              label={t('miniPlayer.prev')}
              className="mini-player__skip"
              onClick={prev}
            />
            <button
              type="button"
              className={[
                'mini-player__play',
                isError ? 'is-error' : '',
                isPlaying ? 'is-playing' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={label}
              title={label}
              disabled={showLoading}
              onClick={toggle}
            >
              {isError ? (
                <Icon name="alert" size={24} />
              ) : showLoading ? (
                <span className="mini-player__spinner" aria-hidden="true" />
              ) : (
                <span className="mini-player__icons" aria-hidden="true">
                  <Icon name="play" size={24} className="mini-player__icon mini-player__icon--play" />
                  <Icon name="pause" size={24} className="mini-player__icon mini-player__icon--pause" />
                </span>
              )}
            </button>
            <IconButton
              icon="skipForward"
              label={t('miniPlayer.next')}
              className="mini-player__skip"
              onClick={next}
            />
          </span>
        </div>
        <div className="mini-player__volume">
          <IconButton
            icon={volumeIcon}
            label={muted ? t('miniPlayer.unmute') : t('miniPlayer.mute')}
            className="mini-player__mute"
            onClick={toggleMute}
          />
          <Slider
            label={t('miniPlayer.volume')}
            value={displayVolume}
            max={100}
            wheelStep={VOLUME_WHEEL_STEP}
            valueText={`${Math.round(displayVolume)}%`}
            onChange={onVolumeInput}
          />
        </div>
      </div>
    </Section>
  )
}
