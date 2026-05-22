import { useEffect, useState } from 'react';
import './HeroBanner.css';

const SLIDES = [
  { src: '/assets/banner-main.svg', alt: 'iPhone 16 Series' },
  { src: '/assets/banner-side-1.svg', alt: 'Samsung Galaxy S25' },
  { src: '/assets/banner-side-2.svg', alt: 'Xiaomi 15' },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="figma-hero">
      <div className="figma-hero__layout">
        <div className="figma-hero__main">
          <img src={SLIDES[active].src} alt={SLIDES[active].alt} />
          <div className="figma-hero__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === active ? 'is-active' : ''}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="figma-hero__side">
          <img src="/assets/banner-side-1.svg" alt="Samsung promo" />
          <img src="/assets/banner-side-2.svg" alt="Xiaomi promo" />
        </div>
      </div>
    </section>
  );
}
