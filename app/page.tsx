import { profile, projects, type Project } from "./data";
import { TrackedLink } from "./links";

function ProjectSection({ p, index }: { p: Project; index: number }) {
  return (
    <section id={p.id} className="project">
      <header className="project-head">
        <span className="project-no">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h2>{p.name}</h2>
          <p className="tagline">{p.tagline}</p>
        </div>
      </header>

      <p className="summary">{p.summary}</p>

      <div className="links">
        {p.live && (
          <TrackedLink href={p.live} project={p.id} kind="live" className="btn btn-primary">
            서비스 열기
          </TrackedLink>
        )}
        <TrackedLink href={p.repo} project={p.id} kind="repo" className="btn">
          GitHub
        </TrackedLink>
      </div>

      <div className={`screens screens-${p.screenShape}`}>
        {p.screens.map((s) => (
          <figure key={s.caption} className="screen">
            {s.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/screens/${s.src}`} alt={s.caption} loading="lazy" />
            ) : (
              <div className="screen-empty" aria-hidden />
            )}
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="block">
        <h3>{p.hypothesisLabel}</h3>
        <p className="hypothesis">{p.hypothesis}</p>
      </div>

      <div className="block">
        <h3>핵심 결정</h3>
        <ul className="decisions">
          {p.decisions.map((d) => (
            <li key={d.what}>
              <strong>{d.what}</strong>
              <span>{d.why}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="block two-col">
        <div>
          <h3>결과</h3>
          <ul className="plain">
            {p.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>한계와 다음 단계</h3>
          <ul className="plain">
            {p.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="stack">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Portfolio</p>
        <h1>
          {profile.name}
          <span>{profile.role}</span>
        </h1>
        <p className="intro">{profile.intro}</p>
        <ul className="facts">
          {profile.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="links">
          <TrackedLink href={profile.github} kind="github" className="btn">
            GitHub
          </TrackedLink>
          <TrackedLink href={`mailto:${profile.email}`} kind="email" className="btn">
            {profile.email}
          </TrackedLink>
        </div>
      </section>

      <nav className="toc" aria-label="프로젝트">
        {projects.map((p, i) => (
          <TrackedLink key={p.id} href={`#${p.id}`} project={p.id} kind="toc" className="toc-card">
            <span className="project-no">{String(i + 1).padStart(2, "0")}</span>
            <strong>{p.name}</strong>
            <span>{p.tagline}</span>
          </TrackedLink>
        ))}
      </nav>

      {projects.map((p, i) => (
        <ProjectSection key={p.id} p={p} index={i} />
      ))}

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </main>
  );
}
