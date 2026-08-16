import { useTranslation } from 'react-i18next'
import { Icon } from '../components/Icon'
import { IconButton } from '../components/IconButton'
import { Section } from '../components/Section'
import { Slider } from '../components/Slider'
import { SmartImage } from '../components/SmartImage'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { handleSpotlight } from '../hooks/useSpotlight'
import './MiniPlayer.css'

/** Wheel notches step the volume by this much (%). */
const VOLUME_WHEEL_STEP = 5

/**
 * MD3 music player UI: album cover + track info + transport controls
 * (previous / play-pause / next) and a volume slider. All audio behaviour —
 * buffering states, track switching with fades, volume persistence and mute
 * glides — lives in the headless `useAudioPlayer` hook; this section only
 * renders its state (loading spinner, error retry, play/pause crossfade).
 */
export function MiniPlayer() {
  const { t } = useTranslation()
  const {
    audioRef,
    track,
    status,
    showLoading,
    toggle,
    prev,
    next,
    muted,
    displayVolume,
    onVolumeInput,
    toggleMute,
  } = useAudioPlayer()

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
