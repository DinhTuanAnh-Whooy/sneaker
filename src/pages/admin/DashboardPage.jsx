import { DollarSign, ShoppingBag, Users, TrendingUp, Package, AlertCircle } from 'lucide-react'
import { useOrders } from '@/contexts/OrdersContext'
import { useProducts } from '@/contexts/ProductsContext'
import { Link } from 'react-router-dom'
import { formatPrice } from '@/data/products'

export default function DashboardPage() {
  const { orders } = useOrders()
  const { products } = useProducts()

  // Calculate stats dynamically
  const totalRevenue = orders
    .filter((o) => o.status === 'delivered' || o.status === 'processing' || o.status === 'shipping')
    .reduce((sum, o) => sum + o.total, 0)

  const newOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
  const usersCount = JSON.parse(localStorage.getItem('sneaker-users') || '[]').length || 7

  const stats = [
    { name: 'Tổng doanh thu', value: formatPrice(totalRevenue), change: '+12.5%', isUp: true, icon: DollarSign },
    { name: 'Đơn hàng mới', value: String(newOrdersCount), change: '+23.1%', isUp: true, icon: ShoppingBag },
    { name: 'Khách hàng', value: String(usersCount), change: '+4.3%', isUp: true, icon: Users },
    { name: 'Lượt truy cập', value: '45,231', change: '-2.4%', isUp: false, icon: TrendingUp },
  ]

  // Get 4 recent orders
  const recentOrders = orders.slice(0, 4)

  // Get low stock products (mock stock deterministically for products under 5 items left)
  const lowStockItems = products
    .map((p) => {
      // Deterministic stock value based on product id
      const stock = (parseInt(p.id) * 7 + 3) % 15
      return {
        name: p.name,
        size: String(38 + (parseInt(p.id) % 6)),
        left: stock,
      }
    })
    .filter((p) => p.left <= 3)
    .slice(0, 4)

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return { label: 'Hoàn thành', class: 'bg-green-500/10 text-green-500' }
      case 'processing':
      case 'shipping':
        return { label: 'Đang xử lý', class: 'bg-blue-500/10 text-blue-500' }
      case 'cancelled':
        return { label: 'Đã hủy', class: 'bg-red-500/10 text-red-500' }
      default:
        return { label: 'Chờ xác nhận', class: 'bg-amber-500/10 text-amber-500' }
    }
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Tổng Quan</h1>
        <p className="text-muted-foreground mt-1">Hello, Administrator! Chào mừng trở lại bảng điều khiển.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card p-6 rounded-xl border border-border">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold font-heading">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading">Đơn Hàng Gần Đây</h2>
            <Link to="/admin/orders" className="text-sm font-medium text-primary hover:underline cursor-pointer">Xem tất cả</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-xs text-muted-foreground bg-secondary/50 rounded-lg">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-l-lg">Mã đơn</th>
                  <th className="px-4 py-3 font-medium">Khách hàng</th>
                  <th className="px-4 py-3 font-medium">Ngày đặt</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium rounded-r-lg">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => {
                    const statusConf = getStatusConfig(order.status)
                    return (
                      <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-accent">#{order.id}</td>
                        <td className="px-4 py-3">{order.shippingAddress?.name || 'Khách hàng ẩn danh'}</td>
                        <td className="px-4 py-3 text-muted-foreground">{formatDate(order.date)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusConf.class}`}>
                            {statusConf.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-muted-foreground">Chưa có đơn hàng nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-card rounded-xl border border-border p-6 mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading">Cảnh Báo Kho</h2>
          </div>
          <div className="space-y-4">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/30">
                  <div className={`p-2 rounded-md ${item.left === 0 ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                    {item.left === 0 ? <AlertCircle className="h-5 w-5 text-red-500" /> : <Package className="h-5 w-5 text-amber-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Size: {item.size} • Còn lại: <span className={`font-semibold ${item.left === 0 ? 'text-red-500' : 'text-amber-500'}`}>{item.left}</span></p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">Mọi sản phẩm đều đủ số lượng tồn kho</p>
            )}
          </div>
          <Link to="/admin/products">
            <button className="w-full mt-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors cursor-pointer bg-transparent text-foreground">
              Xem toàn bộ kho
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
