// Artwork for every section below the hero (the hero's pieces are in assets/hero). Our own
// AI-generated images, hosted on Cloudinary. Every source is 1024×768, so each is reshaped by URL to
// its slot (the sizes of the live site's files):
//   - e_upscale (4×) where the image fills the screen or a wide card, so it isn't soft
//   - b_gen_fill to extend a 4:3 picture to a portrait or 16:9 slot without cropping anyone out
//   - c_crop / c_fill where a crop keeps everything that matters
// Two pieces are local: the Archive card is the hero's pieces without the logo (assets/ai), and the
// Full Build box art is the hero's square poster laid over our palm backdrop.
// Some of the generated images carry GTA branding (a "VI" cap, a "Vice City" sticker), so they're not
// used; check new ones for that.
import archive from './assets/ai/archive.webp'
import box from './assets/hero/mobile/poster.avif'

const cld = (cloud) => (transform, id) => `https://res.cloudinary.com/${cloud}/image/upload/${transform}/f_auto,q_auto/${id}`
const a = cld('dtwvlmxqc')
const b = cld('dsv75w4yk')

const SCENE = 'lnhxfv5tt5jf9yskxqli'

export const ART = {
  // Showreel
  scene: a('e_upscale/w_2560', SCENE),
  // Case study cards, 27:40 like the live site's trailer cards. The dock scene is cropped instead of
  // extended: generative fill comes back blurred for it (moderated), and a crop centred on the pair
  // keeps both in.
  extendedLook: b('c_pad,ar_27:40,b_gen_fill,w_1080', 'ej9oeh0fxtq0uxdi3sup'),
  trailer2: b('e_upscale/c_crop,h_3072,ar_27:40,g_xy_center,x_1640,y_1536/w_1080', 'lselglw3eupdpp5glfb9'),
  trailer1: b('c_pad,ar_27:40,b_gen_fill,w_1080', 'tu1bj9zcwtjtaugtcyjh'),

  // Work with Jarvis: a still for the backdrop, and the Full Build card's backdrop at the card's
  // shapes (37:20 on desktop; 1080:1990 on phones, extended with a prompt so it stays a clean gradient).
  // The still has their heads at the top edge, so sky is generated above it first (then sides for
  // 16:9): a cover crop plus the 1.1 scroll zoom would otherwise cut them off. Framed like the footage.
  backdrop: b('c_pad,w_1024,h_960,g_south,b_gen_fill/c_pad,ar_16:9,b_gen_fill/e_upscale/w_2560', 'pqxasb2gvmwc6tflpvms'),
  backdropMobile: b('c_pad,w_1024,h_960,g_south,b_gen_fill/e_upscale/c_fill,ar_9:16,g_auto,w_1216', 'pqxasb2gvmwc6tflpvms'),
  ultimate: b('c_fill,ar_37:20,w_1920', 'i5mffzhp6zrspwpwhzgt'),
  ultimateMobile: b(
    'c_pad,ar_1080:1990,b_gen_fill:prompt_smooth%20dark%20indigo%20to%20magenta%20to%20peach%20gradient%20with%20blurred%20palm%20frond%20silhouettes,w_1080',
    'i5mffzhp6zrspwpwhzgt',
  ),
  ultimateBox: box,
  // Phones show the Motion Pass card portrait; the left part of the picture keeps both of them in
  vintage: b('e_upscale/w_2560', 'zdnguslxwv2co5bwl05e'),
  vintageMobile: b('e_upscale/c_fill,ar_3:4,g_west,w_1080', 'zdnguslxwv2co5bwl05e'),

  // Selected Work (3:2 cards)
  merch: b('e_upscale/w_1600', 'veut6xwhzvystikhgzxz'),
  archive,

  // Writing & Talks (16:9). The first article reuses the showreel scene, the second the backdrop still.
  newsTrailer: a('c_fill,ar_16:9,g_auto,w_1280', SCENE),
  newsStills: b('c_fill,ar_16:9,g_auto,w_1280', 'pqxasb2gvmwc6tflpvms'),
  newsRadio: b('c_fill,ar_16:9,g_auto,w_1280', 'zkkcatojixzo0cwqmqvk'),
}
