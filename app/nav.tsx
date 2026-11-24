"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function Nav({ name, items }: { name: string; items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#profile" className="brand">
          {name}
        </a>
        <nav aria-label="섹션">
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} className={active === i.id ? "on" : undefined}>
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
