import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { products, finalPrice, FREE_SHIPPING_OVER, SHIPPING_FEE } from '../data/products.js'

const CartContext = createContext(null)
const KEY = 'lumen-cart'

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(raw) ? raw.filter((i) => i && Number.isInteger(i.id) && i.qty > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [toast, setToast] = useState('')

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage unavailable */ }
  }, [items])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const notify = useCallback((msg) => setToast(msg), [])

  const addToCart = useCallback((id, qty = 1) => {
    setItems((cur) =>
      cur.some((i) => i.id === id)
        ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...cur, { id, qty }]
    )
    setToast('Added to cart')
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((cur) => (qty < 1 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))))
  }, [])

  const removeItem = useCallback((id) => setItems((cur) => cur.filter((i) => i.id !== id)), [])
  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ ...products.find((p) => p.id === i.id), qty: i.qty }))
      .filter((l) => l.name)
    const subtotal = lines.reduce((s, l) => s + finalPrice(l) * l.qty, 0)
    const shipping = lines.length === 0 || subtotal > FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE
    const count = lines.reduce((s, l) => s + l.qty, 0)
    return { lines, subtotal, shipping, total: subtotal + shipping, count, addToCart, setQty, removeItem, clearCart, toast, notify }
  }, [items, toast, addToCart, setQty, removeItem, clearCart, notify])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
