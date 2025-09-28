"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  href: string;
  compact?: boolean;
}

export function NavLink({ href, children, compact }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const base = compact
    ? "inline-flex items-center justify-center h-9 w-full rounded-md"
    : "inline-flex items-center gap-2 rounded-md px-3 py-2";
  const active = isActive
    ? "bg-[--primary]/10 text-[--primary] border border-[--primary]/20"
    : "hover:bg-black/5 text-black/80";

  return (
    <Link href={href} className={`${base} ${active}`}>
      {children}
    </Link>
  );
}
