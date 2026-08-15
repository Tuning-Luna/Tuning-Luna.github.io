import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'
import { profile } from '../data/profile'
import './NowPlaying.css'

// Card rendered by the spotify-github-profile service — the same embed used in
// the GitHub profile README (Tuning-Luna/Tuning-Luna). It shows the currently
// playing track, or the last one played. `border_radius=16` matches this site's
// M3 shape scale (corner-large).
const SPOTIFY_CARD_URL = `https://spotify-github-profile.kittinanx.com/api/view?uid=${profile.spotifyUid}&cover_image=true&theme=novatorem&show_offline=false&background_color=121212&interchange=false&profanity=false&bar_color=53b14f&bar_color_cover=false&border_radius=16`

// The same service redirects straight to the currently playing track (302 →
// spotify:track) when given `redirect=true`; using it as the card href makes a
// click land on what's playing instead of the account's Spotify profile page.
const SPOTIFY_REDIRECT_URL = `https://spotify-github-profile.kittinanx.com/api/view?uid=${profile.spotifyUid}&redirect=true`

export function NowPlaying() {
  const { t } = useTranslation()

  return (
    <Section
      id="now-playing"
      eyebrow={t('nowPlaying.eyebrow')}
      title={t('nowPlaying.title')}
      subtitle={t('nowPlaying.subtitle')}
    >
      <a
        className="now-playing__card"
        href={SPOTIFY_REDIRECT_URL}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={t('nowPlaying.alt')}
      >
        <img
          src={SPOTIFY_CARD_URL}
          alt=""
          width={320}
          height={100}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </a>
    </Section>
  )
}
