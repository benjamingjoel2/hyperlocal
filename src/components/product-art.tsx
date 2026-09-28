import type { Destination, Motif, Palette, Product } from "@/lib/types";

/* ---------- Motifs ----------
 * Each motif draws inside a 320 × 240 box whose origin is (40, 50) in the poster
 * viewBox, with the horizon at y = 290. Colors come from the destination palette.
 */

function Sun({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
}

function Mountain({ fg, accent, bg }: Palette) {
  return (
    <g>
      <Sun cx={280} cy={120} r={40} fill={accent} />
      <polygon points="40,290 120,150 180,230 230,170 300,250 360,290" fill={fg} opacity="0.35" />
      <polygon points="40,290 150,110 210,200 260,140 360,290" fill={fg} />
      <polygon points="150,110 168,140 150,150 132,140" fill={bg} opacity="0.9" />
      <polygon points="260,140 276,166 260,174 244,166" fill={bg} opacity="0.9" />
      <rect x="40" y="290" width="320" height="2" fill={fg} />
    </g>
  );
}

function Wave({ fg, accent }: Palette) {
  const wave = (y: number) =>
    `M40 ${y} C 80 ${y - 18}, 120 ${y + 18}, 160 ${y} S 240 ${y - 18}, 280 ${y} S 340 ${y + 12}, 360 ${y} V 300 H 40 Z`;
  return (
    <g>
      <Sun cx={200} cy={130} r={46} fill={accent} />
      <path d={wave(200)} fill={fg} opacity="0.25" />
      <path d={wave(230)} fill={fg} opacity="0.45" />
      <path d={wave(260)} fill={fg} opacity="0.7" />
      <path d={wave(285)} fill={fg} />
    </g>
  );
}

function Skyline({ fg, accent, bg }: Palette) {
  const buildings = [
    [40, 210, 34],
    [78, 170, 40],
    [122, 230, 26],
    [152, 150, 46],
    [202, 200, 30],
    [236, 175, 44],
    [284, 220, 36],
    [324, 190, 36],
  ] as const;
  return (
    <g>
      <Sun cx={110} cy={110} r={34} fill={accent} />
      {buildings.map(([x, y, w]) => (
        <rect key={x} x={x} y={y} width={w} height={290 - y} fill={fg} />
      ))}
      {/* Dome */}
      <path d="M152 150 A 23 23 0 0 1 198 150 Z" fill={accent} />
      <rect x="173" y="118" width="4" height="14" fill={accent} />
      {/* Windows */}
      {buildings.flatMap(([x, y, w]) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${x}-${row}`}
            x={x + w / 2 - 3}
            y={y + 18 + row * 22}
            width="6"
            height="9"
            fill={bg}
            opacity="0.85"
          />
        )),
      )}
      <rect x="40" y="290" width="320" height="2" fill={fg} />
    </g>
  );
}

function Desert({ fg, accent }: Palette) {
  return (
    <g>
      <Sun cx={210} cy={140} r={58} fill={accent} />
      <path d="M40 290 C 100 200, 200 230, 260 250 S 340 240, 360 290 Z" fill={fg} opacity="0.35" />
      <path d="M40 290 C 90 250, 160 260, 220 275 S 320 265, 360 290 Z" fill={fg} opacity="0.6" />
      <path d="M40 300 C 120 270, 220 285, 360 275 V 300 Z" fill={fg} />
    </g>
  );
}

function Forest({ fg, accent }: Palette) {
  const trees = [
    [70, 200, 40],
    [120, 150, 60],
    [175, 190, 44],
    [230, 130, 70],
    [290, 175, 52],
    [335, 210, 36],
  ] as const;
  return (
    <g>
      <Sun cx={300} cy={110} r={30} fill={accent} />
      {trees.map(([cx, top, w]) => (
        <g key={cx}>
          <polygon points={`${cx},${top} ${cx + w / 2},${290} ${cx - w / 2},${290}`} fill={fg} />
          <polygon
            points={`${cx},${top + 30} ${cx + w / 2.6},${290} ${cx - w / 2.6},${290}`}
            fill={accent}
            opacity="0.25"
          />
        </g>
      ))}
      <rect x="40" y="290" width="320" height="2" fill={fg} />
    </g>
  );
}

function Island({ fg, accent }: Palette) {
  return (
    <g>
      <Sun cx={290} cy={120} r={40} fill={accent} />
      <rect x="40" y="250" width="320" height="2" fill={fg} opacity="0.6" />
      <path d="M40 290 Q 200 240 360 290 Z" fill={fg} opacity="0.3" />
      <path d="M90 290 Q 170 262 250 290 Z" fill={fg} />
      {/* Palm */}
      <path d="M170 288 C 168 240, 176 200, 196 160" stroke={fg} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M196 160 C 150 150, 130 165, 118 185 C 150 168, 175 170, 196 160 Z" fill={accent} />
      <path d="M196 160 C 240 140, 262 150, 276 172 C 250 158, 220 160, 196 160 Z" fill={accent} />
      <path d="M196 160 C 176 122, 190 108, 214 110 C 196 118, 194 138, 196 160 Z" fill={accent} />
      <path d="M196 160 C 232 156, 254 175, 258 200 C 240 178, 216 168, 196 160 Z" fill={accent} opacity="0.85" />
      <path d="M196 160 C 160 168, 140 190, 138 214 C 154 190, 176 172, 196 160 Z" fill={accent} opacity="0.85" />
    </g>
  );
}

function Lantern({ fg, accent, bg }: Palette) {
  const lanterns = [
    [90, 96, 40, 62],
    [200, 128, 48, 74],
    [310, 100, 40, 62],
  ] as const;
  return (
    <g>
      <path d="M40 80 Q 200 130 360 80" stroke={fg} strokeWidth="2" fill="none" />
      {lanterns.map(([cx, top, w, h]) => (
        <g key={cx}>
          <line x1={cx} y1={top - 30} x2={cx} y2={top} stroke={fg} strokeWidth="2" />
          <rect x={cx - w / 2} y={top} width={w} height={h} rx={w / 2.2} fill={accent} />
          <rect x={cx - w / 2} y={top} width={w} height={h} rx={w / 2.2} fill="none" stroke={fg} strokeWidth="2" />
          <line x1={cx - w / 2} y1={top + h / 3} x2={cx + w / 2} y2={top + h / 3} stroke={fg} strokeWidth="1.5" opacity="0.5" />
          <line x1={cx - w / 2} y1={top + (2 * h) / 3} x2={cx + w / 2} y2={top + (2 * h) / 3} stroke={fg} strokeWidth="1.5" opacity="0.5" />
          <rect x={cx - w / 4} y={top - 6} width={w / 2} height="6" fill={fg} />
          <rect x={cx - w / 4} y={top + h} width={w / 2} height="6" fill={fg} />
          <line x1={cx} y1={top + h + 6} x2={cx} y2={top + h + 30} stroke={fg} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <path d="M40 290 Q 200 270 360 290 V 300 H 40 Z" fill={fg} />
      <circle cx="120" cy="280" r="4" fill={bg} opacity="0.6" />
      <circle cx="250" cy="284" r="3" fill={bg} opacity="0.6" />
    </g>
  );
}

function Coast({ fg, accent }: Palette) {
  const wave = (y: number) =>
    `M180 ${y} C 210 ${y - 12}, 240 ${y + 12}, 270 ${y} S 330 ${y - 12}, 360 ${y}`;
  return (
    <g>
      <Sun cx={290} cy={120} r={38} fill={accent} />
      <polygon points="40,290 40,130 90,120 120,160 150,150 185,210 200,290" fill={fg} />
      <polygon points="40,290 40,180 70,175 110,220 150,235 180,290" fill={fg} opacity="0.55" />
      <path d={wave(232)} stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={wave(256)} stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d={wave(280)} stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4" />
      <rect x="40" y="290" width="320" height="2" fill={fg} />
    </g>
  );
}

const motifs: Record<Motif, (p: Palette) => React.ReactElement> = {
  mountain: Mountain,
  wave: Wave,
  skyline: Skyline,
  desert: Desert,
  forest: Forest,
  island: Island,
  lantern: Lantern,
  coast: Coast,
};

function formatCoordinates({ lat, lng }: Destination["coordinates"]): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns}  ${Math.abs(lng).toFixed(2)}° ${ew}`;
}

function titleSize(name: string): number {
  if (name.length <= 7) return 54;
  if (name.length <= 10) return 46;
  if (name.length <= 13) return 38;
  return 32;
}

/* ---------- Poster ---------- */

export function PosterArt({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) {
  const { palette, motif, name, country, coordinates } = destination;
  const Motif = motifs[motif];
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={`${name} travel poster`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="500" fill={palette.bg} />
      <rect x="14" y="14" width="372" height="472" fill="none" stroke={palette.fg} strokeWidth="2" opacity="0.6" />
      <Motif {...palette} />
      <text
        x="200"
        y="395"
        textAnchor="middle"
        fill={palette.fg}
        fontSize={titleSize(name)}
        fontWeight="600"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        {name}
      </text>
      <text
        x="200"
        y="424"
        textAnchor="middle"
        fill={palette.fg}
        fontSize="13"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", textTransform: "uppercase" }}
      >
        {country.toUpperCase()}
      </text>
      <text
        x="200"
        y="446"
        textAnchor="middle"
        fill={palette.fg}
        opacity="0.75"
        fontSize="11"
        letterSpacing="2"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {formatCoordinates(coordinates)}
      </text>
      <text
        x="200"
        y="474"
        textAnchor="middle"
        fill={palette.fg}
        opacity="0.6"
        fontSize="9"
        letterSpacing="4"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        HYPERLOCAL
      </text>
    </svg>
  );
}

/* ---------- Badge (round, for pins, stickers, hats, mugs) ---------- */

export function BadgeArt({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) {
  const { palette, motif, name } = destination;
  const Motif = motifs[motif];
  const clipId = `badge-clip-${destination.slug}`;
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={`${name} badge`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="200" cy="200" r="186" />
        </clipPath>
      </defs>
      <circle cx="200" cy="200" r="196" fill={palette.fg} />
      <circle cx="200" cy="200" r="186" fill={palette.bg} />
      <g clipPath={`url(#${clipId})`}>
        {/* Scale the 400×300 motif region to fit the circle's upper half. */}
        <g transform="translate(20 -10) scale(0.9)">
          <Motif {...palette} />
        </g>
      </g>
      <rect x="60" y="292" width="280" height="2" fill={palette.fg} opacity="0.5" />
      <text
        x="200"
        y="342"
        textAnchor="middle"
        fill={palette.fg}
        fontSize={Math.min(titleSize(name), 40)}
        fontWeight="600"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        {name}
      </text>
      <circle cx="200" cy="200" r="176" fill="none" stroke={palette.fg} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

/* ---------- Product frame: poster or badge placed on a "product" background ---------- */

export function ProductArt({
  product,
  destination,
  colorHex,
  className = "",
  priority = false,
}: {
  product: Product;
  destination: Destination;
  /** Selected garment/base color, when applicable. */
  colorHex?: string;
  className?: string;
  priority?: boolean;
}) {
  void priority; // Reserved for parity with <Image priority>; SVG needs no preload.
  const base = colorHex ?? product.colors[0]?.hex;

  switch (product.category) {
    case "posters":
      return (
        <div className={`flex items-center justify-center bg-cream-deep p-[10%] ${className}`}>
          <div className="w-full bg-white p-[4%] shadow-card">
            <PosterArt destination={destination} className="block w-full" />
          </div>
        </div>
      );
    case "tees":
    case "hoodies":
      return (
        <div
          className={`flex items-center justify-center p-[22%] ${className}`}
          style={{ backgroundColor: base ?? "#efe6d6" }}
        >
          <PosterArt destination={destination} className="block w-full" />
        </div>
      );
    case "totes":
      return (
        <div
          className={`flex items-center justify-center p-[18%] ${className}`}
          style={{ backgroundColor: base ?? "#efe6d6" }}
        >
          <PosterArt destination={destination} className="block w-full" />
        </div>
      );
    case "hats":
      return (
        <div
          className={`flex items-center justify-center p-[28%] ${className}`}
          style={{ backgroundColor: base ?? "#d9c3a3" }}
        >
          <BadgeArt destination={destination} className="block w-full" />
        </div>
      );
    case "mugs":
      return (
        <div className={`flex items-center justify-center bg-white p-[24%] ${className}`}>
          <BadgeArt destination={destination} className="block w-full" />
        </div>
      );
    case "pins":
    case "stickers":
    default:
      return (
        <div className={`flex items-center justify-center bg-cream-deep p-[26%] ${className}`}>
          <BadgeArt destination={destination} className="block w-full drop-shadow-md" />
        </div>
      );
  }
}
