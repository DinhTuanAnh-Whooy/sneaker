import { useState, useMemo } from 'react'
import { Search, Grid3x3, LayoutGrid } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products, brands, categories, sizes as allSizes } from '@/data/products'

export default function ProductsPage() {
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [sortBy, setSortBy] = useState("newest")
  const [gridCols, setGridCols] = useState(4)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false
      if (selectedSizes.length > 0 && !selectedSizes.some((size) => product.sizes.includes(size))) return false
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query)
      }
      return true
    })

    switch (sortBy) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break
      default: filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return filtered
  }, [selectedBrands, selectedCategories, selectedSizes, priceRange, sortBy, searchQuery])

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedSizes([])
    setPriceRange([0, 10000000])
    setSearchQuery("")
  }

  const toggleItem = (arr, setArr, item) => {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item])
  }

  const activeFilterCount = selectedBrands.length + selectedCategories.length + selectedSizes.length + (priceRange[0] > 0 || priceRange[1] < 10000000 ? 1 : 0)

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bộ Lọc</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Xóa Tất Cả</button>
        )}
      </div>

      {/* Brands */}
      <details open>
        <summary className="text-sm font-medium cursor-pointer py-2 border-b border-border">Thương Hiệu {selectedBrands.length > 0 && <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">{selectedBrands.length}</span>}</summary>
        <div className="space-y-2 pt-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleItem(selectedBrands, setSelectedBrands, brand)} className="w-4 h-4 rounded accent-accent" />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Categories */}
      <details open>
        <summary className="text-sm font-medium cursor-pointer py-2 border-b border-border">Danh Mục {selectedCategories.length > 0 && <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">{selectedCategories.length}</span>}</summary>
        <div className="space-y-2 pt-3">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={selectedCategories.includes(cat.value)} onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat.value)} className="w-4 h-4 rounded accent-accent" />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Price Range */}
      <details open>
        <summary className="text-sm font-medium cursor-pointer py-2 border-b border-border">Khoảng Giá</summary>
        <div className="space-y-3 pt-3">
          <input type="range" min={0} max={10000000} step={500000} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full accent-accent" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0đ</span>
            <span>{priceRange[1].toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      </details>

      {/* Sizes */}
      <details open>
        <summary className="text-sm font-medium cursor-pointer py-2 border-b border-border">Kích Cỡ {selectedSizes.length > 0 && <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">{selectedSizes.length}</span>}</summary>
        <div className="grid grid-cols-5 gap-2 pt-3">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleItem(selectedSizes, setSelectedSizes, size)}
              className={`py-2 text-sm border rounded-md transition-colors cursor-pointer ${selectedSizes.includes(size) ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </details>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">TẤT CẢ SẢN PHẨM</h1>
            <p className="text-muted-foreground max-w-2xl mt-4">
              Khám phá bộ sưu tập sneaker đa dạng với các thương hiệu hàng đầu thế giới.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28"><FiltersContent /></div>
              </aside>

              {/* Products */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input placeholder="Tìm kiếm sản phẩm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-10 pl-10 pr-4 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Mobile filter button */}
                    <button onClick={() => setShowMobileFilters(true)} className="lg:hidden relative px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors cursor-pointer">
                      Bộ Lọc
                      {activeFilterCount > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">{activeFilterCount}</span>}
                    </button>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-10 px-3 rounded-md bg-card border border-border text-foreground text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="newest">Mới Nhất</option>
                      <option value="price-asc">Giá: Thấp - Cao</option>
                      <option value="price-desc">Giá: Cao - Thấp</option>
                      <option value="name">Tên A-Z</option>
                    </select>
                    <div className="hidden md:flex items-center border border-border rounded-md">
                      <button className={`p-2 rounded-l-md cursor-pointer ${gridCols === 3 ? "bg-secondary" : ""}`} onClick={() => setGridCols(3)}><Grid3x3 className="h-4 w-4" /></button>
                      <button className={`p-2 rounded-r-md cursor-pointer ${gridCols === 4 ? "bg-secondary" : ""}`} onClick={() => setGridCols(4)}><LayoutGrid className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Hiển thị <span className="font-medium text-foreground">{filteredProducts.length}</span> sản phẩm
                </p>

                {filteredProducts.length > 0 ? (
                  <div className={`grid grid-cols-2 gap-4 md:gap-6 ${gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                    <p className="text-muted-foreground mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    <button onClick={clearFilters} className="px-6 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer">Xóa Bộ Lọc</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filters Drawer */}
        {showMobileFilters && (
          <>
            <div className="overlay" onClick={() => setShowMobileFilters(false)} />
            <div className="fixed top-0 left-0 bottom-0 w-full sm:w-96 bg-background z-50 animate-slide-in-left overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Bộ Lọc Sản Phẩm</h2>
                <button onClick={() => setShowMobileFilters(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">✕</button>
              </div>
              <FiltersContent />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
