import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Flame, Zap, Star } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { products, formatPrice } from '@/data/products'

const collections = [
  { id: "new-arrivals", title: "Hàng Mới Về", description: "Những đôi giày mới nhất vừa cập bến SNEAKER", Icon: Sparkles, gradient: "from-orange-500 to-red-500", items: products.filter(p => p.isNew) },
  { id: "best-sellers", title: "Bán Chạy Nhất", description: "Top sản phẩm được yêu thích nhất tại SNEAKER", Icon: Flame, gradient: "from-pink-500 to-rose-500", items: products.slice(0, 6) },
  { id: "sale", title: "Đang Giảm Giá", description: "Săn deal hot với giá ưu đãi đặc biệt", Icon: Zap, gradient: "from-green-500 to-emerald-500", items: products.filter(p => p.isSale) },
  { id: "premium", title: "Premium Collection", description: "Bộ sưu tập cao cấp dành cho tín đồ sneaker", Icon: Star, gradient: "from-amber-500 to-yellow-500", items: products.filter(p => p.price > 5000000) },
]

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">Bộ Sưu Tập</h1>
            <p className="text-muted-foreground mt-4 text-lg">Khám phá các bộ sưu tập sneaker độc quyền được tuyển chọn bởi SNEAKER</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {collections.map((collection) => (
              <div key={collection.id}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${collection.gradient}`}>
                      <collection.Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold font-heading">{collection.title}</h2>
                      <p className="text-muted-foreground mt-1">{collection.description}</p>
                    </div>
                  </div>
                  <Link to="/san-pham">
                    <button className="group px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer">
                      Xem tất cả <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {collection.items.slice(0, 5).map((product) => (
                    <Link to={`/san-pham/${product.id}`} key={product.id}>
                      <div className="bg-card rounded-xl overflow-hidden group border border-border hover:border-accent/50 transition-all">
                        <div className="aspect-square relative bg-secondary">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          {product.isNew && <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded">MỚI</span>}
                          {product.isSale && product.originalPrice && <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
                        </div>
                        <div className="p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                          <h3 className="font-medium text-sm mt-1 line-clamp-1">{product.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-accent font-bold text-sm">{formatPrice(product.price)}</p>
                            {product.originalPrice && <p className="text-muted-foreground text-xs line-through">{formatPrice(product.originalPrice)}</p>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">Không tìm thấy thứ bạn cần?</h2>
          <p className="text-muted-foreground mt-2">Khám phá toàn bộ sản phẩm của chúng tôi</p>
          <Link to="/san-pham"><button className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium cursor-pointer">Xem Tất Cả Sản Phẩm</button></Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
