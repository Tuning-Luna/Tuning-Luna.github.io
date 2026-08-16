// Playlist sourced straight from `src/assets/music/` — no registration list to
// maintain: drop an audio file in and it joins the playlist on the next build.
// Conventions:
//   • audio file name: `Title-Artist-Album.ext` (first two `-` segments are the
//     displayed title and artist, the rest is ignored)
//   • cover image (optional): same base name with an image extension
//     (`Song-X-Y.jpg` next to `Song-X-Y.mp3`)
//
// `import.meta.glob` with `eager` + `?url` resolves every file to its *final*
// asset URL at build time (hashed name under `/assets`, correct `base`), so the
// deployed page links straight to the files — nothing is resolved at runtime.

export interface Track {
  title: string
  artist: string
  url: string
  /** Build-time URL of the matching cover image, if one exists. */
  coverUrl?: string
}

const audioFiles = import.meta.glob('../assets/music/*.{mp3,m4a,ogg,wav,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const coverFiles = import.meta.glob('../assets/music/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const baseName = (path: string) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '')

const coverByBase = new Map(Object.keys(coverFiles).map((p) => [baseName(p), coverFiles[p]]))

/** Alphabetical order keeps the playlist stable across builds. */
export const TRACKS: Track[] = Object.entries(audioFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url]) => {
    const [title, artist] = baseName(path).split('-')
    return {
      title: title?.trim() ?? '',
      artist: artist?.trim() ?? '',
      url,
      coverUrl: coverByBase.get(baseName(path)),
    }
  })
