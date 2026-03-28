import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Package, Heart, Settings, LogOut, Edit3, Save, ChevronRight, ChevronDown, ChevronUp, MapPin, CreditCard, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrdersContext'
import { products, formatPrice } from '@/data/products'

const tabs = [
  { id: "profile", label: "Thông Tin", Icon: User },
  { id: "orders", label: "Đơn Hàng", Icon: Package },
  { id: "wishlist", label: "Yêu Thích", Icon: Heart },
  { id: "settings", label: "Cài Đặt", Icon: Settings },
]

const statusConfig = {
  processing: { label: "Đang xử lý", color: "text-blue-500 bg-blue-500/10" },
  shipping: { label: "Đang giao hàng", color: "text-yellow-500 bg-yellow-500/10" },
  delivered: { label: "Đã giao hàng", color: "text-green-500 bg-green-500/10" },
  cancelled: { label: "Đã hủy", color: "text-red-500 bg-red-500/10" },
}

const wishlistProducts = products.slice(0, 4)

export default function AccountPage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
  const { orders } = useOrders()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [expandedOrder, setExpandedOrder] = useState(null)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container mx-auto px-4 py-20 text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Bạn chưa đăng nhập</h1>
            <p className="text-muted-foreground mb-8">Đăng nhập để xem thông tin tài khoản</p>
            <Link to="/dang-nhap"><button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium cursor-pointer">Đăng Nhập</button></Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSaveProfile = () => {
    updateProfile({ name: editName, phone: editPhone })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const startEditing = () => {
    setEditName(user.name)
    setEditPhone(user.phone || "")
    setIsEditing(true)
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
  }

  const totalSpent = orders.filter(o => o.status === "delivered").reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl font-bold text-accent-foreground font-heading">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{orders.length} đơn hàng</span>
                <span>·</span>
                <span>Tổng chi: {formatPrice(totalSpent)}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <aside>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${activeTab === tab.id ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    <tab.Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                    {tab.id === "orders" && orders.length > 0 && (
                      <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded-full">{orders.length}</span>
                    )}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                ))}
                <hr className="border-border my-2" />
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Đăng Xuất</span>
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold font-heading">Thông Tin Cá Nhân</h2>
                    {isEditing ? (
                      <button onClick={handleSaveProfile} className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer"><Save className="h-4 w-4" /> Lưu</button>
                    ) : (
                      <button onClick={startEditing} className="px-4 py-2 border border-border rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-secondary"><Edit3 className="h-4 w-4" /> Chỉnh sửa</button>
                    )}
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Họ và tên</label>
                      {isEditing ? (
                        <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      ) : (
                        <p className="font-medium">{user.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Email</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Số điện thoại</label>
                      {isEditing ? (
                        <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      ) : (
                        <p className="font-medium">{user.phone || "Chưa cập nhật"}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Tổng đơn hàng</label>
                      <p className="font-medium">{orders.length} đơn</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab - Enhanced with full history */}
              {activeTab === "orders" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold font-heading">Lịch Sử Đơn Hàng</h2>
                    <span className="text-sm text-muted-foreground">{orders.length} đơn hàng</span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-16 bg-card border border-border rounded-xl">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Chưa có đơn hàng nào</h3>
                      <p className="text-muted-foreground text-sm mb-6">Hãy mua sắm để có đơn hàng đầu tiên!</p>
                      <Link to="/san-pham"><button className="px-6 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer">Mua Sắm Ngay</button></Link>
                    </div>
                  ) : (
                    orders.map((order) => {
                      const isExpanded = expandedOrder === order.id
                      const status = statusConfig[order.status] || statusConfig.processing

                      return (
                        <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
                          {/* Order Header */}
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer hover:bg-secondary/30 transition-colors text-left"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                                <Package className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="font-semibold text-sm">#{order.id}</h3>
                                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>{status.label}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3 inline mr-1" />
                                  {formatDate(order.date)} · {order.items?.length || 0} sản phẩm
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-lg font-bold text-accent">{formatPrice(order.total)}</p>
                              {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                            </div>
                          </button>

                          {/* Order Details (Expanded) */}
                          {isExpanded && (
                            <div className="border-t border-border p-5 space-y-5 animate-fade-in">
                              {/* Items */}
                              <div>
                                <h4 className="text-sm font-medium mb-3">Sản phẩm đã mua</h4>
                                <div className="space-y-3">
                                  {order.items?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                      <Link to={`/san-pham/${item.product?.id}`} className="w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0 hover:opacity-80 transition-opacity">
                                        <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                                      </Link>
                                      <div className="flex-1 min-w-0">
                                        <Link to={`/san-pham/${item.product?.id}`} className="font-medium text-sm hover:text-accent transition-colors truncate block">{item.product?.name}</Link>
                                        <p className="text-xs text-muted-foreground">{item.product?.brand} · Size: {item.size} · SL: {item.quantity}</p>
                                      </div>
                                      <p className="font-semibold text-sm shrink-0">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Shipping & Payment Info */}
                              <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-secondary/30">
                                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Địa chỉ giao hàng</h4>
                                  <p className="text-sm">{order.shippingAddress?.name}</p>
                                  <p className="text-xs text-muted-foreground">{order.shippingAddress?.phone}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{order.shippingAddress?.address}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-secondary/30">
                                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2"><CreditCard className="h-4 w-4 text-accent" /> Thanh toán</h4>
                                  <p className="text-sm">{order.paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : "Chuyển khoản ngân hàng"}</p>
                                </div>
                              </div>

                              {/* Price Breakdown */}
                              <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tạm tính</span><span>{formatPrice(order.subtotal)}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Vận chuyển</span><span>{order.shipping === 0 ? <span className="text-green-500">Miễn phí</span> : formatPrice(order.shipping)}</span></div>
                                {order.discount > 0 && <div className="flex justify-between text-sm text-green-500"><span>Giảm giá</span><span>-{formatPrice(order.discount)}</span></div>}
                                <hr className="border-border" />
                                <div className="flex justify-between font-bold"><span>Tổng cộng</span><span className="text-accent">{formatPrice(order.total)}</span></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6 font-heading">Sản Phẩm Yêu Thích</h2>
                  {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {wishlistProducts.map((product) => (
                        <Link to={`/san-pham/${product.id}`} key={product.id}>
                          <div className="bg-card rounded-xl overflow-hidden group border border-border hover:border-accent/50 transition-colors">
                            <div className="aspect-square relative bg-secondary">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="text-xs text-muted-foreground">{product.brand}</p>
                              <h3 className="font-medium text-sm mt-1 line-clamp-1">{product.name}</h3>
                              <p className="text-accent font-semibold mt-2">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Chưa có sản phẩm yêu thích</p>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold font-heading">Cài Đặt Tài Khoản</h2>
                  <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Đổi mật khẩu</h3>
                      <div className="space-y-3 max-w-md">
                        <input type="password" placeholder="Mật khẩu hiện tại" className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        <input type="password" placeholder="Mật khẩu mới" className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        <input type="password" placeholder="Xác nhận mật khẩu mới" className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium cursor-pointer">Cập nhật mật khẩu</button>
                      </div>
                    </div>
                    <hr className="border-border" />
                    <div>
                      <h3 className="font-medium mb-3">Thông báo</h3>
                      <div className="space-y-3">
                        {["Nhận email khuyến mãi", "Nhận thông báo đơn hàng", "Nhận tin tức sản phẩm mới"].map((label) => (
                          <label key={label} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
                            <span className="text-sm">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <hr className="border-border" />
                    <div>
                      <h3 className="font-medium text-destructive mb-2">Xóa tài khoản</h3>
                      <p className="text-sm text-muted-foreground mb-3">Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.</p>
                      <button className="px-4 py-2 border border-destructive text-destructive rounded-md text-sm font-medium hover:bg-destructive/10 cursor-pointer">Xóa tài khoản</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
