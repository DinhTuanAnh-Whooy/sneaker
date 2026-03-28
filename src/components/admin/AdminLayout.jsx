import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Box, Users, Settings, LogOut } from 'lucide-react'
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
  const { user, logout } = useAuth()

  // Mặc định chuyển hướng về trang chủ nếu không phải admin (demo check)
  // if (user?.role !== 'admin' && user?.role !== 'staff') {
  //   window.location.href = '/'
  //   return null
  // }

  return (
    <div className="min-h-screen bg-secondary/30 flex text-sm">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/admin" className="text-xl font-bold tracking-tighter font-heading text-primary">
            SNEAKER<span className="text-accent text-xs align-top ml-1">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarNav.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
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
              <p className="text-xs text-muted-foreground">{user?.role || 'Quản lý'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout()
              window.location.href = '/dang-nhap'
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 md:hidden">
          <Link to="/admin" className="text-xl font-bold tracking-tighter font-heading text-primary">
            SNEAKER<span className="text-accent text-xs align-top ml-1">ADMIN</span>
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
