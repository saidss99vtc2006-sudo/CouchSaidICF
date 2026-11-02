// Makes the app installable on every host.
// - On full hosting (Netlify / preview server) the static manifest.webmanifest is used.
// - On hosts that only serve index.html (e.g. arena.site) a manifest is built in-page,
//   with PNG icons rendered at runtime from an embedded SVG (no binary files needed).

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d2a8a"/><stop offset="1" stop-color="#071a5c"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".55" stop-color="#f5b82e"/><stop offset="1" stop-color="#d98a0b"/></linearGradient></defs><rect width="512" height="512" fill="url(#bg)"/><path d="M206 300 L160 400 L200 388 L222 424 L262 324 Z" fill="url(#g)"/><path d="M306 300 L352 400 L312 388 L290 424 L250 324 Z" fill="url(#g)"/><g transform="translate(256 220)"><path fill="url(#g)" d="M0-112 L22-104 L44-108 L58-90 L80-84 L86-62 L104-48 L102-26 L112-6 L102 14 L104 36 L86 50 L80 72 L58 78 L44 96 L22 92 L0 100 L-22 92 L-44 96 L-58 78 L-80 72 L-86 50 L-104 36 L-102 14 L-112-6 L-102-26 L-104-48 L-86-62 L-80-84 L-58-90 L-44-108 L-22-104 Z"/><circle r="70" cy="-6" fill="none" stroke="#c2780a" stroke-width="9"/><path fill="#c2780a" d="M0-52 L13-18 L49-17 L21 5 L31 40 L0 19 L-31 40 L-21 5 L-49-17 L-13-18 Z"/></g></svg>`;

const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(ICON_SVG);

function addLink(rel: string, href: string, extra: Record<string, string> = {}) {
  const l = document.createElement('link');
  l.rel = rel;
  l.href = href;
  Object.entries(extra).forEach(([k, v]) => l.setAttribute(k, v));
  document.head.appendChild(l);
}

function renderPng(size: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');
      if (!ctx) return resolve(svgDataUrl);
      ctx.drawImage(img, 0, 0, size, size);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = () => resolve(svgDataUrl);
    img.src = svgDataUrl;
  });
}

async function buildInlineManifest() {
  const [i192, i512] = await Promise.all([renderPng(192), renderPng(512)]);
  const startUrl = window.location.origin + window.location.pathname;
  const manifest = {
    name: 'خبير الكوتشينج المعتمد ICF',
    short_name: 'ICF Coach',
    description: 'مساعد ذكي لشرح جدارات وأخلاقيات ICF والتحضير لامتحان ACC - تصميم: سعيد العلوي - البريمي، عُمان',
    lang: 'ar',
    dir: 'rtl',
    start_url: startUrl,
    scope: startUrl,
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f8fafc',
    theme_color: '#0b1f6b',
    categories: ['education', 'productivity'],
    icons: [
      { src: i192, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: i512, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: i512, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
  document.head.querySelectorAll('link[rel="manifest"]').forEach((n) => n.remove());
  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' });
  addLink('manifest', URL.createObjectURL(blob));
  addLink('apple-touch-icon', i192);
}

export function setupPwa() {
  addLink('icon', svgDataUrl, { type: 'image/svg+xml' });

  // Keep the static manifest if the host serves it; otherwise build one in-page.
  fetch('./manifest.webmanifest', { method: 'GET', cache: 'no-store' })
    .then((r) => {
      const ok = r.ok && (r.headers.get('content-type') || '').includes('json');
      if (ok) {
        addLink('apple-touch-icon', svgDataUrl);
      } else {
        buildInlineManifest();
      }
    })
    .catch(() => buildInlineManifest());
}
