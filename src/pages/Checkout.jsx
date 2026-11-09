import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import OrderSummary from '../components/OrderSummary.jsx'

const rules = {
  name: [(v) => v.trim().length >= 2, 'Enter your full name'],
  email: [(v) => /^\S+@\S+\.\S+$/.test(v), 'Enter a valid email address'],
  phone: [(v) => /^[\d\s+()-]{7,}$/.test(v), 'Enter a valid phone number'],
  address: [(v) => v.trim().length >= 5, 'Enter your shipping address'],
  city: [(v) => v.trim().length >= 2, 'Enter your city'],
  zip: [(v) => /^[\w\s-]{3,10}$/.test(v), 'Enter a valid postal code'],
}

export default function Checkout() {
  const { lines, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' })
  const [errors, setErrors] = useState({})

  if (!lines.length) {
    return (
      <div className="py-28 text-center">
        <p>Your cart is empty.</p>
        <Link to="/shop" className="btn-primary mt-4">Go shopping</Link>
      </div>
    )
  }

  const validate = (data) =>
    Object.fromEntries(Object.entries(rules).filter(([k, [ok]]) => !ok(data[k])).map(([k, [, msg]]) => [k, msg]))

  const change = (k) => (e) => {
    const next = { ...form, [k]: e.target.value }
    setForm(next)
    if (errors[k]) setErrors((er) => ({ ...er, [k]: validate(next)[k] }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const order = { id: `LM-${Math.floor(100000 + Math.random() * 900000)}`, email: form.email, name: form.name, total }
    clearCart()
    navigate('/order-success', { state: order, replace: true })
  }

  const field = (k, label, type = 'text') => (
    <label className="block">
      <span className="text-sm">{label}</span>
      <input type={type} value={form[k]} onChange={change(k)} aria-invalid={Boolean(errors[k])}
        className={`input mt-1 ${errors[k] ? 'input-error' : ''}`} />
      {errors[k] && <span className="text-xs text-red-600">{errors[k]}</span>}
    </label>
  )

  return (
    <form noValidate onSubmit={submit} className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-5">
      <div className="space-y-4 md:col-span-3">
        <h1 className="mb-2 font-serif text-4xl">Checkout</h1>
        {field('name', 'Full name')}
        {field('email', 'Email address', 'email')}
        {field('phone', 'Phone number', 'tel')}
        {field('address', 'Shipping address')}
        <div className="grid grid-cols-2 gap-4">{field('city', 'City')}{field('zip', 'Postal code')}</div>
        <p className="text-xs text-black/50">Demo checkout — no payment is taken.</p>
      </div>
      <div className="md:col-span-2">
        <OrderSummary showItems>
          <button type="submit" className="btn-primary mt-5 w-full">Place Order</button>
        </OrderSummary>
      </div>
    </form>
  )
}
