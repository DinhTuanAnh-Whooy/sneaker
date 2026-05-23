import { useState, useEffect } from 'react'
import { Store, Bell, Shield, Palette, Save, Check } from 'lucide-react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  
  // Settings States
  const [storeName, setStoreName] = useState('SNEAKER')
  const [storeEmail, setStoreEmail] = useState('hello@sneaker.vn')
  const [storePhone, setStorePhone] = useState('028 1234 5678')
  const [currency, setCurrency] = useState('VND')
  const [freeShipMin, setFreeShipMin] = useState('1000000')
  const [notifyOrder, setNotifyOrder] = useState(true)
  const [notifyStock, setNotifyStock] = useState(true)
  const [notifyUser, setNotifyUser] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [theme, setTheme] = useState('dark')

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Load settings on mount
  useEffect(() => {
    const stored = localStorage.getItem('sneaker-settings')
    if (stored) {
      const config = JSON.parse(stored)
      setStoreName(config.storeName ?? 'SNEAKER')
      setStoreEmail(config.storeEmail ?? 'hello@sneaker.vn')
      setStorePhone(config.storePhone ?? '028 1234 5678')
      setCurrency(config.currency ?? 'VND')
      setFreeShipMin(config.freeShipMin ?? '1000000')
      setNotifyOrder(config.notifyOrder ?? true)
      setNotifyStock(config.notifyStock ?? true)
      setNotifyUser(config.notifyUser ?? false)
      setMaintenanceMode(config.maintenanceMode ?? false)
      setTheme(config.theme ?? 'dark')

      // Apply theme to document
      applyTheme(config.theme ?? 'dark')
    }
  }, [])

  // Theme application helper
  const applyTheme = (themeName) => {
    document.documentElement.classList.remove('light', 'dark', 'navy')
    if (themeName !== 'dark') {
      document.documentElement.classList.add(themeName)
    }
  }

  // Handle immediate theme selection
  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme)
    applyTheme(selectedTheme)
  }

  // Save changes to localStorage
  const handleSave = () => {
    const config = {
      storeName,
      storeEmail,
      storePhone,
      currency,
      freeShipMin,
      notifyOrder,
      notifyStock,
      notifyUser,
      maintenanceMode,
      theme
    }

    localStorage.setItem('sneaker-settings', JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    if (!currentPassword || !newPassword) {
      alert("Vui lòng nhập mật khẩu hiện tại và mật khẩu mới!")
      return
    }
    alert("Đổi mật khẩu quản trị viên thành công! (Mô phỏng)")
    setCurrentPassword('')
    setNewPassword('')
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up text-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Cài Đặt</h1>
          <p className="text-muted-foreground mt-1">Quản lý cài đặt hệ thống cửa hàng</p>
        </div>
        <button onClick={handleSave}
          className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer border-none">
          {saved ? <><Check className="h-4 w-4" /> Đã lưu!</> : <><Save className="h-4 w-4" /> Lưu thay đổi</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Store Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold font-heading mb-6 flex items-center gap-2"><Store className="h-5 w-5 text-accent" /> Thông Tin Cửa Hàng</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Tên cửa hàng</label>
              <input value={storeName} onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email liên hệ</label>
              <input value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Số điện thoại</label>
              <input value={storePhone} onChange={(e) => setStorePhone(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Đơn vị tiền tệ</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="VND">VND - Việt Nam Đồng</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1.5">Miễn phí vận chuyển từ (VNĐ)</label>
              <input type="number" value={freeShipMin} onChange={(e) => setFreeShipMin(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <p className="text-xs text-muted-foreground mt-1">Đơn hàng từ giá trị này trở lên sẽ được miễn phí vận chuyển</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold font-heading mb-6 flex items-center gap-2"><Bell className="h-5 w-5 text-accent" /> Thông Báo</h2>
          <div className="space-y-4">
            {[
              { label: 'Thông báo đơn hàng mới', desc: 'Nhận email khi có đơn hàng mới', val: notifyOrder, set: setNotifyOrder },
              { label: 'Cảnh báo hết hàng', desc: 'Nhận thông báo khi sản phẩm sắp hết', val: notifyStock, set: setNotifyStock },
              { label: 'Đăng ký mới', desc: 'Nhận thông báo khi có khách hàng đăng ký', val: notifyUser, set: setNotifyUser },
            ].map((n) => (
              <label key={n.label} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium text-sm">{n.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
                <div className="relative">
                  <input type="checkbox" checked={n.val} onChange={(e) => n.set(e.target.checked)} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition-colors ${n.val ? 'bg-accent' : 'bg-border'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${n.val ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold font-heading mb-6 flex items-center gap-2"><Shield className="h-5 w-5 text-accent" /> Bảo Mật & Hệ Thống</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
              <div>
                <p className="font-medium text-sm">Chế độ bảo trì</p>
                <p className="text-xs text-muted-foreground mt-0.5">Khi bật, trang web sẽ hiển thị thông báo bảo trì cho khách hàng ngoài trang chủ</p>
              </div>
              <div className="relative">
                <input type="checkbox" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} className="sr-only" />
                <div className={`w-11 h-6 rounded-full transition-colors ${maintenanceMode ? 'bg-destructive' : 'bg-border'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${maintenanceMode ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                </div>
              </div>
            </label>

            <form onSubmit={handlePasswordUpdate} className="p-4 rounded-lg bg-secondary/30">
              <p className="font-medium text-sm mb-3">Đổi mật khẩu Admin</p>
              <div className="space-y-3 max-w-md">
                <input 
                  type="password" 
                  placeholder="Mật khẩu hiện tại" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                />
                <input 
                  type="password" 
                  placeholder="Mật khẩu mới" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                />
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium cursor-pointer border-none hover:bg-primary/90 transition-colors">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold font-heading mb-6 flex items-center gap-2"><Palette className="h-5 w-5 text-accent" /> Giao Diện</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'dark', name: 'Tối (Mặc định)', bg: 'bg-[#141414]', fg: 'border-accent' },
              { id: 'light', name: 'Sáng', bg: 'bg-white', fg: 'border-accent' },
              { id: 'navy', name: 'Xanh Navy', bg: 'bg-[#1a2b4c]', fg: 'border-accent' },
            ].map(t => (
              <button 
                key={t.id} 
                type="button"
                onClick={() => handleThemeSelect(t.id)}
                className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  theme === t.id ? 'border-primary bg-secondary/20 shadow-md scale-[1.02]' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-full h-16 rounded-lg ${t.bg} mb-3 border border-border`} />
                <p className="text-sm font-medium">{t.name}</p>
                {theme === t.id && <p className="text-xs text-accent mt-1">Đang chọn</p>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
