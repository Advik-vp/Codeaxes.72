type ThumbnailMotif = 'rings' | 'grid' | 'nodes' | 'bars' | 'orbit' | 'hex'

interface ThumbnailOptions {
  title: string
  from: string
  to: string
  accent: string
  motif: ThumbnailMotif
}

function motifMarkup(motif: ThumbnailMotif, accent: string): string {
  switch (motif) {
    case 'rings':
      return `
        <circle cx="620" cy="160" r="90" fill="none" stroke="${accent}" stroke-width="2" opacity="0.45"/>
        <circle cx="620" cy="160" r="140" fill="none" stroke="${accent}" stroke-width="1.2" opacity="0.25"/>
        <circle cx="180" cy="360" r="70" fill="none" stroke="${accent}" stroke-width="2" opacity="0.35"/>
        <circle cx="180" cy="360" r="18" fill="${accent}" opacity="0.8"/>
      `
    case 'grid':
      return `
        <g stroke="${accent}" stroke-width="1" opacity="0.28">
          <path d="M80 80h640M80 160h640M80 240h640M80 320h640M80 400h640"/>
          <path d="M160 40v420M280 40v420M400 40v420M520 40v420M640 40v420"/>
        </g>
        <rect x="280" y="160" width="120" height="80" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7"/>
      `
    case 'nodes':
      return `
        <g fill="${accent}">
          <circle cx="180" cy="140" r="7"/><circle cx="340" cy="220" r="7"/>
          <circle cx="520" cy="120" r="7"/><circle cx="610" cy="280" r="7"/>
          <circle cx="250" cy="340" r="7"/><circle cx="430" cy="360" r="7"/>
        </g>
        <g stroke="${accent}" stroke-width="1.5" opacity="0.45" fill="none">
          <path d="M180 140L340 220L520 120L610 280L430 360L250 340Z"/>
        </g>
      `
    case 'bars':
      return `
        <g fill="${accent}" opacity="0.7">
          <rect x="140" y="260" width="48" height="140" rx="8"/>
          <rect x="220" y="200" width="48" height="200" rx="8"/>
          <rect x="300" y="140" width="48" height="260" rx="8"/>
          <rect x="380" y="180" width="48" height="220" rx="8"/>
          <rect x="460" y="100" width="48" height="300" rx="8"/>
          <rect x="540" y="220" width="48" height="180" rx="8"/>
        </g>
      `
    case 'orbit':
      return `
        <ellipse cx="400" cy="230" rx="240" ry="90" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.35"/>
        <ellipse cx="400" cy="230" rx="160" ry="160" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.25" transform="rotate(18 400 230)"/>
        <circle cx="400" cy="230" r="26" fill="${accent}"/>
        <circle cx="620" cy="230" r="10" fill="${accent}"/>
        <circle cx="210" cy="180" r="8" fill="${accent}" opacity="0.8"/>
      `
    case 'hex':
      return `
        <g fill="none" stroke="${accent}" stroke-width="1.6" opacity="0.45">
          <polygon points="400,90 510,155 510,285 400,350 290,285 290,155"/>
          <polygon points="400,140 470,180 470,260 400,300 330,260 330,180"/>
        </g>
        <circle cx="400" cy="220" r="14" fill="${accent}"/>
      `
  }
}

export function createProjectThumbnail({
  title,
  from,
  to,
  accent,
  motif,
}: ThumbnailOptions): string {
  const label = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="${accent}" opacity="0.22"/>
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#bg)"/>
      <rect width="800" height="500" fill="url(#dots)"/>
      <line x1="40" y1="40" x2="760" y2="40" stroke="${accent}" stroke-width="1" opacity="0.25"/>
      <line x1="40" y1="40" x2="40" y2="460" stroke="${accent}" stroke-width="1" opacity="0.25"/>
      ${motifMarkup(motif, accent)}
      <text x="56" y="430" fill="${accent}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="28" font-weight="700">${label}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
