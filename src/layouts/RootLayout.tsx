import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Cursor } from '../components/Cursor';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import './RootLayout.css';

export function RootLayout() {
  const navRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // nav is fixed at every width, so main always has to clear it at the top —
  // and nav wraps to two rows on narrow viewports, so clearance is measured
  // rather than hardcoded. the footer is only fixed from the tablet
  // breakpoint up (see Footer.css); it's measured unconditionally anyway
  // since that's cheap, and --footer-height simply goes unused by the mobile
  // rules that don't reserve space for it.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const footer = footerRef.current;
    if (!nav || !footer) return;
    const syncNav = () => {
      document.documentElement.style.setProperty(
        '--nav-height',
        `${nav.offsetHeight}px`,
      );
    };
    const syncFooter = () => {
      document.documentElement.style.setProperty(
        '--footer-height',
        `${footer.offsetHeight}px`,
      );
    };
    syncNav();
    syncFooter();
    const navObserver = new ResizeObserver(syncNav);
    const footerObserver = new ResizeObserver(syncFooter);
    navObserver.observe(nav);
    footerObserver.observe(footer);
    return () => {
      navObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  // main owns all page scrolling (see RootLayout.css) — window.scrollTo is a
  // no-op, so reset the actual scroll container on navigation
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
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
        <main className="main" id="main" ref={mainRef}>
          <Outlet />
          <Footer ref={footerRef} />
        </main>
      </div>
    </>
  );
}
