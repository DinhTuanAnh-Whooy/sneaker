import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw, Tag } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/data/products'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SNEAKER10") setDiscount(getTotalPrice() * 0.1)
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 1000000 ? 0 : 30000
  const total = subtotal - discount + shipping

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Giỏ Hàng</h1>
            <p className="text-muted-foreground mt-2">
              {items.length > 0 ? `Bạn có ${items.length} sản phẩm trong giỏ hàng` : "Giỏ hàng của bạn đang trống"}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Giỏ hàng trống</h2>
              <p className="text-muted-foreground mb-6">Hãy khám phá các sản phẩm tuyệt vời và thêm vào giỏ hàng</p>
              <Link to="/san-pham">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium flex items-center gap-2 cursor-pointer">
                  Tiếp Tục Mua Sắm <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Sản Phẩm</h2>
                  <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive cursor-pointer">Xóa tất cả</button>
                </div>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          <h3 className="font-semibold truncate">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                        </div>
                        <button onClick={() => removeItem(item.product.id, item.size)} className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-2 hover:bg-secondary transition-colors cursor-pointer"><Minus className="h-4 w-4" /></button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-2 hover:bg-secondary transition-colors cursor-pointer"><Plus className="h-4 w-4" /></button>
                        </div>
                        <div className="text-right">
                          {item.product.originalPrice && <p className="text-sm text-muted-foreground line-through">{formatPrice(item.product.originalPrice * item.quantity)}</p>}
                          <p className="text-lg font-bold text-accent">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { Icon: Truck, title: "Miễn phí vận chuyển", desc: "Đơn hàng từ 1 triệu" },
                    { Icon: Shield, title: "100% Chính hãng", desc: "Cam kết authentic" },
                    { Icon: RotateCcw, title: "Đổi trả 30 ngày", desc: "Hoàn tiền dễ dàng" },
                  ].map((b) => (
                    <div key={b.title} className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50">
                      <b.Icon className="h-6 w-6 text-accent mb-2" />
                      <p className="text-sm font-medium">{b.title}</p>
                      <p className="text-xs text-muted-foreground">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24 space-y-4">
                  <h3 className="text-lg font-semibold">Tóm Tắt Đơn Hàng</h3>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input placeholder="Mã giảm giá" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="w-full h-10 pl-9 pr-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <button onClick={handleApplyPromo} className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors cursor-pointer">Áp dụng</button>
                  </div>
                  {discount > 0 && <p className="text-sm text-green-500">Mã SNEAKER10 đã được áp dụng!</p>}

                  <hr className="border-border" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-sm text-green-500"><span>Giảm giá</span><span>-{formatPrice(discount)}</span></div>}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vận chuyển</span>
                      <span>{shipping === 0 ? <span className="text-green-500">Miễn phí</span> : formatPrice(shipping)}</span>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-accent">{formatPrice(total)}</span>
                  </div>

                  <Link to="/thanh-toan">
                    <button className="w-full h-12 bg-primary text-primary-foreground rounded-md font-semibold text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer">
                      Tiến Hành Thanh Toán <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                  <Link to="/san-pham"><button className="w-full py-2 border border-border rounded-md hover:bg-secondary transition-colors cursor-pointer">Tiếp Tục Mua Sắm</button></Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
