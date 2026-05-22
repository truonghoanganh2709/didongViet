import './ServiceStrip.css';

const SERVICES = [
  { icon: '✓', title: 'Chính hãng 100%', desc: 'Cam kết hàng chính hãng' },
  { icon: '🚚', title: 'Giao nhanh 2h', desc: 'Nội thành HCM & HN' },
  { icon: '↺', title: 'Đổi trả 30 ngày', desc: '1 đổi 1 nếu lỗi' },
  { icon: '💳', title: 'Trả góp 0%', desc: 'Thủ tục đơn giản' },
];

export default function ServiceStrip() {
  return (
    <section className="figma-services">
      <div className="figma-services__inner">
        {SERVICES.map((s) => (
          <article key={s.title} className="figma-services__item">
            <span className="figma-services__icon">{s.icon}</span>
            <div>
              <strong>{s.title}</strong>
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
