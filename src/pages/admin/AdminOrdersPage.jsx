import { useState } from 'react'
import { Search, Filter, Eye, X, MapPin, CreditCard, Clock, Calendar, CheckCircle, Package } from 'lucide-react'
import { useOrders } from '@/contexts/OrdersContext'
import { formatPrice } from '@/data/products'

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Status mapping
  const statusConfig = {
    pending: { label: "Chờ xác nhận", class: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    processing: { label: "Đang xử lý", class: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    shipping: { label: "Đang giao hàng", class: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    delivered: { label: "Đã giao hàng", class: "bg-green-500/10 text-green-500 border-green-500/20" },
    cancelled: { label: "Đã hủy", class: "bg-red-500/10 text-red-500 border-red-500/20" },
  }

  // Filter and Search orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.phone.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Quản Lý Đơn Hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý và cập nhật trạng thái đơn hàng của khách hàng</p>
        </div>
        <button 
          onClick={() => {
            alert("Báo cáo đơn hàng đã được xuất thành công! (Mô phỏng)")
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors w-fit cursor-pointer"
        >
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm mã đơn, tên khách hàng, SĐT..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="h-10 px-3 rounded-md bg-secondary border border-border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipping">Đang giao hàng</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
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
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => {
                  const statusConf = statusConfig[order.status] || { label: order.status, class: "bg-secondary" }
                  return (
                    <tr key={order.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-accent">#{order.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{order.shippingAddress?.name || 'Ẩn danh'}</p>
                        <p className="text-xs text-muted-foreground">{order.shippingAddress?.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{formatDate(order.date)}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {order.paymentMethod === 'COD' ? 'COD' : 'Chuyển khoản'}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          className={`text-xs font-semibold rounded-full px-3 py-1.5 cursor-pointer outline-none border border-transparent transition-colors
                            ${statusConf.class}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="pending" className="bg-background text-foreground">Chờ xác nhận</option>
                          <option value="processing" className="bg-background text-foreground">Đang xử lý</option>
                          <option value="shipping" className="bg-background text-foreground">Đang giao hàng</option>
                          <option value="delivered" className="bg-background text-foreground">Đã giao hàng</option>
                          <option value="cancelled" className="bg-background text-foreground">Đã hủy</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 font-medium text-accent">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer rounded-md hover:bg-secondary" 
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-muted-foreground">
                    Không tìm thấy đơn hàng nào khớp với tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground flex-col sm:flex-row gap-4">
            <p>Hiển thị {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredOrders.length)} của {filteredOrders.length} đơn hàng</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-50 cursor-pointer"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${
                    currentPage === idx + 1 
                      ? "bg-primary text-primary-foreground font-semibold" 
                      : "border border-border hover:bg-secondary"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-50 cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal Overlay */}
      {selectedOrder && (
        <>
          <div className="overlay z-50" onClick={() => setSelectedOrder(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-2xl p-6 z-50 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading">Chi Tiết Đơn Hàng #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary rounded-md cursor-pointer text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Meta */}
              <div className="flex items-center gap-4 flex-wrap justify-between p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Ngày đặt: <strong className="text-foreground">{formatDate(selectedOrder.date)}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Trạng thái: </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[selectedOrder.status]?.class || 'bg-secondary'}`}>
                    {statusConfig[selectedOrder.status]?.label || selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Items Ordered */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Package className="h-4 w-4 text-accent" /> Sản phẩm đã mua</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden shrink-0">
                        <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.product?.name}</p>
                        <p className="text-xs text-muted-foreground uppercase">{item.product?.brand} · Size: {item.size} · SL: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm text-accent">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Địa chỉ giao hàng</h4>
                  <p className="text-sm font-semibold">{selectedOrder.shippingAddress?.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedOrder.shippingAddress?.phone}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{selectedOrder.shippingAddress?.address}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><CreditCard className="h-4 w-4 text-accent" /> Phương thức thanh toán</h4>
                    <p className="text-sm font-semibold">{selectedOrder.paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' : 'Thanh toán COD (Tiền mặt)'}</p>
                  </div>
                  <div className="mt-4 p-2 rounded bg-accent/10 border border-accent/20 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-[11px] text-accent font-medium">Bảo mật thanh toán an toàn</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-secondary/30 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Tạm tính</span><span>{formatPrice(selectedOrder.subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Phí vận chuyển</span><span>{selectedOrder.shipping === 0 ? <strong className="text-green-500">Miễn phí</strong> : formatPrice(selectedOrder.shipping)}</span></div>
                {selectedOrder.discount > 0 && <div className="flex justify-between text-green-500"><span>Giảm giá</span><span>-{formatPrice(selectedOrder.discount)}</span></div>}
                <hr className="border-border" />
                <div className="flex justify-between font-bold text-base"><span>Tổng cộng</span><span className="text-accent">{formatPrice(selectedOrder.total)}</span></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
