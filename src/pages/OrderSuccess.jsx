import { Link, Navigate, useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import { money } from '../data/products.js'

export default function OrderSuccess() {
  const { state: order } = useLocation()
  if (!order) return <Navigate to="/" replace />
  return (
    <div className="fade px-4 py-28 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-white"><Check size={30} /></div>
      <h1 className="mt-6 font-serif text-4xl">Thank you, {order.name.split(' ')[0]}!</h1>
      <p className="mx-auto mt-3 max-w-md text-black/60">
        Order <b>{order.id}</b> ({money(order.total)}) is confirmed. A confirmation has been sent to {order.email}.
      </p>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  )
}
