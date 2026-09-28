export type Motif =
  | "mountain"
  | "wave"
  | "skyline"
  | "desert"
  | "forest"
  | "island"
  | "lantern"
  | "coast";

export type Region =
  | "Europe"
  | "Asia"
  | "Africa"
  | "North America"
  | "South America"
  | "Oceania";

export interface Palette {
  /** Poster background */
  bg: string;
  /** Primary ink / text color */
  fg: string;
  /** Accent used for the motif */
  accent: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: Region;
  tagline: string;
  description: string;
  coordinates: { lat: number; lng: number };
  palette: Palette;
  motif: Motif;
  featured?: boolean;
}

export type Category =
  | "tees"
  | "hoodies"
  | "hats"
  | "totes"
  | "posters"
  | "pins"
  | "stickers"
  | "mugs";

export type Badge = "new" | "bestseller" | "limited";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  destinationSlug: string;
  category: Category;
  /** Price in US cents */
  price: number;
  description: string;
  details: string[];
  sizes?: string[];
  colors: ColorOption[];
  featured?: boolean;
  badge?: Badge;
}

export interface CartLine {
  /** Stable key made of product slug + selected options */
  key: string;
  productSlug: string;
  quantity: number;
  size?: string;
  color?: string;
}
