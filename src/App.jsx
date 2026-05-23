import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Wrench } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
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
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import AccountPage from '@/pages/AccountPage'
import AboutPage from '@/pages/AboutPage'
import AdminLayout from '@/components/admin/AdminLayout'
import DashboardPage from '@/pages/admin/DashboardPage'
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage'
import AdminProductsPage from '@/pages/admin/AdminProductsPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const [isMaintenance, setIsMaintenance] = useState(false)

  // Load configuration and theme on startup / path change
  useEffect(() => {
    const stored = localStorage.getItem('sneaker-settings')
    if (stored) {
      const config = JSON.parse(stored)
      
      // Enforce saved theme
      const theme = config.theme || 'dark'
      document.documentElement.classList.remove('light', 'dark', 'navy')
      if (theme !== 'dark') {
        document.documentElement.classList.add(theme)
      }
      
      // Enforce maintenance mode
      setIsMaintenance(config.maintenanceMode || false)
    }
  }, [pathname])

  const isAdminPath = pathname.startsWith('/admin')
  const isLoginPath = pathname === '/dang-nhap'
  const isUserAdmin = user?.role === 'admin'

  // Block client-side pages if maintenance mode is enabled and user is not an admin
  if (isMaintenance && !isUserAdmin && !isAdminPath && !isLoginPath) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="max-w-md w-full bg-card border border-border p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-red-500 to-amber-500" />
          
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6 text-accent animate-pulse">
            <Wrench className="h-8 w-8" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-3 tracking-tight">Cửa Hàng Đang Bảo Trì</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Chúng tôi đang thực hiện một số nâng cấp hệ thống định kỳ để đem lại trải nghiệm mua sắm tuyệt vời nhất cho bạn. SNEAKER sẽ sớm quay trở lại hoạt động!
          </p>
          
          <div className="py-3 px-4 bg-secondary/50 rounded-lg inline-block border border-border">
            <span className="text-xs text-muted-foreground font-medium">Thời gian dự kiến: 30 - 60 phút</span>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
            <span>© 2026 SNEAKER Store</span>
            <Link to="/dang-nhap" className="hover:text-accent font-medium transition-colors">
              Đăng nhập Admin →
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
        <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
        <Route path="/tai-khoan" element={<AccountPage />} />
        <Route path="/ve-chung-toi" element={<AboutPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </>
  )
}
