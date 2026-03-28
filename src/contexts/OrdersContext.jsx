import { createContext, useContext, useReducer, useEffect } from 'react'
import { products } from '@/data/products'

const OrdersContext = createContext(null)
const STORAGE_KEY = 'sneaker-orders'

// Mock order history data
const mockOrders = [
  {
    id: "KZ-20260315-001",
    date: "2026-03-15T14:30:00",
    status: "delivered",
    statusLabel: "Đã giao hàng",
    paymentMethod: "COD",
    shippingAddress: {
      name: "Nguyễn Văn Demo",
      phone: "0912345678",
      address: "123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM"
    },
    items: [
      { product: products[0], quantity: 1, size: 42, price: products[0].price },
      { product: products[6], quantity: 1, size: 41, price: products[6].price },
    ],
    subtotal: products[0].price + products[6].price,
    shipping: 0,
    discount: 0,
    total: products[0].price + products[6].price,
  },
  {
    id: "KZ-20260310-002",
    date: "2026-03-10T09:15:00",
    status: "shipping",
    statusLabel: "Đang giao hàng",
    paymentMethod: "banking",
    shippingAddress: {
      name: "Nguyễn Văn Demo",
      phone: "0912345678",
      address: "123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM"
    },
    items: [
      { product: products[3], quantity: 2, size: 40, price: products[3].price },
    ],
    subtotal: products[3].price * 2,
    shipping: 0,
    discount: products[3].price * 2 * 0.1,
    total: products[3].price * 2 - products[3].price * 2 * 0.1,
  },
  {
    id: "KZ-20260301-003",
    date: "2026-03-01T16:45:00",
    status: "delivered",
    statusLabel: "Đã giao hàng",
    paymentMethod: "COD",
    shippingAddress: {
      name: "Nguyễn Văn Demo",
      phone: "0912345678",
      address: "456 Võ Văn Tần, P.5, Q.3, TP.HCM"
    },
    items: [
      { product: products[2], quantity: 1, size: 43, price: products[2].price },
      { product: products[7], quantity: 1, size: 42, price: products[7].price },
      { product: products[4], quantity: 1, size: 39, price: products[4].price },
    ],
    subtotal: products[2].price + products[7].price + products[4].price,
    shipping: 0,
    discount: 0,
    total: products[2].price + products[7].price + products[4].price,
  },
  {
    id: "KZ-20260220-004",
    date: "2026-02-20T11:00:00",
    status: "delivered",
    statusLabel: "Đã giao hàng",
    paymentMethod: "banking",
    shippingAddress: {
      name: "Nguyễn Văn Demo",
      phone: "0912345678",
      address: "123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM"
    },
    items: [
      { product: products[1], quantity: 1, size: 41, price: products[1].price },
    ],
    subtotal: products[1].price,
    shipping: 0,
    discount: 0,
    total: products[1].price,
  },
]

function loadOrders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : mockOrders
  } catch {
    return mockOrders
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

function ordersReducer(state, action) {
  let newState
  switch (action.type) {
    case 'ADD_ORDER':
      newState = [action.payload, ...state]
      break
    case 'INIT_MOCK':
      newState = mockOrders
      break
    default:
      return state
  }
  saveOrders(newState)
  return newState
}

export function OrdersProvider({ children }) {
  const [orders, dispatch] = useReducer(ordersReducer, [], loadOrders)

  const addOrder = (orderData) => {
    const order = {
      id: `KZ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
      status: "processing",
      statusLabel: "Đang xử lý",
      ...orderData,
    }
    dispatch({ type: 'ADD_ORDER', payload: order })
    return order
  }

  const getOrderById = (id) => orders.find(o => o.id === id)

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders must be used within OrdersProvider')
  return context
}
