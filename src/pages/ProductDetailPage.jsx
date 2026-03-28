import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { products, formatPrice } from '@/data/products'
import { useCart } from '@/contexts/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
          <Link to="/san-pham"><button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer">Quay lại cửa hàng</button></Link>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 md:pt-28 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/san-pham" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Quay lại sản phẩm
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-secondary">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-lg">MỚI</span>}
                {product.isSale && <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-lg">SALE</span>}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`aspect-square rounded-xl overflow-hidden bg-secondary border-2 cursor-pointer transition-colors ${i === 1 ? 'border-accent' : 'border-transparent hover:border-accent/50'}`}>
                    <img src={product.image} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:py-4 animate-fade-in-up delay-200 animate-on-load">
              <div className="flex items-center gap-4 mb-2">
                <Link to={`/thuong-hieu/${product.brand.toLowerCase().replace(" ", "-")}`} className="text-accent font-medium hover:underline">{product.brand}</Link>
                <span className="text-muted-foreground text-sm">SKU: {product.id.padStart(6, '0')}</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl md:text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-red-500/20 text-red-500 text-sm font-medium px-2 py-1 rounded">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Colors */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Màu sắc: <span className="text-muted-foreground">{product.colors.join(", ")}</span></h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button key={color} className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${index === 0 ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/50'}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Kích cỡ</h3>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${selectedSize === size ? 'border-accent bg-accent text-accent-foreground' : 'border-border hover:border-accent/50'}`}>
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && <p className="text-sm text-muted-foreground mt-2">Vui lòng chọn size</p>}
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Số lượng</h3>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors cursor-pointer"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors cursor-pointer"><Plus className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                <button onClick={handleAddToCart} disabled={!selectedSize}
                  className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  {addedToCart ? <><Check className="h-5 w-5" /> Đã thêm vào giỏ</> : <><ShoppingBag className="h-5 w-5" /> Thêm Vào Giỏ</>}
                </button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-3 border border-border rounded-md hover:bg-secondary transition-colors cursor-pointer">
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="p-3 border border-border rounded-md hover:bg-secondary transition-colors cursor-pointer"><Share2 className="h-5 w-5" /></button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center"><Truck className="h-6 w-6 mx-auto text-muted-foreground" /><p className="text-xs text-muted-foreground mt-2">Miễn phí ship</p></div>
                <div className="text-center"><Shield className="h-6 w-6 mx-auto text-muted-foreground" /><p className="text-xs text-muted-foreground mt-2">Chính hãng 100%</p></div>
                <div className="text-center"><RotateCcw className="h-6 w-6 mx-auto text-muted-foreground" /><p className="text-xs text-muted-foreground mt-2">Đổi trả 30 ngày</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 font-heading">Mô Tả Sản Phẩm</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.name} là một trong những đôi giày được yêu thích nhất của {product.brand}.
            Với thiết kế hiện đại kết hợp công nghệ đệm tiên tiến, đôi giày mang đến sự thoải mái
            tuyệt vời cho người mang suốt cả ngày dài.
          </p>
          <ul className="text-muted-foreground mt-4 space-y-2 list-disc list-inside">
            <li>Chất liệu: Da cao cấp / Vải mesh thoáng khí</li>
            <li>Đế: Cao su chống trượt</li>
            <li>Màu sắc: {product.colors.join(", ")}</li>
            <li>Xuất xứ: Chính hãng {product.brand}</li>
          </ul>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 font-heading">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link to={`/san-pham/${p.id}`} key={p.id}>
                  <div className="bg-card rounded-xl overflow-hidden group border border-border hover:border-accent/50 transition-colors">
                    <div className="aspect-square relative bg-secondary">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                      <h3 className="font-medium text-sm mt-1 line-clamp-1">{p.name}</h3>
                      <p className="text-accent font-semibold mt-2">{formatPrice(p.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  )
}
