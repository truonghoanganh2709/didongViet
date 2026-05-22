import './TopBar.css';

export default function TopBar() {
  return (
    <div className="figma-topbar">
      <div className="figma-topbar__inner">
        <div className="figma-topbar__left">
          <img src="/assets/icon-phone.svg" alt="" width={16} height={16} />
          <span>
            Hotline: <strong>1800.106.8</strong> · Hỗ trợ 24/7
          </span>
        </div>
        <div className="figma-topbar__right">
          <a href="#">Hệ thống 1000+ cửa hàng</a>
          <span className="figma-topbar__sep">|</span>
          <a href="#">Tra cứu đơn hàng</a>
          <span className="figma-topbar__sep">|</span>
          <a href="#">Tuyển dụng</a>
        </div>
      </div>
    </div>
  );
}
