import { useEffect, useState } from 'react';
import styles from './BannerCarousel.module.css';

const BANNERS = [
  {
    id: 1,
    title: 'iPhone 16 Series',
    subtitle: 'Trả góp 0% - Thu cũ đổi mới',
    color: '#1e3a5f',
  },
  {
    id: 2,
    title: 'Samsung Galaxy S25',
    subtitle: 'Ưu đãi đến 3 triệu',
    color: '#4c1d95',
  },
  {
    id: 3,
    title: 'Xiaomi 15 Ultra',
    subtitle: 'Quà tặng phụ kiện cao cấp',
    color: '#9f1239',
  },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[index];

  return (
    <section className={styles.carousel}>
      <div className={`container ${styles.slide}`} style={{ background: banner.color }}>
        <div>
          <h2>{banner.title}</h2>
          <p>{banner.subtitle}</p>
        </div>
        <div className={styles.dots}>
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              className={i === index ? styles.active : ''}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
