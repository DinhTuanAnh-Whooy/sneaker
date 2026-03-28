import { useState } from 'react'
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'

const mockOrders = [
  { id: '#ORD-0012', customer: 'Nguyễn Văn A', phone: '0912345678', date: '25/03/2026', status: 'pending', total: '3.500.000đ', payment: 'Chuyển khoản' },
  { id: '#ORD-0011', customer: 'Trần Thị B', phone: '0987654321', date: '24/03/2026', status: 'processing', total: '2.100.000đ', payment: 'COD' },
  { id: '#ORD-0010', customer: 'Lê Văn C', phone: '0901112233', date: '24/03/2026', status: 'completed', total: '5.200.000đ', payment: 'Chuyển khoản' },
  { id: '#ORD-0009', customer: 'Phạm Thị D', phone: '0933445566', date: '23/03/2026', status: 'completed', total: '1.800.000đ', payment: 'COD' },
  { id: '#ORD-0008', customer: 'Bùi Văn E', phone: '0909887766', date: '22/03/2026', status: 'cancelled', total: '4.500.000đ', payment: 'Chuyển khoản' },
]

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Quản Lý Đơn Hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý và cập nhật trạng thái đơn hàng của khách hàng</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors w-fit cursor-pointer">
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm mã đơn, tên khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors cursor-pointer whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Lọc trạng thái
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs text-muted-foreground bg-secondary/30">
              <tr>
                <th className="px-6 py-4 font-medium">Mã đơn</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Ngày đặt</th>
                <th className="px-6 py-4 font-medium">Thanh toán</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium">Tổng tiền</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-accent">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.payment}</td>
                  <td className="px-6 py-4">
                    <select 
                      className={`text-xs font-medium rounded-full px-2.5 py-1 appearance-none cursor-pointer outline-none border-none
                        ${order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                        order.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                        'bg-amber-500/10 text-amber-500'}`}
                      defaultValue={order.status}
                    >
                      <option value="pending">Chờ xác nhận</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer rounded-md hover:bg-secondary" title="Xem chi tiết">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer rounded-md hover:bg-secondary" title="Sửa">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <p>Hiển thị 1 - 5 của 124 đơn hàng</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md">1</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary">2</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary">3</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary">Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}
