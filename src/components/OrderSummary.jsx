import { useCart } from '../context/CartContext.jsx'
import { finalPrice, money } from '../data/products.js'

export default function OrderSummary({ showItems = false, children }) {
  const { lines, subtotal, shipping, total } = useCart()
  return (
    <aside className="h-fit rounded-2xl bg-white p-6">
      <h2 className="mb-4 font-medium">{showItems ? 'Order summary' : 'Summary'}</h2>
      {showItems && lines.map((l) => (
        <div key={l.id} className="flex justify-between py-1 text-sm">
          <span>{l.name} × {l.qty}</span><span>{money(finalPrice(l) * l.qty)}</span>
        </div>
      ))}
      <div className={`flex justify-between text-sm ${showItems ? 'mt-3 border-t pt-3' : ''}`}><span>Subtotal</span><span>{money(subtotal)}</span></div>
      <div className="mt-2 flex justify-between text-sm"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div>
      <div className="mt-4 flex justify-between border-t pt-4 font-semibold"><span>Total</span><span>{money(total)}</span></div>
      {children}
    </aside>
  )
}
