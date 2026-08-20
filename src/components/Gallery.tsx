import { useEffect, useState } from 'react';
import './Gallery.css';

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // lags openIndex on close rather than clearing with it, so the lightbox
  // still has an image to show while it fades out instead of going blank
  // the instant the overlay starts to disappear
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);

  const isOpen = openIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    // .main is the page's only scrolling element (see RootLayout) — locking
    // it, not body, is what actually stops the page scrolling behind the
    // lightbox
    const scroller = document.querySelector<HTMLElement>('.main');
    const prevOverflow = scroller?.style.overflow ?? '';
    if (scroller) scroller.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (scroller) scroller.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (images.length === 0) return null;

  const open = (i: number) => {
    setDisplayIndex(i);
    setOpenIndex(i);
  };
  const close = () => setOpenIndex(null);

  return (
    <div className="gallery">
      <ul className="gallery__track">
        {images.map((src, i) => (
          <li className="gallery__item" key={src}>
            <button
              type="button"
              className="gallery__button"
              onClick={() => open(i)}
              aria-label={`view ${alt} screenshot ${i + 1} full size`}
            >
              <img
                className="gallery__image"
                src={src}
                alt={`${alt} screenshot ${i + 1}`}
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      <div
        className={isOpen ? 'gallery-lightbox gallery-lightbox--open' : 'gallery-lightbox'}
        onClick={close}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="gallery-lightbox__close"
          onClick={close}
          aria-label="close"
          tabIndex={isOpen ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 5l14 14M19 5 5 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {displayIndex !== null && (
          <img
            className="gallery-lightbox__image"
            src={images[displayIndex]}
            alt={`${alt} screenshot ${displayIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
}
