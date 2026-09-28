"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  // Remember which route the sheet was opened on, so a navigation closes it
  // without needing an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpenedOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-cream-deep"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-line bg-cream shadow-card"
        >
          <ul className="container-page flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpenedOn(null)}
                  className="block py-3 text-base font-medium hover:text-terracotta"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
