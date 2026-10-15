// Image sets for the hero. Each image has a desktop (16:9) and a mobile (square) version with the
// same name; every layer is a full canvas with its piece already in place.

const byName = (files) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.avif', ''), url]))

const original = {
  desktop: byName(import.meta.glob('./assets/hero/desktop/*.avif', { eager: true, import: 'default' })),
  mobile: byName(import.meta.glob('./assets/hero/mobile/*.avif', { eager: true, import: 'default' })),
}

// The /ai page: our own AI-generated panels cut to the same shapes (see assets/hero-ai).
// It has its own poster and pieces and keeps the original logo layers.
const ai = {
  desktop: { ...original.desktop, ...byName(import.meta.glob('./assets/hero-ai/desktop/*.avif', { eager: true, import: 'default' })) },
  mobile: { ...original.mobile, ...byName(import.meta.glob('./assets/hero-ai/mobile/*.avif', { eager: true, import: 'default' })) },
}

export const HERO_IMAGES = { original, ai }
