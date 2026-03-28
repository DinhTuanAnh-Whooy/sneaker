import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, Check, X } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'

const passwordChecks = [
  { label: "Ít nhất 8 ký tự", test: (p) => p.length >= 8 },
  { label: "Có chữ hoa", test: (p) => /[A-Z]/.test(p) },
  { label: "Có chữ số", test: (p) => /[0-9]/.test(p) },
  { label: "Có ký tự đặc biệt", test: (p) => /[!@#$%^&*]/.test(p) },
]

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const passedChecks = passwordChecks.filter((c) => c.test(password)).length
  const strengthPercent = (passedChecks / passwordChecks.length) * 100
  const strengthColor = strengthPercent <= 25 ? "bg-red-500" : strengthPercent <= 50 ? "bg-orange-500" : strengthPercent <= 75 ? "bg-yellow-500" : "bg-green-500"

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) { setError("Vui lòng nhập đầy đủ thông tin"); return }
    if (password !== confirmPassword) { setError("Mật khẩu xác nhận không khớp"); return }
    if (passedChecks < 3) { setError("Mật khẩu chưa đủ mạnh"); return }
    if (!agreedToTerms) { setError("Vui lòng đồng ý với điều khoản dịch vụ"); return }
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      login({ name, email, phone, avatar: null })
      setIsLoading(false)
      navigate("/tai-khoan")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-heading">Tạo Tài Khoản</h1>
              <p className="text-muted-foreground mt-2">Đăng ký để nhận ưu đãi độc quyền</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

              <div>
                <label className="block text-sm font-medium mb-2">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="tel" placeholder="0912345678" value={phone} onChange={(e) => setPhone(e.target.value)}
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
                {password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1"><div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden"><div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${strengthPercent}%` }} /></div></div>
                    <div className="grid grid-cols-2 gap-1">
                      {passwordChecks.map((check) => (
                        <div key={check.label} className="flex items-center gap-1.5 text-xs">
                          {check.test(password) ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                          <span className={check.test(password) ? "text-green-500" : "text-muted-foreground"}>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                {confirmPassword && password !== confirmPassword && <p className="text-xs text-destructive mt-1">Mật khẩu không khớp</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded accent-accent" />
                <span className="text-sm text-muted-foreground">Tôi đồng ý với <span className="text-accent">Điều khoản dịch vụ</span> và <span className="text-accent">Chính sách bảo mật</span></span>
              </label>

              <button type="submit" disabled={isLoading}
                className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang tạo tài khoản...</> : "Tạo Tài Khoản"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Đã có tài khoản? <Link to="/dang-nhap" className="text-accent font-medium hover:underline">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
