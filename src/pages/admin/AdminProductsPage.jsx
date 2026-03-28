import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { products, formatPrice } from '@/data/products'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Sản Phẩm</h1>
          <p className="text-muted-foreground mt-1">Quản lý kho hàng và danh mục sản phẩm</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 w-fit cursor-pointer">
          <Plus className="h-4 w-4" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors cursor-pointer whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Lọc theo thương hiệu
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs text-muted-foreground bg-secondary/30">
              <tr>
                <th className="px-6 py-4 font-medium">Sản phẩm</th>
                <th className="px-6 py-4 font-medium">Danh mục</th>
                <th className="px-6 py-4 font-medium">Thương hiệu</th>
                <th className="px-6 py-4 font-medium">Giá bán</th>
                <th className="px-6 py-4 font-medium text-right">Đã bán</th>
                <th className="px-6 py-4 font-medium text-right">Tồn kho</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.slice(0, 8).map((product) => (
                <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden shrink-0 hidden sm:block">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground max-w-[200px] truncate" title={product.name}>{product.name}</p>
                        <p className="text-xs text-muted-foreground">ID: PRD-{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.category === 'men' ? 'Nam' : product.category === 'women' ? 'Nữ' : 'Trẻ em'}
                  </td>
                  <td className="px-6 py-4 font-medium text-muted-foreground uppercase">{product.brand}</td>
                  <td className="px-6 py-4 font-medium text-accent">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 font-medium text-right">124</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-foreground`}>
                      {Math.floor(Math.random() * 50) + 5}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-muted-foreground">
                      <button className="p-2 hover:text-accent hover:bg-secondary transition-colors cursor-pointer rounded-md" title="Sửa">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer rounded-md" title="Xóa">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <p>Hiển thị {products.slice(0, 8).length} của {products.length} sản phẩm</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md">1</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary">2</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary">Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}
