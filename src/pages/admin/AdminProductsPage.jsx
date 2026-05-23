import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, X, Upload, Check } from 'lucide-react'
import { useProducts } from '@/contexts/ProductsContext'
import { formatPrice, brands, categories, sizes as availableSizes } from '@/data/products'

const SAMPLE_IMAGES = [
  { label: 'Air Max Silver', path: '/products/sneaker-1.jpg' },
  { label: 'Ultraboost Black', path: '/products/sneaker-2.jpg' },
  { label: 'Jordan Red White', path: '/products/sneaker-3.jpg' },
  { label: 'New Balance White', path: '/products/sneaker-4.jpg' },
  { label: 'Chuck Taylor 70s', path: '/products/sneaker-5.jpg' },
  { label: 'Puma RS-X', path: '/products/sneaker-6.jpg' },
  { label: 'Nike Panda Dunk', path: '/products/sneaker-7.jpg' },
  { label: 'Yeezy Kem', path: '/products/sneaker-8.jpg' },
]

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  
  // States
  const [searchTerm, setSearchTerm] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Nike',
    category: 'lifestyle',
    price: '',
    originalPrice: '',
    image: '/products/sneaker-1.jpg',
    sizes: [39, 40, 41, 42],
    colors: 'Trắng, Đen'
  })

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesBrand = brandFilter === 'all' || product.brand.toLowerCase() === brandFilter.toLowerCase()

    return matchesSearch && matchesBrand
  })

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  // Open modal for add
  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      brand: 'Nike',
      category: 'lifestyle',
      price: '',
      originalPrice: '',
      image: '/products/sneaker-1.jpg',
      sizes: [39, 40, 41, 42],
      colors: 'Trắng, Đen'
    })
    setIsModalOpen(true)
  }

  // Open modal for edit
  const handleOpenEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : '',
      image: product.image,
      sizes: product.sizes,
      colors: product.colors ? product.colors.join(', ') : 'Trắng'
    })
    setIsModalOpen(true)
  }

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle Size Toggle
  const handleSizeToggle = (size) => {
    setFormData((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b)
      return { ...prev, sizes }
    })
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price) {
      alert("Vui lòng điền tên và giá bán!")
      return
    }

    const payload = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      image: formData.image,
      sizes: formData.sizes,
      colors: formData.colors.split(',').map((c) => c.trim()).filter(Boolean),
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, payload)
      alert("Sản phẩm đã được cập nhật thành công!")
    } else {
      addProduct(payload)
      alert("Sản phẩm mới đã được thêm thành công!")
    }

    setIsModalOpen(false)
    setCurrentPage(1)
  }

  // Handle Delete product
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      deleteProduct(id)
      alert("Sản phẩm đã được xóa!")
      setCurrentPage(1)
    }
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Quản Lý Sản Phẩm</h1>
          <p className="text-muted-foreground mt-1">Quản lý kho giày hàng và danh mục sản phẩm</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 w-fit cursor-pointer border-none"
        >
          <Plus className="h-4 w-4" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Search & Filter bar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
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
              value={brandFilter}
              onChange={(e) => {
                setBrandFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="h-10 px-3 rounded-md bg-secondary border border-border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="all">Tất cả thương hiệu</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
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
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => {
                  // deterministic sold / stock count based on product id
                  const idNum = parseInt(product.id) || 1
                  const sold = (idNum * 17 + 23) % 200 + 15
                  const stock = (idNum * 7 + 3) % 15 + 1

                  return (
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
                        {product.category === 'lifestyle' ? 'Lifestyle' : product.category === 'running' ? 'Chạy Bộ' : product.category === 'basketball' ? 'Bóng Rổ' : product.category}
                      </td>
                      <td className="px-6 py-4 font-medium text-muted-foreground uppercase">{product.brand}</td>
                      <td className="px-6 py-4 font-medium text-accent">{formatPrice(product.price)}</td>
                      <td className="px-6 py-4 font-medium text-right">{sold}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${stock < 5 ? 'bg-amber-500/10 text-amber-500' : 'bg-secondary text-foreground'}`}>
                          {stock} đôi
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <button 
                            onClick={() => handleOpenEdit(product)}
                            className="p-2 hover:text-accent hover:bg-secondary transition-colors cursor-pointer rounded-md border-none bg-transparent" 
                            title="Sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer rounded-md border-none bg-transparent" 
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-muted-foreground">
                    Không tìm thấy sản phẩm nào khớp với tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground flex-col sm:flex-row gap-4">
            <p>Hiển thị {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredProducts.length)} của {filteredProducts.length} sản phẩm</p>
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

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <>
          <div className="overlay z-50" onClick={() => setIsModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl p-6 z-50 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading">
                {editingProduct ? `Sửa Sản Phẩm: PRD-${editingProduct.id}` : 'Thêm Sản Phẩm Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-md cursor-pointer text-muted-foreground hover:text-foreground border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Tên giày</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Nike Air Max 90"
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Thương hiệu</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Danh mục</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Giá bán (VNĐ)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 3500000"
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Giá gốc (nếu giảm giá)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 4200000"
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider">Chọn ảnh sản phẩm mẫu</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {SAMPLE_IMAGES.map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: img.path }))}
                      className={`aspect-square rounded-md overflow-hidden bg-secondary border-2 transition-all relative cursor-pointer ${
                        formData.image === img.path ? 'border-primary' : 'border-transparent hover:border-primary/50'
                      }`}
                    >
                      <img src={img.path} alt={img.label} className="w-full h-full object-cover" />
                      {formData.image === img.path && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary bg-white rounded-full p-0.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Hoặc dán URL ảnh khác vào đây..."
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider">Màu sắc (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Đen, Trắng, Đỏ"
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider">Kích cỡ có sẵn (Sizes)</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map((size) => {
                    const isChecked = formData.sizes.includes(size)
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1.5 border text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                          isChecked 
                            ? 'bg-foreground text-background border-foreground font-bold' 
                            : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
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
                  {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
