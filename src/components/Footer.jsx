import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube } from 'lucide-react'

const footerLinks = {
  shop: {
    title: "Mua Sắm",
    links: [
      { label: "Sản Phẩm", href: "/san-pham" },
      { label: "Bộ Sưu Tập", href: "/bo-suu-tap" },
      { label: "Thương Hiệu", href: "/thuong-hieu" },
    ],
  },
  brands: {
    title: "Thương Hiệu",
    links: [
      { label: "Nike", href: "/thuong-hieu/nike" },
      { label: "Adidas", href: "/thuong-hieu/adidas" },
      { label: "Jordan", href: "/thuong-hieu/jordan" },
      { label: "New Balance", href: "/thuong-hieu/new-balance" },
    ],
  },
  support: {
    title: "Hỗ Trợ",
    links: [
      { label: "Về Chúng Tôi", href: "/ve-chung-toi" },
      { label: "Liên Hệ", href: "/ve-chung-toi" },
    ],
  },
  account: {
    title: "Tài Khoản",
    links: [
      { label: "Đăng Nhập", href: "/dang-nhap" },
      { label: "Đăng Ký", href: "/dang-ky" },
      { label: "Giỏ Hàng", href: "/gio-hang" },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter font-heading">
              SNEAKER<span className="text-accent">.</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Shop sneaker chính hãng hàng đầu Việt Nam. Cam kết 100% authentic.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 SNEAKER. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
