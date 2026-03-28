import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/data/products'

export default function ProductCard({ id, name, brand, price, originalPrice, image, isNew, isSale }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Add with default size (first available)
    addItem({ id, name, brand, price, originalPrice, image }, 42)
  }

  return (
    <Link to={`/san-pham/${id}`} className="block">
      <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:-translate-y-2 transition-transform duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="inline-block px-2 py-0.5 bg-foreground text-background text-xs font-semibold rounded">
              MỚI
            </span>
          )}
          {isSale && (
            <span className="inline-block px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background cursor-pointer"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-square bg-secondary/50 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {brand}
          </p>
          <h3 className="font-medium mb-2 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            Thêm Vào Giỏ
          </button>
        </div>
      </div>
    </Link>
  )
}
