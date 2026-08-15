export default {
  nav: {
    about: 'About',
    stack: 'Tech Stack',
    projects: 'Projects',
    activity: 'Activity',
    contact: 'Contact',
  },
  hero: {
    role: 'CS Student @ Hefei University of Technology',
    tagline: 'Always Learning, Always Building',
    bio: "You read my bio. That's enough social interaction for one day.",
    ctaProjects: 'View Projects',
    ctaGithub: 'GitHub',
  },
  miniPlayer: {
    play: 'Play',
    pause: 'Pause',
    loading: 'Loading…',
    error: 'Audio failed to load',
  },
  about: {
    eyebrow: 'About',
    title: 'About Me',
    p1: "I'm Tuning-Luna, a Computer Science student at Hefei University of Technology (HFUT), XuanCheng campus.",
    p2: "I enjoy tinkering with technology and writing code: I turn coursework, labs and study notes into open-source projects (e.g. HFUT_XC_Study_Things), and build scrapers, reverse-engineering tools and full-stack apps along the way. I believe in “Always Learning, Always Building” — code is the closest thing to magic.",
    focusTitle: 'What I focus on',
    focus: [
      'Web Full-stack',
      'Scraping & Reverse Engineering',
      'Machine Learning',
      'Open Source & Study Materials',
    ],
  },
  stack: {
    eyebrow: 'Tech Stack',
    title: 'Tools & Technologies',
    subtitle: 'Self-reported stack from my GitHub profile README, cross-checked with my repositories.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Data & Databases',
      tools: 'Tools & DevOps',
    },
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Open Source',
    subtitle:
      'My repositories on GitHub — real star and fork counts as of the snapshot date. Forks are excluded.',
    featuredTitle: 'Featured',
    moreTitle: 'Course projects & more',
    stars: 'Stars',
    forks: 'Forks',
    homepage: 'Live demo',
    repo: 'Repository',
    archived: 'Archived',
    viewAll: 'View all repositories on GitHub',
    items: {
      'hfut-xc-study-things':
        'Study materials for the CS program at HFUT XuanCheng campus: coursework and lab solutions, review notes, past exams and slides for year 1–4, continuously updated.',
      'github-avatar-generator':
        '[Unofficial] Generate GitHub-style identicon avatars from any string.',
      'kards-scraper':
        'Automated crawler for Kards CCG card images — fetches all cards via the GraphQL API, organizes by nation & cost, converts AVIF to PNG.',
      'hfut-xc-login-reverse':
        'Reverse engineering of the HFUT XuanCheng campus login (CAS).',
      'tuning-bao':
        'An e-commerce shopping template built with UniApp, covering home, categories, product detail, cart and checkout modules.',
      'tenant-hub': 'A simple React RBAC (role-based access control) project.',
      'react-message-board':
        'Computer networking course project: an online message board.',
      'question-bank-management-system':
        'Database course project: a question-bank management system for a school.',
      'movie-recommender':
        'Machine learning course project: a movie recommendation system using user-based collaborative filtering.',
      'my-new-tab-html': 'A simple Chrome new-tab extension.',
      'hairdressing-member-manager-system':
        'A hair salon membership management system built with Tauri + SQLite + Element Plus.',
      'class-quiz-system': 'Programming course project: an in-class quiz system.',
      'sky-takeout':
        '[Archived] Full-stack food delivery system: Spring Boot (Java) backend + Vue 3 + Vite frontend.',
    },
  },
  activity: {
    eyebrow: 'Activity',
    title: 'GitHub Activity',
    subtitle: 'Public contribution statistics, snapshot from the GitHub API.',
    stats: {
      totalStars: 'Total stars',
      publicRepos: 'Public repos',
      followers: 'Followers',
      totalCommits: 'Commits',
    },
    yearsLabel: 'Active since',
    note: 'Snapshot retrieved 2026-08-14.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Find Me',
    subtitle: 'Open-source projects and my music.',
    github: { label: 'GitHub', desc: 'Open source & code' },
    gmail: { label: 'Gmail', desc: 'Email me' },
    discord: { label: 'Discord', desc: 'Chat with me' },
    telegram: { label: 'Telegram', desc: 'Message me' },
    spotify: { label: 'Spotify', desc: 'My playlists' },
  },
  nowPlaying: {
    eyebrow: 'Spotify',
    title: 'Now Playing',
    subtitle: "What I'm listening to on Spotify right now.",
    alt: 'Now playing on Spotify',
  },
  footer: {
    builtWith: 'Built with React & Material Design 3',
    snapshotNote: 'Content is a snapshot of public GitHub data (2026-08-14).',
  },
  a11y: {
    theme: 'Toggle color theme',
    language: 'Switch language to Chinese',
    backToTop: 'Back to top',
    openExternal: 'Opens in a new tab',
  },
}
