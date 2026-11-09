import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { finalPrice, money } from '../data/products.js'
import Img from '../components/Img.jsx'
import OrderSummary from '../components/OrderSummary.jsx'

export default function Cart() {
  const { lines, setQty, removeItem } = useCart()
  const navigate = useNavigate()

  if (!lines.length) {
    return (
      <div className="px-4 py-28 text-center">
        <h1 className="font-serif text-4xl">Your cart is empty</h1>
        <p className="mt-2 text-black/60">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary mt-6">Start shopping</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 font-serif text-4xl">Shopping cart</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <ul className="space-y-4 md:col-span-2">
          {lines.map((l) => (
            <li key={l.id} className="flex gap-4 rounded-2xl bg-white p-3">
              <Link to={`/product/${l.id}`}><Img src={l.image} alt={l.name} className="h-24 w-24 rounded-xl object-cover" /></Link>
              <div className="flex-1">
                <Link to={`/product/${l.id}`} className="font-medium hover:text-accent">{l.name}</Link>
                <p className="text-sm text-black/50">{money(finalPrice(l))}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-black/15">
                    <button aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center" onClick={() => setQty(l.id, l.qty - 1)}><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <button aria-label="Increase quantity" className="grid h-8 w-8 place-items-center" onClick={() => setQty(l.id, l.qty + 1)}><Plus size={14} /></button>
                  </div>
                  <button aria-label={`Remove ${l.name}`} className="text-black/40 hover:text-red-600" onClick={() => removeItem(l.id)}><Trash2 size={18} /></button>
                </div>
              </div>
              <b>{money(finalPrice(l) * l.qty)}</b>
            </li>
          ))}
        </ul>
        <OrderSummary>
          <button className="btn-primary mt-5 w-full" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          <Link to="/shop" className="btn-outline mt-2 w-full">Continue Shopping</Link>
        </OrderSummary>
      </div>
    </div>
  )
}
