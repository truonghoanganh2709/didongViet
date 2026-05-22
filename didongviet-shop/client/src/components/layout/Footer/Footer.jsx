import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h3>Di Động Việt</h3>
          <p>Hệ thống bán lẻ điện thoại di động chính hãng.</p>
        </div>
        <div>
          <h4>Hỗ trợ</h4>
          <ul>
            <li>Chính sách bảo hành</li>
            <li>Đổi trả 30 ngày</li>
            <li>Giao hàng toàn quốc</li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <p>Hotline: 1800 1234</p>
          <p>Email: support@didongviet.vn</p>
        </div>
      </div>
      <div className={styles.copy}>© 2026 Di Động Việt Shop. Demo project.</div>
    </footer>
  );
}
