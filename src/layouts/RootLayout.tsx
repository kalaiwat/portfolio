import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Cursor } from '../components/Cursor';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import './RootLayout.css';

export function RootLayout() {
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // the nav is fixed, so main has to clear it — and it wraps to two rows on
  // narrow viewports, so the clearance is measured rather than hardcoded
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        '--nav-height',
        `${nav.offsetHeight}px`,
      );
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* mounted once, outside the Outlet, so it survives route changes */}
      <Cursor />
      <a className="skip-link invert-hover" href="#main">
        skip to content
      </a>
      <Nav ref={navRef} />
      <div className="shell">
        <main className="main" id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
