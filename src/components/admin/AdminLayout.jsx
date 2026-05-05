import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Box, Users, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const sidebarNav = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Sản phẩm', href: '/admin/products', icon: Box },
  { name: 'Khách hàng', href: '/admin/users', icon: Users },
  { name: 'Cài đặt', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Admin route protection
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-heading mb-2">Truy cập bị từ chối</h1>
          <p className="text-muted-foreground mb-6">Vui lòng đăng nhập với tài khoản Admin để truy cập</p>
          <Link to="/dang-nhap">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium cursor-pointer">Đăng Nhập</button>
          </Link>
        </div>
      </div>
    )
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold font-heading mb-2">Không có quyền truy cập</h1>
          <p className="text-muted-foreground mb-6">Tài khoản của bạn không có quyền quản trị</p>
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <button className="px-6 py-3 border border-border rounded-md font-medium hover:bg-secondary transition-colors cursor-pointer">Về Trang Chủ</button>
            </Link>
            <button onClick={() => { logout(); navigate('/dang-nhap') }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium cursor-pointer">Đăng Nhập Lại</button>
          </div>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/dang-nhap')
  }

  const SidebarContent = () => (
    <>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {sidebarNav.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-foreground mb-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="flex-1 truncate">
            <p className="font-semibold">{user?.name || 'Administrator'}</p>
            <p className="text-xs text-muted-foreground">Quản trị viên</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-secondary/30 flex text-sm">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/admin" className="text-xl font-bold tracking-tighter font-heading text-primary">
            SNEAKER<span className="text-accent text-xs align-top ml-1">ADMIN</span>
          </Link>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <>
          <div className="overlay md:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed top-0 left-0 bottom-0 w-72 bg-card z-50 md:hidden animate-slide-in-left flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <Link to="/admin" className="text-xl font-bold tracking-tighter font-heading text-primary">
                SNEAKER<span className="text-accent text-xs align-top ml-1">ADMIN</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-secondary rounded-md cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 hover:bg-secondary rounded-md cursor-pointer">
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/admin" className="md:hidden text-lg font-bold tracking-tighter font-heading text-primary">
              SNEAKER<span className="text-accent text-xs align-top ml-1">ADMIN</span>
            </Link>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Về cửa hàng
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
