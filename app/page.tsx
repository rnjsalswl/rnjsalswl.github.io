import { profile, projects, type Project } from "./data";
import { TrackedLink } from "./links";
import { Nav } from "./nav";
import { Tenure } from "./tenure";

const no = (i: number) => String(i + 1).padStart(2, "0");

function ProjectSection({ p, index }: { p: Project; index: number }) {
  return (
    <section id={p.id} className="slide project">
      <p className="kicker">
        <span className="kicker-mark" aria-hidden />
        Project {no(index)}
      </p>

      <div className="project-top">
        <div className="project-text">
          <h2>
            <em>{p.name}</em>
          </h2>
          <p className="tagline">{p.tagline}</p>
          <p className="summary">{p.summary}</p>

          <p className="fix-count">
            점검하면서 직접 찾아 고친 취약점 <strong>{p.fixes.length}건</strong>
          </p>

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
        </div>

        <div className={`screens screens-${p.screenShape}`}>
          {p.screens.map((s) => (
            <figure key={s.caption} className="screen">
              <div className="device">
                {s.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/screens/${s.src}`} alt={s.caption} loading="lazy" />
                ) : (
                  <div className="screen-empty" aria-hidden />
                )}
              </div>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <h3 className="sub">점검하면서 고친 것</h3>
      <ol className="decisions fixes">
        {p.fixes.map((d, i) => (
          <li key={d.what}>
            <span className="big-no">{no(i)}</span>
            <div>
              <strong>{d.what}</strong>
              <p>{d.why}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="sub">설계에서 신경 쓴 것</h3>
      <ol className="decisions">
        {p.decisions.map((d, i) => (
          <li key={d.what}>
            <span className="big-no">{no(i)}</span>
            <div>
              <strong>{d.what}</strong>
              <p>{d.why}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="two-col">
        <div>
          <h3 className="sub">결과</h3>
          <ul className="arrow">
            {p.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sub">아직 남은 것</h3>
          <ul className="arrow">
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
  const navItems = [
    { id: "profile", label: "Profile" },
    ...projects.map((p) => ({ id: p.id, label: p.name })),
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <Nav name={profile.name} items={navItems} />
      <main>
        <section id="profile" className="slide hero">
          <span className="watermark" aria-hidden>
            PORTFOLIO
          </span>
          <h1>
            반갑습니다.
            <br />
            개발자 <em>{profile.name}</em>입니다.
          </h1>
          <ul className="facts">
            <li>
              <Tenure start={profile.careerStart} />
            </li>
            {profile.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="intro">{profile.intro}</p>
          <div className="links">
            <TrackedLink href={profile.github} kind="github" className="btn">
              GitHub
            </TrackedLink>
            <TrackedLink href={`mailto:${profile.email}`} kind="email" className="btn">
              {profile.email}
            </TrackedLink>
          </div>

          <div className="toc">
            {projects.map((p, i) => (
              <TrackedLink key={p.id} href={`#${p.id}`} project={p.id} kind="toc" className="toc-item">
                <span className="big-no">{no(i)}</span>
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.tagline}</small>
                </span>
              </TrackedLink>
            ))}
          </div>
        </section>

        {projects.map((p, i) => (
          <ProjectSection key={p.id} p={p} index={i} />
        ))}

        <section id="contact" className="slide closing">
          <span className="watermark" aria-hidden>
            PORTFOLIO
          </span>
          <p className="closing-text">
            끝까지 읽어주셔서
            <br />
            <em>감사합니다.</em>
          </p>
          <div className="links center">
            <TrackedLink href={`mailto:${profile.email}`} kind="email" className="btn btn-primary">
              {profile.email}
            </TrackedLink>
            <TrackedLink href={profile.github} kind="github" className="btn">
              GitHub
            </TrackedLink>
          </div>
          <footer>© {new Date().getFullYear()} {profile.name}</footer>
        </section>
      </main>
    </>
  );
}
