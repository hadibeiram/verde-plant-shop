import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'verde-cart-v1'

// The cart is the backbone of the "follow instructions" buying process.
// It persists to localStorage so a returning shopper never has to rebuild
// their basket from memory (Recognition rather than Recall) and survives a
// page refresh mid-checkout (User Control & Freedom).
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage may be unavailable (private mode), cart still works in memory */
    }
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  const setQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i))
    )
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + (i.salePrice ?? i.price) * i.qty, 0),
    [items]
  )
  const savings = useMemo(
    () =>
      items.reduce(
        (s, i) => s + (i.salePrice ? (i.price - i.salePrice) * i.qty : 0),
        0
      ),
    [items]
  )

  const value = {
    items,
    addItem,
    setQty,
    removeItem,
    clearCart,
    count,
    subtotal,
    savings,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
