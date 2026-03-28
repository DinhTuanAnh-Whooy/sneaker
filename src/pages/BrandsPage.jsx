import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { products, formatPrice } from '@/data/products'

const brandsData = [
  { name: "Nike", slug: "nike", description: "Just Do It - Thương hiệu thể thao hàng đầu thế giới.", bgColor: "bg-[#111]" },
  { name: "Adidas", slug: "adidas", description: "Impossible is Nothing - Công nghệ Boost đột phá.", bgColor: "bg-[#000]" },
  { name: "Jordan", slug: "jordan", description: "Thương hiệu biểu tượng của huyền thoại Michael Jordan.", bgColor: "bg-[#CE1141]" },
  { name: "New Balance", slug: "new-balance", description: "Fearlessly Independent - Craftsmanship đỉnh cao.", bgColor: "bg-[#CF0A2C]" },
  { name: "Puma", slug: "puma", description: "Forever Faster - Thể thao kết hợp thời trang.", bgColor: "bg-[#231F20]" },
  { name: "Converse", slug: "converse", description: "Biểu tượng văn hóa đường phố với Chuck Taylor.", bgColor: "bg-[#000]" },
]

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">Thương Hiệu</h1>
            <p className="text-muted-foreground mt-4 text-lg">Khám phá các thương hiệu sneaker hàng đầu thế giới tại SNEAKER</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandsData.map((brand) => (
              <Link to={`/thuong-hieu/${brand.slug}`} key={brand.slug}>
                <div className={`${brand.bgColor} rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform duration-300`}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-bold text-white tracking-tight font-heading">{brand.name}</span>
                      <ArrowRight className="h-6 w-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{brand.description}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <span className="text-white/60 text-sm">{products.filter(p => p.brand === brand.name).length} sản phẩm</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-heading">Sản Phẩm Nổi Bật</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <Link to={`/san-pham/${product.id}`} key={product.id}>
                <div className="bg-secondary rounded-xl overflow-hidden group">
                  <div className="aspect-square relative"><img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <h3 className="font-medium text-sm mt-1 line-clamp-1">{product.name}</h3>
                    <p className="text-accent font-semibold mt-2">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
