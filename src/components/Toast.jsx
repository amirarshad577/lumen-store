import { useCart } from '../context/CartContext.jsx'

export default function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <div role="status" className="fade fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-charcoal px-5 py-3 text-sm text-white shadow-xl">
      {toast}
    </div>
  )
}
