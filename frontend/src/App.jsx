import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. IMPORT THƯ VIỆN ICON VÀ CSS TỔNG
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './index.css'; 

// 2. IMPORT CÁC TRANG (PAGES)
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
// import Login from './pages/Login'; // Tạm tắt nếu chưa code xong file Login

// 3. IMPORT COMPONENT DÙNG CHUNG (HEADER & FOOTER)
import Header from './components/Header'; 
import Footer from './components/Footer'; 

function App() {
  return (
    <BrowserRouter>
      
      {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG */}
      <Header /> 

      {/* KHU VỰC NỘI DUNG ĐỘNG (THAY ĐỔI THEO LINK) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {/* CHÂN TRANG DƯỚI CÙNG */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;