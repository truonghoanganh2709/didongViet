import ProductCardFigma from '../ProductCardFigma/ProductCardFigma';
import './FlashSale.css';

export default function FlashSale({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="figma-flash">
      <div className="figma-flash__head">
        <div className="figma-flash__title">
          <span className="figma-flash__bolt">⚡</span>
          <h2>Giờ vàng săn sale</h2>
        </div>
        <div className="figma-flash__timer">
          <span>Kết thúc sau</span>
          <div className="figma-flash__clock">
            <b>02</b>:<b>15</b>:<b>48</b>
          </div>
        </div>
      </div>
      <div className="figma-flash__grid">
        {products.slice(0, 5).map((p) => (
          <ProductCardFigma key={p._id} product={p} showDiscount />
        ))}
      </div>
    </section>
  );
}
