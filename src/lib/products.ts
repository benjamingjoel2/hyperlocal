import type { Category, ColorOption, Product } from "./types";

const TEE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const HOODIE_SIZES = ["S", "M", "L", "XL", "XXL"];

const NATURAL: ColorOption = { name: "Natural", hex: "#efe6d6" };
const BLACK: ColorOption = { name: "Black", hex: "#1c1c1c" };
const NAVY: ColorOption = { name: "Navy", hex: "#1f2a44" };
const SAND: ColorOption = { name: "Sand", hex: "#d9c3a3" };
const FOREST: ColorOption = { name: "Forest", hex: "#2f4a3d" };
const TERRACOTTA: ColorOption = { name: "Terracotta", hex: "#b3573f" };
const WHITE: ColorOption = { name: "White", hex: "#f7f7f5" };
const OATMEAL: ColorOption = { name: "Oatmeal", hex: "#d6cdbf" };

export const categoryLabels: Record<Category, string> = {
  tees: "Tees",
  hoodies: "Hoodies",
  hats: "Hats",
  totes: "Totes",
  posters: "Posters",
  pins: "Pins",
  stickers: "Stickers",
  mugs: "Mugs",
};

export const categories = Object.keys(categoryLabels) as Category[];

const TEE_DETAILS = [
  "100% organic ring-spun cotton, 180 gsm",
  "Water-based screen print that softens with washing",
  "Relaxed unisex fit, pre-shrunk",
  "Printed to order in small batches",
];

const HOODIE_DETAILS = [
  "80% organic cotton / 20% recycled polyester fleece, 350 gsm",
  "Brushed interior, double-lined hood, kangaroo pocket",
  "Embroidered chest mark, printed back graphic",
  "Relaxed unisex fit",
];

const HAT_DETAILS = [
  "Six-panel unstructured cap, washed cotton twill",
  "Embroidered front graphic",
  "Brass slide buckle, one size fits most",
];

const TOTE_DETAILS = [
  "Heavyweight 12 oz recycled cotton canvas",
  "Reinforced 25 in. shoulder straps",
  "Interior slip pocket",
  "15 × 16 × 4 in.",
];

const POSTER_DETAILS = [
  "Giclée print on 200 gsm archival matte paper",
  "Available in 12 × 16 in. and 18 × 24 in.",
  "Ships rolled in a kraft tube",
  "Frame not included",
];

const PIN_DETAILS = [
  "Hard enamel with polished brass plating",
  "1.25 in. wide, double butterfly clutch",
  "Backed on a letterpressed card",
];

const STICKER_DETAILS = [
  "Weatherproof matte vinyl, 3 in. wide",
  "UV-resistant for water bottles, laptops and panniers",
  "Peels clean, no residue",
];

const MUG_DETAILS = [
  "12 oz stoneware, glazed interior",
  "Wrap-around printed graphic",
  "Dishwasher and microwave safe",
];

export const products: Product[] = [
  // Lisbon
  {
    slug: "lisbon-tram-28-tee",
    name: "Tram 28 Tee",
    destinationSlug: "lisbon",
    category: "tees",
    price: 3800,
    description:
      "A single yellow tram climbing a tiled street, printed small on the chest and large across the back. For anyone who has waited forty minutes at Martim Moniz and regretted nothing.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [NATURAL, NAVY, BLACK],
    featured: true,
    badge: "bestseller",
  },
  {
    slug: "lisbon-azulejo-tote",
    name: "Azulejo Tote",
    destinationSlug: "lisbon",
    category: "totes",
    price: 3200,
    description:
      "A repeating blue-and-white tile pattern lifted from a façade in Alfama, printed edge to edge on heavy canvas. Fits a week of groceries or a stack of records from the Feira da Ladra.",
    details: TOTE_DETAILS,
    colors: [NATURAL],
  },
  {
    slug: "lisbon-miradouro-poster",
    name: "Miradouro Poster",
    destinationSlug: "lisbon",
    category: "posters",
    price: 2800,
    description:
      "The view from Miradouro de Santa Luzia rendered as a flat-color travel poster: terracotta roofs, the Tagus, and the 25 de Abril bridge in the haze.",
    details: POSTER_DETAILS,
    sizes: ["12 × 16", "18 × 24"],
    colors: [],
  },

  // Kyoto
  {
    slug: "kyoto-torii-hoodie",
    name: "Thousand Gates Hoodie",
    destinationSlug: "kyoto",
    category: "hoodies",
    price: 7800,
    description:
      "A tunnel of vermilion torii gates, embroidered small on the chest and printed in a single ink across the back. Heavy enough for a November morning at Fushimi Inari.",
    details: HOODIE_DETAILS,
    sizes: HOODIE_SIZES,
    colors: [BLACK, OATMEAL, FOREST],
    featured: true,
    badge: "new",
  },
  {
    slug: "kyoto-moss-garden-tee",
    name: "Moss Garden Tee",
    destinationSlug: "kyoto",
    category: "tees",
    price: 3800,
    description:
      "One hundred and twenty varieties of moss and a single stone lantern. A quiet print for a quiet garden.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [NATURAL, FOREST],
  },
  {
    slug: "kyoto-lantern-pin",
    name: "Paper Lantern Pin",
    destinationSlug: "kyoto",
    category: "pins",
    price: 1400,
    description:
      "A red chōchin lantern in hard enamel, with 'Kyoto' in tiny kanji along the bottom rim.",
    details: PIN_DETAILS,
    colors: [],
  },
  {
    slug: "kyoto-matcha-mug",
    name: "Uji Matcha Mug",
    destinationSlug: "kyoto",
    category: "mugs",
    price: 2200,
    description:
      "A wrap-around print of tea fields stepping up the hills outside Uji. Holds twelve ounces of whatever you're actually drinking.",
    details: MUG_DETAILS,
    colors: [],
  },

  // Oaxaca
  {
    slug: "oaxaca-alebrije-tee",
    name: "Alebrije Tee",
    destinationSlug: "oaxaca",
    category: "tees",
    price: 4000,
    description:
      "A six-color screen print of a winged jaguar alebrije, drawn by a San Martín Tilcajete carver we've worked with since our first trip.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [NATURAL, BLACK, TERRACOTTA],
    featured: true,
    badge: "bestseller",
  },
  {
    slug: "oaxaca-mezcal-cap",
    name: "Mezcal Cap",
    destinationSlug: "oaxaca",
    category: "hats",
    price: 3400,
    description:
      "An agave heart embroidered in three shades of green, with 'para todo mal, mezcal' stitched under the brim.",
    details: HAT_DETAILS,
    colors: [SAND, BLACK],
  },
  {
    slug: "oaxaca-sierra-poster",
    name: "Sierra Norte Poster",
    destinationSlug: "oaxaca",
    category: "posters",
    price: 2800,
    description:
      "The mountains north of the city in stacked bands of marigold, rust and plum, as seen from the road to Ixtlán.",
    details: POSTER_DETAILS,
    sizes: ["12 × 16", "18 × 24"],
    colors: [],
  },
  {
    slug: "oaxaca-sticker-pack",
    name: "Oaxaca Sticker Pack",
    destinationSlug: "oaxaca",
    category: "stickers",
    price: 900,
    description:
      "Four stickers: a chapulín, a tlayuda, an alebrije and the Santo Domingo façade. Weatherproof vinyl.",
    details: STICKER_DETAILS,
    colors: [],
  },

  // Reykjavík
  {
    slug: "reykjavik-midnight-sun-hoodie",
    name: "Midnight Sun Hoodie",
    destinationSlug: "reykjavik",
    category: "hoodies",
    price: 7800,
    description:
      "A low sun that never sets, printed across the back in glacier blue and pale gold. Actually warm enough for Iceland, which is saying something.",
    details: HOODIE_DETAILS,
    sizes: HOODIE_SIZES,
    colors: [NAVY, OATMEAL],
    featured: true,
    badge: "new",
  },
  {
    slug: "reykjavik-harbor-tee",
    name: "Old Harbour Tee",
    destinationSlug: "reykjavik",
    category: "tees",
    price: 3800,
    description:
      "Corrugated iron houses and a whale-watching boat, line-drawn in a single navy ink.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [WHITE, NAVY],
  },

  // Marrakech
  {
    slug: "marrakech-medina-tote",
    name: "Medina Tote",
    destinationSlug: "marrakech",
    category: "totes",
    price: 3200,
    description:
      "A zellige-inspired eight-point star pattern in terracotta and saffron. Built to survive the souk.",
    details: TOTE_DETAILS,
    colors: [NATURAL],
    featured: true,
  },
  {
    slug: "marrakech-red-city-tee",
    name: "Red City Tee",
    destinationSlug: "marrakech",
    category: "tees",
    price: 3800,
    description:
      "The Koutoubia minaret against a flat ochre sky, with the coordinates of Jemaa el-Fnaa printed below.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [TERRACOTTA, NATURAL, BLACK],
  },
  {
    slug: "marrakech-mint-tea-mug",
    name: "Mint Tea Mug",
    destinationSlug: "marrakech",
    category: "mugs",
    price: 2200,
    description:
      "A silver teapot pouring from an implausible height, wrapped around a stoneware mug. Add your own sugar.",
    details: MUG_DETAILS,
    colors: [],
  },

  // Big Sur
  {
    slug: "big-sur-highway-one-tee",
    name: "Highway One Tee",
    destinationSlug: "big-sur",
    category: "tees",
    price: 3800,
    description:
      "Bixby Bridge, a bank of fog, and a hairpin road. Printed in sea green and grey on the back, small mark on the chest.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [NATURAL, FOREST, BLACK],
    featured: true,
  },
  {
    slug: "big-sur-condor-cap",
    name: "Condor Cap",
    destinationSlug: "big-sur",
    category: "hats",
    price: 3400,
    description:
      "A California condor in flight, embroidered in charcoal with a single orange stitch for the wing tag.",
    details: HAT_DETAILS,
    colors: [FOREST, SAND],
  },
  {
    slug: "big-sur-redwood-sticker",
    name: "Redwood Sticker",
    destinationSlug: "big-sur",
    category: "stickers",
    price: 400,
    description:
      "A single redwood, very tall, on a die-cut sticker that is also very tall.",
    details: STICKER_DETAILS,
    colors: [],
  },

  // Cape Town
  {
    slug: "cape-town-tablecloth-hoodie",
    name: "Tablecloth Hoodie",
    destinationSlug: "cape-town",
    category: "hoodies",
    price: 7800,
    description:
      "Table Mountain with its cloud rolling over the edge, printed across the back in sunset orange. For the walk down from Lion's Head after dark.",
    details: HOODIE_DETAILS,
    sizes: HOODIE_SIZES,
    colors: [BLACK, OATMEAL],
  },
  {
    slug: "cape-town-bo-kaap-poster",
    name: "Bo-Kaap Poster",
    destinationSlug: "cape-town",
    category: "posters",
    price: 2800,
    description:
      "A row of painted houses on Wale Street, each one a different color, with the mountain behind.",
    details: POSTER_DETAILS,
    sizes: ["12 × 16", "18 × 24"],
    colors: [],
    badge: "limited",
  },

  // Hội An
  {
    slug: "hoi-an-lantern-tee",
    name: "Lantern Street Tee",
    destinationSlug: "hoi-an",
    category: "tees",
    price: 3800,
    description:
      "Silk lanterns strung across Nguyễn Thái Học street, printed in four colors on the back.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [NATURAL, BLACK],
    badge: "new",
  },
  {
    slug: "hoi-an-lantern-pin",
    name: "Silk Lantern Pin",
    destinationSlug: "hoi-an",
    category: "pins",
    price: 1400,
    description:
      "A round silk lantern in yellow and red enamel, with a tiny tassel.",
    details: PIN_DETAILS,
    colors: [],
  },

  // Patagonia
  {
    slug: "patagonia-fitz-roy-hoodie",
    name: "Fitz Roy Hoodie",
    destinationSlug: "patagonia",
    category: "hoodies",
    price: 8200,
    description:
      "The Fitz Roy massif at dawn, when the granite goes orange for about four minutes. Printed across the back in five inks.",
    details: HOODIE_DETAILS,
    sizes: HOODIE_SIZES,
    colors: [NAVY, BLACK, OATMEAL],
    featured: true,
    badge: "bestseller",
  },
  {
    slug: "patagonia-glacier-tee",
    name: "Perito Moreno Tee",
    destinationSlug: "patagonia",
    category: "tees",
    price: 3800,
    description:
      "A glacier face in three blues, calving one block into Lago Argentino.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [WHITE, NAVY],
  },
  {
    slug: "patagonia-summit-cap",
    name: "Summit Cap",
    destinationSlug: "patagonia",
    category: "hats",
    price: 3400,
    description:
      "A jagged skyline of Cerro Torre and Fitz Roy embroidered across the front. Fits under a hood.",
    details: HAT_DETAILS,
    colors: [NAVY, SAND],
  },
  {
    slug: "patagonia-poster",
    name: "Cerro Torre Poster",
    destinationSlug: "patagonia",
    category: "posters",
    price: 2800,
    description:
      "Cerro Torre wearing its usual cap of cloud, over a lake the color of milk.",
    details: POSTER_DETAILS,
    sizes: ["12 × 16", "18 × 24"],
    colors: [],
  },

  // Amalfi
  {
    slug: "amalfi-lemon-tote",
    name: "Sfusato Tote",
    destinationSlug: "amalfi",
    category: "totes",
    price: 3200,
    description:
      "Oversized Amalfi lemons and leaves in a loose repeat, printed on natural canvas. Beach-ready.",
    details: TOTE_DETAILS,
    colors: [NATURAL],
    featured: true,
  },
  {
    slug: "amalfi-positano-tee",
    name: "Positano Tee",
    destinationSlug: "amalfi",
    category: "tees",
    price: 3800,
    description:
      "The town stacked up the cliff in pastel blocks, with the sea below and the dome of Santa Maria Assunta in majolica tiles.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [WHITE, NATURAL],
  },
  {
    slug: "amalfi-lemon-sticker",
    name: "Lemon Sticker",
    destinationSlug: "amalfi",
    category: "stickers",
    price: 400,
    description: "One lemon. Very large. Die-cut.",
    details: STICKER_DETAILS,
    colors: [],
  },

  // Queenstown
  {
    slug: "queenstown-remarkables-tee",
    name: "Remarkables Tee",
    destinationSlug: "queenstown",
    category: "tees",
    price: 3800,
    description:
      "The Remarkables mirrored in Lake Wakatipu, printed as a flat two-tone graphic.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [NATURAL, NAVY],
  },
  {
    slug: "queenstown-alpine-cap",
    name: "Alpine Cap",
    destinationSlug: "queenstown",
    category: "hats",
    price: 3400,
    description:
      "A single mountain and a single lake, embroidered in alpine blue.",
    details: HAT_DETAILS,
    colors: [SAND, NAVY],
  },

  // Zanzibar
  {
    slug: "zanzibar-dhow-tee",
    name: "Dhow Tee",
    destinationSlug: "zanzibar",
    category: "tees",
    price: 3800,
    description:
      "A lateen-sailed dhow crossing a turquoise channel, with Stone Town's rooftops at the horizon.",
    details: TEE_DETAILS,
    sizes: TEE_SIZES,
    colors: [WHITE, NATURAL],
    badge: "new",
  },
  {
    slug: "zanzibar-spice-mug",
    name: "Spice Island Mug",
    destinationSlug: "zanzibar",
    category: "mugs",
    price: 2200,
    description:
      "Cloves, cinnamon, nutmeg and cardamom wrapped around a stoneware mug.",
    details: MUG_DETAILS,
    colors: [],
  },
  {
    slug: "zanzibar-door-pin",
    name: "Carved Door Pin",
    destinationSlug: "zanzibar",
    category: "pins",
    price: 1400,
    description:
      "One of Stone Town's carved wooden doors, with its brass studs, in hard enamel.",
    details: PIN_DETAILS,
    colors: [],
  },
];
