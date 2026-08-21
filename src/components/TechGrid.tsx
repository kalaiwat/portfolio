import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { filterTechs, techCategories, type TechCategory } from '../content/techs';
import './TechGrid.css';

export function TechGrid() {
  const [active, setActive] = useState<TechCategory>('all');
  const gridRef = useRef<HTMLUListElement>(null);
  const visible = useMemo(() => filterTechs(active), [active]);

  // re-entry stagger on every filter change. keyed off `active` rather than the
  // list contents so re-selecting the same pill is a no-op, not a replay.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech__tile',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          ease: 'power2.out',
          stagger: { each: 0.018, from: 'start' },
          overwrite: true,
        },
      );
    }, grid);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="tech tech--home-scaled">
      {/* the heading lives in Home — it is the h1 mid-morph in the pinned
          layout and a section heading in the static one */}
      <ul className="tech__filters" role="tablist" aria-label="filter skills by category">
        {techCategories.map((category) => (
          <li key={category}>
            <button
              type="button"
              role="tab"
              aria-selected={active === category}
              className={
                active === category
                  ? 'tech__pill invert-hover invert-hover--inverse'
                  : 'tech__pill invert-hover'
              }
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <ul className="tech__grid" ref={gridRef}>
        {visible.map((tech) => (
          <li className="tech__tile" key={tech.id}>
            <img className="tech__icon" src={tech.src} alt="" loading="lazy" />
            <span className="tech__label caption">{tech.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
