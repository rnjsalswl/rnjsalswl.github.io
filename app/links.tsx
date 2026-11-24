"use client";

import { track } from "./analytics";

type Props = {
  href: string;
  project?: string;
  kind: string;
  className?: string;
  children: React.ReactNode;
};

export function TrackedLink({ href, project, kind, className, children }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => track("link_click", { kind, project: project ?? "", href })}
    >
      {children}
    </a>
  );
}
