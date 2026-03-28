import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

const brandsList = [
  { name: "NIKE", logo: "NIKE" },
  { name: "ADIDAS", logo: "ADIDAS" },
  { name: "JORDAN", logo: "JORDAN" },
  { name: "NEW BALANCE", logo: "NB" },
  { name: "PUMA", logo: "PUMA" },
  { name: "CONVERSE", logo: "CONVERSE" },
]

const categoriesList = [
  { name: "Giày Chạy Bộ", description: "Hiệu suất tối đa", image: "/categories/running.jpg", count: "256+ sản phẩm", href: "/san-pham" },
  { name: "Giày Bóng Rổ", description: "Chinh phục sân đấu", image: "/categories/basketball.jpg", count: "184+ sản phẩm", href: "/san-pham" },
  { name: "Lifestyle", description: "Phong cách hàng ngày", image: "/categories/lifestyle.jpg", count: "892+ sản phẩm", href: "/san-pham" },
]

const featuredProducts = products.slice(0, 8)

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 text-[20vw] font-bold tracking-tighter text-foreground font-heading">SNEAKER</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <span className="inline-block px-4 py-1.5 bg-secondary text-sm font-medium rounded-full mb-6 uppercase tracking-wider">
                Bộ Sưu Tập Mới 2026
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight font-heading">
                <span className="block">PHONG CÁCH</span>
                <span className="block text-accent">THỜI THƯỢNG</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                Khám phá bộ sưu tập sneaker chính hãng mới nhất. Từ đường phố đến sân bóng, chúng tôi có tất cả.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/san-pham">
                  <button className="group px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium text-base hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer">
                    Mua Ngay
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/bo-suu-tap">
                  <button className="px-8 py-3 border border-border rounded-md font-medium text-base hover:bg-secondary transition-colors cursor-pointer">
                    Xem Bộ Sưu Tập
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in-up delay-200 animate-on-load">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl" />
                <img src="/hero-sneaker.jpg" alt="Featured Sneaker" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
              </div>
              <div className="absolute top-1/4 left-0 bg-card p-4 rounded-lg border border-border animate-fade-in-up delay-400 animate-on-load">
                <p className="text-2xl font-bold font-heading">1,500+</p>
                <p className="text-sm text-muted-foreground">Sản Phẩm</p>
              </div>
              <div className="absolute bottom-1/4 right-0 bg-card p-4 rounded-lg border border-border animate-fade-in-up delay-500 animate-on-load">
                <p className="text-2xl font-bold font-heading">100%</p>
                <p className="text-sm text-muted-foreground">Chính Hãng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-500 animate-on-load">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Cuộn xuống</span>
            <div className="w-px h-12 bg-border relative overflow-hidden">
              <div className="absolute top-0 w-full h-4 bg-accent animate-scroll-line" />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-muted-foreground uppercase tracking-widest text-sm">
              Các thương hiệu hàng đầu thế giới
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brandsList.map((brand) => (
              <div key={brand.name} className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer tracking-wider font-heading">
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Bán Chạy Nhất</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 tracking-tight font-heading">SẢN PHẨM NỔI BẬT</h2>
            </div>
            <Link to="/san-pham">
              <button className="group self-start md:self-auto px-6 py-2 border border-border rounded-md hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer">
                Xem Tất Cả
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Khám Phá</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 tracking-tight font-heading">DANH MỤC SẢN PHẨM</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categoriesList.map((category) => (
              <Link to={category.href} key={category.name} className="group block">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category.count}</p>
                    <h3 className="text-2xl font-bold mb-1 font-heading">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <span className="inline-flex items-center text-sm font-medium group-hover:text-accent transition-colors">
                      Xem Ngay
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/10" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold tracking-tighter text-foreground whitespace-nowrap font-heading">SNEAKER</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Đăng Ký Nhận Tin</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 tracking-tight font-heading">NHẬN ƯU ĐÃI ĐẶC BIỆT</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Đăng ký ngay để nhận thông tin về các bộ sưu tập mới nhất và ưu đãi độc quyền.
              Giảm ngay 10% cho đơn hàng đầu tiên!
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 h-12 px-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="submit" className="group h-12 px-6 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                Đăng Ký
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Bằng việc đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
