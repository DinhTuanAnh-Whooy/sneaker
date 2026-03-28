import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import BrandsPage from '@/pages/BrandsPage'
import BrandDetailPage from '@/pages/BrandDetailPage'
import CollectionsPage from '@/pages/CollectionsPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import AccountPage from '@/pages/AccountPage'
import AboutPage from '@/pages/AboutPage'
import AdminLayout from '@/components/admin/AdminLayout'
import DashboardPage from '@/pages/admin/DashboardPage'
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage'
import AdminProductsPage from '@/pages/admin/AdminProductsPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/san-pham" element={<ProductsPage />} />
        <Route path="/san-pham/:id" element={<ProductDetailPage />} />
        <Route path="/thuong-hieu" element={<BrandsPage />} />
        <Route path="/thuong-hieu/:slug" element={<BrandDetailPage />} />
        <Route path="/bo-suu-tap" element={<CollectionsPage />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/thanh-toan" element={<CheckoutPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/tai-khoan" element={<AccountPage />} />
        <Route path="/ve-chung-toi" element={<AboutPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          {/* Mock routes for users and settings */}
          <Route path="users" element={<DashboardPage />} />
          <Route path="settings" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}
