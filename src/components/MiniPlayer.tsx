import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import coverUrl from '../assets/stan-cover.jpg'
import audioUrl from '../assets/Stan-Eminem Dido-The_Marshall_Mathers_LP.mp3'
import { Icon } from './Icon'
import './MiniPlayer.css'

const TRACK = { title: 'Stan', artist: 'Eminem Dido' }

/**
 * Minimal MD3 music player: album cover + track info + play/pause button.
 * The audio is not preloaded (`preload="none"`) so the file is only fetched
 * once the visitor presses play.
 */
export function MiniPlayer() {
  const { t } = useTranslation()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  // Sync the button with the real audio state (also covers autoplay-block
  // failures and when the track ends on its own).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      // play() can reject when the browser blocks autoplay.
      void audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }

  return (
    <div className="mini-player">
      <audio ref={audioRef} src={audioUrl} preload="none" />
      <img className="mini-player__cover" src={coverUrl} alt="" />
      <span className="mini-player__info">
        <span className="mini-player__title">{TRACK.title}</span>
        <span className="mini-player__artist">{TRACK.artist}</span>
      </span>
      <button
        type="button"
        className="mini-player__play"
        aria-label={playing ? t('miniPlayer.pause') : t('miniPlayer.play')}
        onClick={toggle}
      >
        <Icon name={playing ? 'pause' : 'play'} size={24} />
      </button>
    </div>
  )
}
