import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import coverUrl from '../assets/stan-cover.jpg'
import audioUrl from '../assets/Stan-Eminem Dido-The_Marshall_Mathers_LP.mp3'
import { handleSpotlight } from '../hooks/useSpotlight'
import { Icon } from './Icon'
import { Section } from './Section'
import './MiniPlayer.css'

const TRACK = { title: 'Stan', artist: 'Eminem Dido' }

/**
 * Minimal MD3 music player: album cover + track info + play/pause button.
 *
 * `preload="metadata"` fetches just the audio header on page load (a few KB), so
 * a broken or unreachable file surfaces as an error state early. The full file
 * is still only downloaded when the visitor presses play.
 *
 * States: idle → loading (buffering) → ready/playing, or error (retryable).
 * The loading spinner is debounced (~250ms) so a fast start never flashes it;
 * the play/pause icons crossfade through an MD3-style transition.
 */
type Status = 'idle' | 'loading' | 'ready' | 'playing' | 'error'

/** Only show the loading spinner once buffering has persisted this long. */
const SPINNER_DELAY_MS = 250

export function MiniPlayer() {
  const { t } = useTranslation()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [showLoading, setShowLoading] = useState(false)

  // Follow the real audio element state so the button always matches what the
  // browser is doing (buffering, blocked autoplay, ended, load failure).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setStatus('playing')
    const onPause = () => setStatus('ready')
    const onWaiting = () => setStatus('loading')
    const onCanPlay = () => setStatus((s) => (s === 'playing' ? s : 'ready'))
    const onError = () => setStatus('error')

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
    }
  }, [])

  // Debounce the loading indicator: only surface it when buffering actually
  // persists, so an instant start goes straight play → pause with no flash.
  // State changes happen only inside the timeout callback / cleanup, never
  // synchronously in the effect body.
  useEffect(() => {
    if (status !== 'loading') return
    const id = window.setTimeout(() => setShowLoading(true), SPINNER_DELAY_MS)
    return () => {
      window.clearTimeout(id)
      setShowLoading(false)
    }
  }, [status])

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
      audio.pause()
    }
  }

  const isError = status === 'error'
  const isPlaying = status === 'playing'
  const label = isError
    ? t('miniPlayer.error')
    : showLoading
      ? t('miniPlayer.loading')
      : isPlaying
        ? t('miniPlayer.pause')
        : t('miniPlayer.play')

  return (
    <Section
      id="mini-player"
      eyebrow={t('miniPlayer.eyebrow')}
      title={t('miniPlayer.title')}
      subtitle={t('miniPlayer.subtitle')}
    >
      <div className="mini-player spotlight" onMouseMove={handleSpotlight}>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        <img className="mini-player__cover" src={coverUrl} alt="" />
        <span className="mini-player__info">
          <span className="mini-player__title">{TRACK.title}</span>
          <span className="mini-player__artist">{TRACK.artist}</span>
        </span>
        <button
          type="button"
          className={['mini-player__play', isError ? 'is-error' : '', isPlaying ? 'is-playing' : '']
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
      </div>
    </Section>
  )
}
