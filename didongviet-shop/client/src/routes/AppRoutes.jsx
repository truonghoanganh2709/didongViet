import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute/AdminRoute';
import Home from '../pages/Home/Home';
import ProductListPage from '../pages/ProductList/ProductListPage';
import ProductDetailPage from '../pages/ProductDetail/ProductDetailPage';
import CartPage from '../pages/Cart/CartPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import ProfilePage from '../pages/User/ProfilePage';
import OrderHistoryPage from '../pages/User/OrderHistoryPage';
import OrderDetailPage from '../pages/User/OrderDetailPage';
import WishlistPage from '../pages/Wishlist/WishlistPage';
import ComparePage from '../pages/Compare/ComparePage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import { ROUTES } from '../constants/routes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Trang chủ Figma — full layout riêng */}
      <Route path={ROUTES.HOME} element={<Home />} />

      <Route element={<MainLayout />}>
        <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CATEGORY} element={<ProductListPage />} />
        <Route path={ROUTES.SEARCH} element={<ProductListPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.COMPARE} element={<ComparePage />} />
        <Route
          path={ROUTES.CHECKOUT}
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDERS}
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDER_DETAIL}
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN}
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
