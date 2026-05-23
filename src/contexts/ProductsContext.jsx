import { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts } from '@/data/products'

const ProductsContext = createContext(null)
const STORAGE_KEY = 'sneaker-products'

function loadProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialProducts
  } catch {
    return initialProducts
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(loadProducts)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (e) {
      console.error('Failed to save products to localStorage', e)
    }
  }, [products])

  const addProduct = (productData) => {
    const newId = String(
      products.reduce((maxId, p) => Math.max(maxId, parseInt(p.id) || 0), 0) + 1
    )
    const newProduct = {
      id: newId,
      isNew: true,
      ...productData,
      price: Number(productData.price),
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedData,
              price: Number(updatedData.price),
              originalPrice: updatedData.originalPrice ? Number(updatedData.originalPrice) : undefined,
            }
          : p
      )
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used within ProductsProvider')
  return context
}
