import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'sneaker-cart'

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function cartReducer(state, action) {
  let newState
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload
      const existingIndex = state.findIndex(
        (item) => item.product.id === product.id && item.size === size
      )
      if (existingIndex > -1) {
        newState = [...state]
        newState[existingIndex] = {
          ...newState[existingIndex],
          quantity: newState[existingIndex].quantity + 1,
        }
      } else {
        newState = [...state, { product, quantity: 1, size }]
      }
      break
    }
    case 'REMOVE_ITEM': {
      const { productId, size } = action.payload
      newState = state.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
      break
    }
    case 'UPDATE_QUANTITY': {
      const { productId, size, quantity } = action.payload
      if (quantity <= 0) {
        newState = state.filter(
          (item) => !(item.product.id === productId && item.size === size)
        )
      } else {
        newState = state.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      }
      break
    }
    case 'CLEAR':
      newState = []
      break
    default:
      return state
  }
  saveCart(newState)
  return newState
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart)

  // Sync on mount
  useEffect(() => {
    saveCart(items)
  }, [])

  const addItem = (product, size) => dispatch({ type: 'ADD_ITEM', payload: { product, size } })
  const removeItem = (productId, size) => dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } })
  const updateQuantity = (productId, size, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR' })
  const getTotalItems = () => items.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
