import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const DEMO_EMAIL = "demo@sneaker.vn"
  const DEMO_PASSWORD = "Demo@123"

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError("Vui lòng nhập đầy đủ thông tin"); return }
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        login({ name: "Nguyễn Văn Demo", email: DEMO_EMAIL, phone: "0912345678", avatar: null, role: 'user' })
        navigate("/tai-khoan")
      } else if (email === "admin@sneaker.vn" && password === "Admin@123") {
        login({ name: "Admin SNEAKER", email, phone: "0912345678", avatar: null, role: 'admin' })
        navigate("/admin")
      } else {
        login({ name: "Người dùng SNEAKER", email, phone: "0912345678", avatar: null, role: 'user' })
        navigate("/tai-khoan")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-heading">Đăng Nhập</h1>
              <p className="text-muted-foreground mt-2">Chào mừng bạn quay trở lại SNEAKER</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-12 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="/quen-mat-khau" className="text-sm text-accent hover:underline">Quên mật khẩu?</Link>
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang đăng nhập...</> : "Đăng Nhập"}
              </button>
            </form>

            <div className="relative my-8">
              <hr className="border-border" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">Hoặc</span>
            </div>

            <div className="space-y-3">
              <button className="w-full h-11 border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm font-medium cursor-pointer">
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Đăng nhập với Google
              </button>
              <button className="w-full h-11 border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm font-medium cursor-pointer">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854V15.56H7.078v-3.487h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.927-1.956 1.874v2.25h3.328l-.532 3.487h-2.796v8.367C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Đăng nhập với Facebook
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Chưa có tài khoản? <Link to="/dang-ky" className="text-accent font-medium hover:underline">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
