import { useState } from 'react'
import { Search, Eye, Edit, Trash2, UserPlus, Mail, Phone, ShoppingBag, Calendar } from 'lucide-react'

const mockUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0912345678', orders: 12, spent: '24.5tr', joined: '15/01/2026', status: 'active' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0987654321', orders: 8, spent: '18.2tr', joined: '20/01/2026', status: 'active' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0901112233', orders: 5, spent: '11.8tr', joined: '02/02/2026', status: 'active' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0933445566', orders: 3, spent: '5.4tr', joined: '10/02/2026', status: 'inactive' },
  { id: 5, name: 'Bùi Văn E', email: 'buivane@gmail.com', phone: '0909887766', orders: 15, spent: '42.1tr', joined: '05/12/2025', status: 'active' },
  { id: 6, name: 'Hoàng Thị F', email: 'hoangthif@gmail.com', phone: '0911223344', orders: 1, spent: '2.8tr', joined: '01/03/2026', status: 'active' },
  { id: 7, name: 'Đỗ Văn G', email: 'dovang@gmail.com', phone: '0922334455', orders: 0, spent: '0đ', joined: '15/03/2026', status: 'inactive' },
]

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = mockUsers.filter((u) => {
    const q = search.toLowerCase()
    const match = u.name.toLowerCase().includes(q) || u.email.includes(q) || u.phone.includes(search)
    return match && (filter === 'all' || u.status === filter)
  })

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Khách Hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý thông tin khách hàng đã đăng ký</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 w-fit cursor-pointer">
          <UserPlus className="h-4 w-4" /> Thêm khách hàng
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Tổng khách hàng', val: mockUsers.length, color: '' },
          { label: 'Đang hoạt động', val: mockUsers.filter(u => u.status === 'active').length, color: 'text-green-500' },
          { label: 'Không hoạt động', val: mockUsers.filter(u => u.status === 'inactive').length, color: 'text-amber-500' },
        ].map(s => (
          <div key={s.label} className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold font-heading mt-1 ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Tìm tên, email, SĐT..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="h-10 px-3 rounded-md bg-secondary border border-border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs text-muted-foreground bg-secondary/30">
              <tr>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Liên hệ</th>
                <th className="px-6 py-4 font-medium">Ngày tham gia</th>
                <th className="px-6 py-4 font-medium text-right">Đơn hàng</th>
                <th className="px-6 py-4 font-medium text-right">Chi tiêu</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent text-sm shrink-0">{u.name[0]}</div>
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-muted-foreground">USR-{String(u.id).padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-1.5 text-muted-foreground text-xs"><Mail className="h-3 w-3" />{u.email}</p>
                    <p className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1"><Phone className="h-3 w-3" />{u.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground"><Calendar className="h-3 w-3 inline mr-1" />{u.joined}</td>
                  <td className="px-6 py-4 text-right"><ShoppingBag className="h-3 w-3 inline mr-1 text-muted-foreground" />{u.orders}</td>
                  <td className="px-6 py-4 font-medium text-right text-accent">{u.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${u.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {u.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-muted-foreground">
                      <button className="p-2 hover:text-primary hover:bg-secondary rounded-md cursor-pointer" title="Xem"><Eye className="h-4 w-4" /></button>
                      <button className="p-2 hover:text-accent hover:bg-secondary rounded-md cursor-pointer" title="Sửa"><Edit className="h-4 w-4" /></button>
                      <button className="p-2 hover:text-destructive hover:bg-destructive/10 rounded-md cursor-pointer" title="Xóa"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <p>Hiển thị {filtered.length} / {mockUsers.length} khách hàng</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md">1</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary">Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}
