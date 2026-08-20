import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechGrid } from '../components/TechGrid';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const framing = [
  'computer science @ Georgia Tech',
  '$100K+ in revenue generated across B2C apps',
  'building toward machine learning and LLM research',
  'secondary interest in quantitative systems',
];

const FROM_TITLE = 'Kareem Alaiwat';
const TO_TITLE = 'Technical Skills';
const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&@ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const TITLE_LEN = Math.max(FROM_TITLE.length, TO_TITLE.length);

/* the old title has fully dissolved by DISSOLVE_END and the new one starts
   reassembling at RESOLVE_START, so the middle of the scroll is pure noise */
const DISSOLVE_END = 0.45;
const RESOLVE_START = 0.55;

/* breathing room demanded before the pinned hero is considered viable — a
   layout that only just fits is one webfont metric away from not fitting */
const FIT_MARGIN = 24;

/* per-character schedule, computed once at module load so the morph is stable
   across re-renders. characters leave and arrive left-to-right with a little
   jitter, which is what stops it reading as a mechanical wipe. */
const schedule = Array.from({ length: TITLE_LEN }, (_, i) => {
  const t = TITLE_LEN > 1 ? i / (TITLE_LEN - 1) : 0;
  return {
    dissolve: t * DISSOLVE_END * 0.8 + Math.random() * DISSOLVE_END * 0.2,
    resolve:
      RESOLVE_START +
      t * (1 - RESOLVE_START) * 0.8 +
      Math.random() * (1 - RESOLVE_START) * 0.2,
  };
});

/* `tick` is advanced independently of scroll position so unresolved characters
   keep cycling even while the page is held still mid-transition */
function renderTitle(progress: number, tick: number): string {
  let out = '';
  for (let i = 0; i < TITLE_LEN; i++) {
    const from = FROM_TITLE[i] ?? '';
    const to = TO_TITLE[i] ?? '';
    const { dissolve, resolve } = schedule[i];
    if (progress <= dissolve) {
      out += from;
    } else if (progress >= resolve) {
      out += to;
    } else if ((progress < 0.5 ? from : to) === ' ') {
      // word gaps survive the noise, so the line keeps a stable shape
      out += ' ';
    } else {
      out += GLYPHS[(tick * (i * 7 + 3) + i * 13) % GLYPHS.length];
    }
  }
  return out;
}

export function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  /* the pinned hero has to hold the title and the whole lattice inside a
     single viewport frame. whether it can is a question of the lattice's row
     count, the nav wrapping to two lines and the size the display font
     resolves to — none of which a width/height breakpoint can see, and
     measurement showed the margin swinging from +220px to -189px across
     viewports a breakpoint would have grouped together. so it is measured.
     defaults to static: plain scrolling is the safe answer before we know. */
  const [isStatic, setIsStatic] = useState(true);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const titleBlock = titleBlockRef.current;
    const skills = skillsRef.current;
    const scroller = document.querySelector<HTMLElement>('.main');
    if (!stage || !titleBlock || !skills || !scroller) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    // measured against whatever the lattice currently shows. on mount that is
    // always "all" — the worst case, since a filter can only remove rows.
    const evaluate = () => {
      const gap = parseFloat(getComputedStyle(stage).rowGap) || 0;
      const needed = titleBlock.offsetHeight + gap + skills.offsetHeight;
      setIsStatic(reducedMotion.matches || needed + FIT_MARGIN > frame);
    };

    // main's content box IS the frame the pinned stage gets: 100vh less the
    // padding that clears the fixed nav and footer. observing it beats
    // listening for window resize and reading --nav-height, which races
    // RootLayout's own re-measurement of that chrome and reads it stale.
    // fires once on observe, which does the initial evaluation.
    const observer = new ResizeObserver(([entry]) => {
      frame = entry.contentRect.height;
      evaluate();
    });
    observer.observe(scroller);

    reducedMotion.addEventListener('change', evaluate);
    document.fonts?.ready.then(evaluate);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const titleBlock = titleBlockRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const skills = skillsRef.current;
    if (!section || !stage || !titleBlock || !title || !intro || !skills) return;

    if (isStatic) {
      // the page is an ordinary document here: no pinning, no morph, both
      // panels stacked in flow. reset the title in case we are arriving from
      // the animated layout mid-scramble — React will not touch the text node
      // because its rendered value never changed.
      title.textContent = FROM_TITLE;
      return;
    }

    // RootLayout makes <main> the only scrolling element, so ScrollTrigger has
    // to be pointed at it rather than at the window
    const scroller = document.querySelector<HTMLElement>('.main') ?? undefined;

    const state = { progress: 0, tick: 0 };

    // the two panels share one grid cell, sized by the taller of them (the
    // skills lattice), so at rest the title sits where a much taller panel
    // would put it. lifting it by half the height difference centres the name
    // + bullets as a group; easing that lift to 0 hands the centring over to
    // the lattice. filtering changes the lattice's row count and therefore
    // this number, so it is measured rather than captured — a GSAP
    // function-based value would only be re-read on invalidate and would
    // strand the title over the bullets after a filter change.
    let lift = 0;
    const measureLift = () => {
      lift = Math.max(0, (skills.offsetHeight - intro.offsetHeight) / 2);
    };

    const setTitleY = gsap.quickSetter(titleBlock, 'y', 'px') as (
      value: number,
    ) => void;

    // driven off the scrubbed state.progress, not the raw scroll position, so
    // the title's position and its text stay on the same frame
    const paint = () => {
      title.textContent = renderTitle(state.progress, state.tick);
      setTitleY(lift * (1 - state.progress));
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          scroller,
          // measured off the scroller's actual travel rather than the stage
          // height: the two agree only when the nav and footer measure exactly
          // as expected, and if end overshoots the real maximum then progress
          // can never reach 1 and the skills panel never becomes clickable
          start: () => 0,
          end: () => (scroller ? scroller.scrollHeight - scroller.clientHeight : 0),
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            state.progress = self.progress;
            // hand over interactivity once the skills panel is unambiguously
            // the visible layer — well short of progress 1, so the pills never
            // depend on the scroll landing exactly on the last pixel.
            // explicit 'auto', never '': clearing the inline style would fall
            // back to the resting `pointer-events: none` rule in Home.css and
            // the pills would stay dead no matter how far you scrolled
            intro.style.pointerEvents = self.progress > 0.05 ? 'none' : 'auto';
            skills.style.pointerEvents = self.progress > 0.7 ? 'auto' : 'none';
          },
        },
      });

      // every tween here is a fromTo on purpose. invalidateOnRefresh re-records
      // a plain to()'s start value from wherever the property currently sits,
      // so a refresh triggered mid-scroll (a resize, a filter) would freeze
      // the intro at opacity 0 and never fade it back in on the way up.
      //
      // the old panel is gone before the new one starts, and the new one lands
      // on the same frame the title finishes reassembling
      tl.fromTo(
        intro,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -24, duration: DISSOLVE_END },
        0,
      )
        .fromTo(
          skills,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1 - RESOLVE_START },
          RESOLVE_START,
        )
        .fromTo(
          state,
          { progress: 0 },
          { progress: 1, duration: 1, onUpdate: paint },
          0,
        );
    }, section);

    // cycles the noise glyphs at ~20fps, independent of scroll velocity
    let frame = 0;
    const spin = () => {
      if (++frame % 3) return;
      if (state.progress <= 0 || state.progress >= 1) return;
      state.tick++;
      paint();
    };
    gsap.ticker.add(spin);

    // the lattice changes height whenever a filter pill changes the row count,
    // which moves where the title has to sit at rest. fires once on observe,
    // which does the initial measurement.
    const relayout = () => {
      measureLift();
      paint();
    };
    const resizeObserver = new ResizeObserver(relayout);
    resizeObserver.observe(skills);
    resizeObserver.observe(intro);

    // webfont swap changes the stage height, which changes the scroll range.
    // repaint after: invalidateOnRefresh re-evaluates the timeline, and if the
    // refresh lands on the progress it was already at, GSAP skips the render
    // and the title would keep whatever text it had at that moment
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
      relayout();
    });

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(spin);
      ctx.revert();
      // written outside the context, so revert() does not know about them —
      // a stale inline `pointer-events: none` would beat the static
      // stylesheet and leave the pills dead in the fallback layout
      gsap.set(titleBlock, { clearProps: 'transform' });
      intro.style.pointerEvents = '';
      skills.style.pointerEvents = '';
    };
  }, [isStatic]);

  return (
    <section
      className={isStatic ? 'home section home--static' : 'home section'}
      ref={sectionRef}
    >
      <div className="home__track">
        <div className="home__stage" ref={stageRef}>
          {/* the visible title is a single mutating text node, so it is hidden
              from assistive tech and the real headings are exposed instead */}
          <h1 className="display home__title" ref={titleBlockRef}>
            <span className="sr-only">Kareem Alaiwat</span>
            <span className="home__title-text" ref={titleRef} aria-hidden="true">
              {FROM_TITLE}
            </span>
          </h1>

          {/* both panels occupy the same grid cell so they cross-fade in place
              rather than pushing each other around */}
          <div className="home__panels">
            <div className="home__panel" ref={introRef}>
              <ul className="home__framing">
                {framing.map((line) => (
                  <li key={line}>
                    <span className="home__bullet" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* the morphing h1 becomes this heading in the pinned layout, so it
                is only spoken there; the static layout needs it on the page.
                sr-only is position: absolute, so in the pinned layout it adds
                no height — which is what keeps the fit measurement above
                independent of which layout is currently active. */}
            <h2
              className={isStatic ? 'display home__section-title' : 'sr-only'}
            >
              Technical Skills
            </h2>

            <div className="home__panel home__panel--skills" ref={skillsRef}>
              <TechGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
