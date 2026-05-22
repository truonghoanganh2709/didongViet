import React from 'react';
import { Link } from 'react-router-dom'; // Bổ sung Link từ thư viện
import './QuickLinks.scss';
import { quickLinksData } from '../data/products';

const QuickLinks = () => {
  return (
    <section className="quick-links">
      <div className="container">
        
        <div className="links-grid">
          {quickLinksData.map((link) => (
            
            // Thay thẻ <a> thành thẻ <Link> để chuyển trang không bị load lại web
            <Link 
              to={`/product/${link.id}`} 
              className="link-item" 
              key={link.id} 
              style={{ textDecoration: 'none' }}
            >
              
              <div className="icon-box">
                <img src={link.img} alt={link.name} />
              </div>
              
              <span className="link-name">{link.name}</span>
              
            </Link>

          ))}
        </div>

      </div>
    </section>
  );
};

export default QuickLinks;