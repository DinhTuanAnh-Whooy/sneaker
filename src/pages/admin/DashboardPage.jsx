import { DollarSign, ShoppingBag, Users, TrendingUp, Package, AlertCircle } from 'lucide-react'

const stats = [
  { name: 'Tổng doanh thu', value: '124.500.000đ', change: '+12.5%', isUp: true, icon: DollarSign },
  { name: 'Đơn hàng mới', value: '56', change: '+23.1%', isUp: true, icon: ShoppingBag },
  { name: 'Khách hàng', value: '1,245', change: '+4.3%', isUp: true, icon: Users },
  { name: 'Lượt truy cập', value: '45,231', change: '-2.4%', isUp: false, icon: TrendingUp },
]

export default function DashboardPage() {
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
            <button className="text-sm font-medium text-primary hover:underline cursor-pointer">Xem tất cả</button>
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
                {[
                  { id: '#ORD-0012', customer: 'Nguyễn Văn A', date: '25/03/2026', status: 'pending', total: '3.500.000đ' },
                  { id: '#ORD-0011', customer: 'Trần Thị B', date: '24/03/2026', status: 'processing', total: '2.100.000đ' },
                  { id: '#ORD-0010', customer: 'Lê Văn C', date: '24/03/2026', status: 'completed', total: '5.200.000đ' },
                  { id: '#ORD-0009', customer: 'Phạm Thị D', date: '23/03/2026', status: 'completed', total: '1.800.000đ' },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {order.status === 'completed' ? 'Hoàn thành' : order.status === 'processing' ? 'Đang xử lý' : 'Chờ xác nhận'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{order.total}</td>
                  </tr>
                ))}
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
            {[
              { name: 'Nike Air Force 1', size: '42', left: 2 },
              { name: 'Adidas Samba', size: '40', left: 1 },
              { name: 'Jordan 1 Retro', size: '43', left: 0 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/30">
                <div className={`p-2 rounded-md ${item.left === 0 ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                  {item.left === 0 ? <AlertCircle className="h-5 w-5 text-red-500" /> : <Package className="h-5 w-5 text-amber-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Size: {item.size} • Còn lại: <span className={`font-semibold ${item.left === 0 ? 'text-red-500' : 'text-amber-500'}`}>{item.left}</span></p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors cursor-pointer">
            Xem toàn bộ kho
          </button>
        </div>
      </div>
    </div>
  )
}
