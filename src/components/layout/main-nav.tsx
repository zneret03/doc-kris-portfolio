"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/config/site";
import { isActivePath } from "@/lib/is-active-path";
import { cn } from "@/lib/utils";

// The links inside the floating pill. Home is the wordmark, so it's not listed.
export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-1">
        {site.nav
          .filter((item) => item.href !== "/")
          .map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-label-lg whitespace-nowrap transition-colors focus-ring motion-reduce:transition-none",
                    active
                      ? "bg-surface-high text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.short}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
