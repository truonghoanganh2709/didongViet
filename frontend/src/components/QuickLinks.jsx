import React from 'react'
import './QuickLinks.scss'

const QuickLinks = () => {
  // Mảng dữ liệu 26 item trỏ thẳng vào thư mục public/images của dự án
  const links = [
    { name: 'iPhone 17 Pro Max', img: '/images/ql-1.png' },
    { name: 'Galaxy S26 Ultra', img: '/images/ql-2.png' },
    { name: 'Redmi Note 15', img: '/images/ql-3.png' },
    { name: 'iPhone 15 Pro Max Cũ', img: '/images/ql-4.png' },
    { name: 'iPhone 17 256GB', img: '/images/ql-5.png' },
    { name: 'Galaxy A', img: '/images/ql-6.png' },
    { name: 'Oppo Reno15', img: '/images/ql-7.png' },
    { name: 'Samsung Cũ', img: '/images/ql-8.png' },
    { name: 'iPad', img: '/images/ql-9.png' },
    { name: 'Galaxy Tab S11', img: '/images/ql-10.png' },
    { name: 'Xiaomi 15T 5G', img: '/images/ql-11.png' },
    { name: 'iPhone Cũ giá rẻ', img: '/images/ql-12.png' },
    { name: 'iPhone 11', img: '/images/ql-13.png' },
    // Hàng 2
    { name: 'JBL Flip 7', img: '/images/ql-14.png' },
    { name: 'Huawei GT6 46MM', img: '/images/ql-15.png' },
    { name: 'AirPods', img: '/images/ql-16.png' },
    { name: 'Bình giữ nhiệt', img: '/images/ql-17.png' },
    { name: 'Macbook Neo', img: '/images/ql-18.png' },
    { name: 'Tai nghe chính hãng', img: '/images/ql-19.png' },
    { name: 'Huawei Matepad', img: '/images/ql-20.png' },
    { name: 'Gia dụng Bear', img: '/images/ql-21.png' },
    { name: 'Xe máy điện', img: '/images/ql-22.png' },
    { name: 'Phụ kiện', img: '/images/ql-23.png' },
    { name: 'Lên đời siêu hời', img: '/images/ql-24.png' },
    { name: 'Vòng đeo tay thông minh', img: '/images/ql-25.png' },
    { name: 'Sạc dự phòng', img: '/images/ql-26.png' },
  ]

  return (
    <section className="quick-links">
      <div className="container">
        <div className="quick-links__wrapper">
          {links.map((item, index) => (
            <div className="quick-links__item" key={index}>
              <div className="icon-box">
                <img src={item.img} alt={item.name} />
              </div>
              <span className="link-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinks