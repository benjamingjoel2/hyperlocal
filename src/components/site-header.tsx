import Link from "next/link";
import { CartBadge } from "./cart-badge";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2" aria-label="Hyperlocal home">
            <Logo />
          </Link>
        </div>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium transition hover:bg-cream-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CartBadge />
      </div>
    </header>
  );
}
