import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Truck, Shield, Award, Heart, ArrowRight, Users, Target, Zap } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const stats = [
  { value: "50K+", label: "Khách hàng" },
  { value: "100%", label: "Chính hãng" },
  { value: "1500+", label: "Sản phẩm" },
  { value: "30+", label: "Thương hiệu" },
]

const features = [
  { Icon: Shield, title: "100% Chính Hãng", desc: "Tất cả sản phẩm đều được nhập khẩu trực tiếp từ hãng" },
  { Icon: Truck, title: "Giao Hàng Nhanh", desc: "Giao hàng trong 24h tại TP.HCM và 2-3 ngày toàn quốc" },
  { Icon: Award, title: "Chất Lượng Cao", desc: "Sản phẩm trải qua kiểm tra chất lượng nghiêm ngặt" },
  { Icon: Heart, title: "Dịch Vụ Tận Tâm", desc: "Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng giúp đỡ bạn" },
]

const teamValues = [
  { Icon: Target, title: "Sứ Mệnh", desc: "Mang đến những đôi sneaker chính hãng với giá tốt nhất cho giới trẻ Việt Nam." },
  { Icon: Users, title: "Đội Ngũ", desc: "Đội ngũ trẻ trung, năng động, đam mê sneaker và thời trang đường phố." },
  { Icon: Zap, title: "Tầm Nhìn", desc: "Trở thành nền tảng sneaker hàng đầu, kết nối cộng đồng sneakerhead Việt." },
]

const stores = [
  { name: "SNEAKER Quận 1", address: "123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM", phone: "028 1234 5678", hours: "9:00 - 21:30" },
  { name: "SNEAKER Quận 3", address: "456 Võ Văn Tần, P.5, Q.3, TP.HCM", phone: "028 9876 5432", hours: "9:00 - 21:00" },
  { name: "SNEAKER Hà Nội", address: "789 Hoàng Diệu, Ba Đình, Hà Nội", phone: "024 1234 5678", hours: "9:30 - 21:00" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Câu chuyện của chúng tôi</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-2 font-heading">Về SNEAKER</h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              SNEAKER được thành lập với mục tiêu mang đến những đôi sneaker chính hãng từ các thương hiệu hàng đầu thế giới,
              giúp giới trẻ Việt Nam tự tin thể hiện phong cách riêng.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent font-heading">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Câu chuyện</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 font-heading">TỪ ĐAM MÊ ĐẾN THƯƠNG HIỆU</h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>SNEAKER bắt đầu từ niềm đam mê sneaker của một nhóm bạn trẻ Việt Nam. Từ những buổi tụ họp chia sẻ về giày, chúng tôi nhận ra nhu cầu sở hữu sneaker chính hãng với giá hợp lý là rất lớn.</p>
                <p>Năm 2020, SNEAKER chính thức ra đời với cam kết mang đến 100% sản phẩm chính hãng, dịch vụ tận tâm, và trải nghiệm mua sắm hiện đại cho cộng đồng sneakerhead Việt Nam.</p>
                <p>Sau hơn 5 năm phát triển, SNEAKER tự hào được đồng hành cùng hơn 50,000 khách hàng với 3 cửa hàng tại TP.HCM và Hà Nội.</p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img src="/hero-sneaker.jpg" alt="SNEAKER Story" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Giá trị cốt lõi</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 font-heading">CHÚNG TÔI TIN VÀO</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamValues.map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <v.Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-heading">{v.title}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Tại sao chọn chúng tôi</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 font-heading">DỊCH VỤ VƯỢT TRỘI</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-border hover:border-accent/50 transition-colors">
                <f.Icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Hệ thống cửa hàng</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 font-heading">GHÉT THĂM CHÚNG TÔI</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div key={store.name} className="p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold mb-4 font-heading">{store.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm"><MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" /><span className="text-muted-foreground">{store.address}</span></div>
                  <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-accent shrink-0" /><span className="text-muted-foreground">{store.phone}</span></div>
                  <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-accent shrink-0" /><span className="text-muted-foreground">{store.hours}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">CÒN CÂU HỎI?</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            Liên hệ với chúng tôi qua email hoặc ghé thăm cửa hàng gần nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="mailto:hello@sneaker.vn">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium flex items-center gap-2 cursor-pointer">
                <Mail className="h-4 w-4" /> Gửi Email
              </button>
            </a>
            <Link to="/san-pham">
              <button className="group px-8 py-3 border border-border rounded-md font-medium hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer">
                Xem Sản Phẩm <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
