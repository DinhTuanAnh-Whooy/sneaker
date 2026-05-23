import { useState, useEffect } from 'react'
import { Search, Eye, Edit, Trash2, UserPlus, Mail, Phone, ShoppingBag, Calendar, X } from 'lucide-react'

const initialMockUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0912345678', orders: 12, spent: '24.5tr', joined: '15/01/2026', status: 'active' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0987654321', orders: 8, spent: '18.2tr', joined: '20/01/2026', status: 'active' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0901112233', orders: 5, spent: '11.8tr', joined: '02/02/2026', status: 'active' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0933445566', orders: 3, spent: '5.4tr', joined: '10/02/2026', status: 'inactive' },
  { id: 5, name: 'Bùi Văn E', email: 'buivane@gmail.com', phone: '0909887766', orders: 15, spent: '42.1tr', joined: '05/12/2025', status: 'active' },
  { id: 6, name: 'Hoàng Thị F', email: 'hoangthif@gmail.com', phone: '0911223344', orders: 1, spent: '2.8tr', joined: '01/03/2026', status: 'active' },
  { id: 7, name: 'Đỗ Văn G', email: 'dovang@gmail.com', phone: '0922334455', orders: 0, spent: '0đ', joined: '15/03/2026', status: 'inactive' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  // Modals States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    orders: '0',
    spent: '0đ'
  })

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sneaker-users')
    if (stored) {
      setUsers(JSON.parse(stored))
    } else {
      setUsers(initialMockUsers)
      localStorage.setItem('sneaker-users', JSON.stringify(initialMockUsers))
    }
  }, [])

  // Save to localStorage helper
  const saveUsers = (newUsersList) => {
    setUsers(newUsersList)
    localStorage.setItem('sneaker-users', JSON.stringify(newUsersList))
  }

  // Filter users
  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    const match = u.name.toLowerCase().includes(q) || u.email.includes(q) || u.phone.includes(search)
    return match && (filter === 'all' || u.status === filter)
  })

  // Open modal for add
  const handleOpenAdd = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'active',
      orders: '0',
      spent: '0đ'
    })
    setIsModalOpen(true)
  }

  // Open modal for edit
  const handleOpenEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      orders: String(user.orders),
      spent: user.spent
    })
    setIsModalOpen(true)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Vui lòng điền đầy đủ Tên, Email và Số điện thoại!")
      return
    }

    if (editingUser) {
      const updated = users.map(u => 
        u.id === editingUser.id 
          ? {
              ...u,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              status: formData.status,
              orders: Number(formData.orders),
              spent: formData.spent
            }
          : u
      )
      saveUsers(updated)
      alert("Cập nhật thông tin khách hàng thành công!")
    } else {
      const today = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const newId = users.reduce((maxId, u) => Math.max(maxId, u.id), 0) + 1
      const newUser = {
        id: newId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        orders: Number(formData.orders) || 0,
        spent: formData.spent || '0đ',
        joined: today
      }
      saveUsers([newUser, ...users])
      alert("Thêm khách hàng mới thành công!")
    }

    setIsModalOpen(false)
  }

  // Handle Delete User
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản khách hàng "${name}"?`)) {
      const updated = users.filter(u => u.id !== id)
      saveUsers(updated)
      alert("Đã xóa khách hàng!")
    }
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Khách Hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý thông tin khách hàng đã đăng ký</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 w-fit cursor-pointer border-none"
        >
          <UserPlus className="h-4 w-4" /> Thêm khách hàng
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Tổng khách hàng', val: users.length, color: '' },
          { label: 'Đang hoạt động', val: users.filter(u => u.status === 'active').length, color: 'text-green-500' },
          { label: 'Không hoạt động', val: users.filter(u => u.status === 'inactive').length, color: 'text-amber-500' },
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
            <input 
              type="text" 
              placeholder="Tìm tên, email, SĐT..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 px-3 rounded-md bg-secondary border border-border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          >
            <option value="all">Tất cả trạng thái</option>
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
              {filtered.length > 0 ? (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent text-sm shrink-0">
                          {u.name?.[0] || 'U'}
                        </div>
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
                        <button 
                          onClick={() => handleOpenEdit(u)}
                          className="p-2 hover:text-accent hover:bg-secondary rounded-md cursor-pointer border-none bg-transparent" 
                          title="Sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(u.id, u.name)}
                          className="p-2 hover:text-destructive hover:bg-destructive/10 rounded-md cursor-pointer border-none bg-transparent" 
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-muted-foreground">
                    Không tìm thấy khách hàng nào khớp với tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <p>Hiển thị {filtered.length} / {users.length} khách hàng</p>
        </div>
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <>
          <div className="overlay z-50" onClick={() => setIsModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl p-6 z-50 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading">
                {editingUser ? `Sửa Khách Hàng: USR-${String(editingUser.id).padStart(4, '0')}` : 'Thêm Khách Hàng Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-md cursor-pointer text-muted-foreground hover:text-foreground border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Địa chỉ Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: nguyenvana@gmail.com"
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 0912345678"
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Số đơn hàng</label>
                  <input
                    type="number"
                    name="orders"
                    value={formData.orders}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Chi tiêu</label>
                  <input
                    type="text"
                    name="spent"
                    value={formData.spent}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 12.5tr"
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Hoạt động (Active)</option>
                  <option value="inactive">Không hoạt động (Inactive)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-11 border border-border rounded-md font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer bg-transparent"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors cursor-pointer border-none"
                >
                  {editingUser ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
