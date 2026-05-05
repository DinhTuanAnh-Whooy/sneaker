import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Loader2, Check, KeyRound, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const STEPS = {
  EMAIL: 'email',
  OTP: 'otp',
  RESET: 'reset',
  SUCCESS: 'success',
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(STEPS.EMAIL)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)

  // Start countdown timer for resend OTP
  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  // Step 1: Submit email
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email) { setError("Vui lòng nhập email"); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Email không hợp lệ"); return }
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      setStep(STEPS.OTP)
      startCountdown()
    }, 1500)
  }

  // Step 2: Verify OTP
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length !== 6) { setError("Vui lòng nhập đủ mã OTP"); return }
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      setStep(STEPS.RESET)
    }, 1500)
  }

  const handleResendOtp = () => {
    if (countdown > 0) return
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      setOtp(["", "", "", "", "", ""])
      startCountdown()
    }, 1000)
  }

  // Step 3: Reset password
  const handleResetSubmit = (e) => {
    e.preventDefault()
    if (!newPassword) { setError("Vui lòng nhập mật khẩu mới"); return }
    if (newPassword.length < 8) { setError("Mật khẩu phải có ít nhất 8 ký tự"); return }
    if (newPassword !== confirmPassword) { setError("Mật khẩu xác nhận không khớp"); return }
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      setStep(STEPS.SUCCESS)
    }, 1500)
  }

  // Progress indicator
  const stepNumber = step === STEPS.EMAIL ? 1 : step === STEPS.OTP ? 2 : step === STEPS.RESET ? 3 : 4

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto animate-fade-in-up">

            {/* Back to login */}
            {step !== STEPS.SUCCESS && (
              <Link to="/dang-nhap" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" /> Quay lại đăng nhập
              </Link>
            )}

            {/* Step Progress */}
            {step !== STEPS.SUCCESS && (
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      s < stepNumber ? 'bg-green-500 text-white' :
                      s === stepNumber ? 'bg-accent text-accent-foreground' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      {s < stepNumber ? <Check className="h-4 w-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-0.5 transition-colors ${s < stepNumber ? 'bg-green-500' : 'bg-border'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ===== STEP 1: Email ===== */}
            {step === STEPS.EMAIL && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-accent" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold font-heading">Quên Mật Khẩu</h1>
                  <p className="text-muted-foreground mt-2">Nhập email đã đăng ký để nhận mã xác minh</p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Địa chỉ email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        className="w-full h-11 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                    {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang gửi...</> : "Gửi Mã Xác Minh"}
                  </button>
                </form>
              </div>
            )}

            {/* ===== STEP 2: OTP Verification ===== */}
            {step === STEPS.OTP && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="h-8 w-8 text-accent" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold font-heading">Nhập Mã OTP</h1>
                  <p className="text-muted-foreground mt-2">
                    Chúng tôi đã gửi mã 6 chữ số đến<br />
                    <span className="text-accent font-medium">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
                  )}

                  {/* OTP Inputs */}
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 text-center text-xl font-bold rounded-lg bg-card border-2 border-border text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    ))}
                  </div>

                  <button type="submit" disabled={isLoading || otp.join("").length !== 6}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                    {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang xác minh...</> : "Xác Minh"}
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Không nhận được mã?{' '}
                      {countdown > 0 ? (
                        <span className="text-accent">Gửi lại sau {countdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                          className="text-accent font-medium hover:underline cursor-pointer disabled:opacity-50"
                        >
                          Gửi lại mã
                        </button>
                      )}
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ===== STEP 3: New Password ===== */}
            {step === STEPS.RESET && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-accent" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold font-heading">Đặt Mật Khẩu Mới</h1>
                  <p className="text-muted-foreground mt-2">Tạo mật khẩu mới cho tài khoản của bạn</p>
                </div>

                <form onSubmit={handleResetSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoFocus
                        className="w-full h-11 pl-10 pr-12 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {/* Password strength hints */}
                    {newPassword && (
                      <div className="mt-3 space-y-1.5">
                        {[
                          { label: "Ít nhất 8 ký tự", pass: newPassword.length >= 8 },
                          { label: "Có chữ hoa", pass: /[A-Z]/.test(newPassword) },
                          { label: "Có chữ số", pass: /[0-9]/.test(newPassword) },
                          { label: "Có ký tự đặc biệt", pass: /[!@#$%^&*]/.test(newPassword) },
                        ].map((rule) => (
                          <div key={rule.label} className="flex items-center gap-2 text-xs">
                            <Check className={`h-3 w-3 ${rule.pass ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <span className={rule.pass ? 'text-green-500' : 'text-muted-foreground'}>{rule.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-destructive mt-1">Mật khẩu không khớp</p>
                    )}
                  </div>

                  <button type="submit" disabled={isLoading}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                    {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang cập nhật...</> : "Đặt Lại Mật Khẩu"}
                  </button>
                </form>
              </div>
            )}

            {/* ===== STEP 4: Success ===== */}
            {step === STEPS.SUCCESS && (
              <div className="text-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-10 w-10 text-green-500" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Đặt Lại Thành Công!</h1>
                <p className="text-muted-foreground mb-8">
                  Mật khẩu của bạn đã được cập nhật thành công.<br />
                  Hãy đăng nhập bằng mật khẩu mới.
                </p>
                <Link to="/dang-nhap">
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer">
                    Đăng Nhập Ngay
                  </button>
                </Link>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
