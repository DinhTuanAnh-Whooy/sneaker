import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Banknote, MapPin, Phone, User, Mail, Check, Loader2, ShoppingBag, Truck, Shield, Tag } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrdersContext'
import { formatPrice } from '@/data/products'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { addOrder } = useOrders()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "TP. Hồ Chí Minh",
    district: "",
    note: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 1000000 ? 0 : 30000
  const total = subtotal + shipping

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.address || !formData.district) return

    setIsSubmitting(true)
    setTimeout(() => {
      const order = addOrder({
        paymentMethod,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: `${formData.address}, ${formData.district}, ${formData.city}`,
        },
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        })),
        subtotal,
        shipping,
        discount: 0,
        total,
        note: formData.note,
      })
      clearCart()
      setIsSubmitting(false)
      setOrderSuccess(order)
    }, 2000)
  }

  // Redirect if cart is empty and no success
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container mx-auto px-4 py-20 text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-8">Vui lòng thêm sản phẩm trước khi thanh toán</p>
            <Link to="/san-pham"><button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium cursor-pointer">Mua Sắm Ngay</button></Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Success state
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container mx-auto px-4 py-16 md:py-24 text-center animate-fade-in-up">
            <div className="max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold font-heading mb-2">Đặt Hàng Thành Công!</h1>
              <p className="text-muted-foreground mb-2">Cảm ơn bạn đã mua sắm tại SNEAKER</p>
              <p className="text-sm text-muted-foreground mb-8">Mã đơn hàng: <span className="text-accent font-semibold">{orderSuccess.id}</span></p>

              <div className="bg-card border border-border rounded-xl p-6 text-left space-y-4 mb-8">
                <h3 className="font-semibold">Chi tiết đơn hàng</h3>
                {orderSuccess.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Size: {item.size} · SL: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                <hr className="border-border" />
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-accent">{formatPrice(orderSuccess.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tai-khoan">
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium cursor-pointer">Xem Đơn Hàng</button>
                </Link>
                <Link to="/san-pham">
                  <button className="px-8 py-3 border border-border rounded-md font-medium hover:bg-secondary transition-colors cursor-pointer">Tiếp Tục Mua Sắm</button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link to="/gio-hang" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Quay lại giỏ hàng
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 animate-fade-in-up">Thanh Toán</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                {/* Shipping Info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><MapPin className="h-5 w-5 text-accent" /> Thông Tin Giao Hàng</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Họ và tên *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input name="name" value={formData.name} onChange={handleChange} required placeholder="Nguyễn Văn A"
                          className="w-full h-11 pl-10 pr-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Số điện thoại *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="0912345678"
                          className="w-full h-11 pl-10 pr-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com"
                          className="w-full h-11 pl-10 pr-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Thành phố</label>
                      <select name="city" value={formData.city} onChange={handleChange}
                        className="w-full h-11 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer">
                        <option>TP. Hồ Chí Minh</option>
                        <option>Hà Nội</option>
                        <option>Đà Nẵng</option>
                        <option>Hải Phòng</option>
                        <option>Cần Thơ</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Quận / Huyện *</label>
                      <input name="district" value={formData.district} onChange={handleChange} required placeholder="Quận 1"
                        className="w-full h-11 px-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Địa chỉ cụ thể *</label>
                      <input name="address" value={formData.address} onChange={handleChange} required placeholder="Số nhà, tên đường, phường/xã"
                        className="w-full h-11 px-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Ghi chú</label>
                      <textarea name="note" value={formData.note} onChange={handleChange} rows={3} placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                        className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><CreditCard className="h-5 w-5 text-accent" /> Phương Thức Thanh Toán</h2>
                  <div className="space-y-3">
                    {[
                      { id: "COD", label: "Thanh toán khi nhận hàng (COD)", desc: "Thanh toán bằng tiền mặt khi giao hàng", Icon: Banknote },
                      { id: "banking", label: "Chuyển khoản ngân hàng", desc: "Chuyển khoản trước qua tài khoản ngân hàng", Icon: CreditCard },
                    ].map((method) => (
                      <label key={method.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"}`}>
                        <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)}
                          className="mt-1 accent-accent" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <method.Icon className="h-4 w-4 text-accent" />
                            <span className="font-medium text-sm">{method.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "banking" && (
                    <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
                      <p className="text-sm font-medium mb-2">Thông tin chuyển khoản:</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Ngân hàng: <span className="text-foreground">Vietcombank</span></p>
                        <p>Số tài khoản: <span className="text-foreground">1234567890</span></p>
                        <p>Chủ tài khoản: <span className="text-foreground">CONG TY SNEAKER</span></p>
                        <p>Nội dung: <span className="text-accent">SNEAKER [Mã đơn hàng]</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Summary */}
              <div>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24 space-y-4 animate-fade-in-up delay-200 animate-on-load">
                  <h3 className="text-lg font-semibold">Đơn Hàng ({items.length} sản phẩm)</h3>

                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">{item.quantity}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                        </div>
                        <p className="font-semibold text-sm shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <hr className="border-border" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
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

                  <button type="submit" disabled={isSubmitting}
                    className="w-full h-12 bg-accent text-accent-foreground rounded-md font-semibold text-base hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                    {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Đang xử lý...</> : <><Check className="h-5 w-5" /> Xác Nhận Đặt Hàng</>}
                  </button>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                    <Shield className="h-3 w-3" />
                    <span>Thông tin được bảo mật và mã hóa</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
