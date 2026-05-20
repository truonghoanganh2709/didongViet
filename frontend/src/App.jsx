import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
      {/* Component Header sẽ luôn nằm ở trên cùng */}
      <Header /> 

      {/* Nội dung trang sẽ thay đổi ở dưới */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App