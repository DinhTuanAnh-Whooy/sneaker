import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/san-pham", label: "Sản Phẩm" },
  { href: "/thuong-hieu", label: "Thương Hiệu" },
  { href: "/bo-suu-tap", label: "Bộ Sưu Tập" },
  { href: "/ve-chung-toi", label: "Về Chúng Tôi" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { isAuthenticated } = useAuth()
  const cartCount = getTotalItems()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tighter font-heading">
            SNEAKER<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to={isAuthenticated ? "/tai-khoan" : "/dang-nhap"}>
              <button className="hidden md:flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary transition-colors cursor-pointer">
                <User className="h-5 w-5" />
              </button>
            </Link>
            <Link to="/gio-hang">
              <button className="relative flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary transition-colors cursor-pointer">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-background z-50 animate-slide-in-right">
            <div className="flex items-center justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col h-[calc(100%-64px)] px-6 pt-4">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-medium py-2 border-b border-border hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-8 flex gap-4">
                <Link
                  to={isAuthenticated ? "/tai-khoan" : "/dang-nhap"}
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  <button className="w-full py-2 px-4 border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    {isAuthenticated ? "Tài Khoản" : "Đăng Nhập"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
