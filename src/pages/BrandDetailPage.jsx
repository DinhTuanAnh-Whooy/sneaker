import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { products, formatPrice } from '@/data/products'

const brandInfo = {
  nike: { name: "Nike", slogan: "Just Do It", description: "Nike là thương hiệu thể thao hàng đầu thế giới, nổi tiếng với các công nghệ tiên tiến như Air Max, React, ZoomX và những đôi giày mang tính biểu tượng." },
  adidas: { name: "Adidas", slogan: "Impossible Is Nothing", description: "Adidas được biết đến với công nghệ Boost đột phá và các dòng sản phẩm iconic như Ultraboost, Yeezy, Forum và Superstar." },
  jordan: { name: "Jordan", slogan: "Become Legendary", description: "Jordan Brand được thành lập bởi huyền thoại Michael Jordan, nổi tiếng với các dòng Air Jordan huyền thoại." },
  "new-balance": { name: "New Balance", slogan: "Fearlessly Independent Since 1906", description: "New Balance tự hào với truyền thống craftsmanship và các dòng giày classic như 990, 574, 550." },
  puma: { name: "Puma", slogan: "Forever Faster", description: "Puma kết hợp hoàn hảo giữa thể thao và thời trang với Suede Classic, RS-X, Speedcat." },
  converse: { name: "Converse", slogan: "Shoes Keep It Weird", description: "Converse là thương hiệu sneaker lâu đời nhất với Chuck Taylor All Star - biểu tượng văn hóa đường phố." },
}

export default function BrandDetailPage() {
  const { slug } = useParams()
  const brand = brandInfo[slug]

  if (!brand) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy thương hiệu</h1>
          <Link to="/thuong-hieu"><button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer">Quay lại</button></Link>
        </div>
        <Footer />
      </main>
    )
  }

  const brandProducts = products.filter(
    p => p.brand.toLowerCase().replace(" ", "-") === slug || p.brand.toLowerCase() === slug.replace("-", " ")
  )

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 md:pt-32 pb-12 bg-card">
        <div className="container mx-auto px-4">
          <Link to="/thuong-hieu" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Tất cả thương hiệu
          </Link>
          <div className="max-w-3xl animate-fade-in-up">
            <p className="text-accent font-medium mb-2">{brand.slogan}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">{brand.name}</h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{brand.description}</p>
            <div className="mt-6"><span className="text-sm text-muted-foreground">{brandProducts.length} sản phẩm có sẵn</span></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-8">Tất Cả Sản Phẩm</h2>
          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {brandProducts.map((product) => (
                <Link to={`/san-pham/${product.id}`} key={product.id}>
                  <div className="bg-card rounded-xl overflow-hidden group border border-border hover:border-accent/50 transition-colors">
                    <div className="aspect-square relative bg-secondary">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {product.isNew && <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">MỚI</span>}
                      {product.isSale && <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">SALE</span>}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      <h3 className="font-medium mt-1 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-accent font-bold">{formatPrice(product.price)}</p>
                        {product.originalPrice && <p className="text-muted-foreground text-sm line-through">{formatPrice(product.originalPrice)}</p>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20"><p className="text-muted-foreground">Chưa có sản phẩm nào</p></div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
