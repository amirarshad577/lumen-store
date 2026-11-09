import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { finalPrice, discountPct, money } from '../data/products.js'
import Img from './Img.jsx'

export default function ProductCard({ product: p }) {
  const { addToCart } = useCart()
  const off = discountPct(p)
  return (
    <article className="group fade">
      <Link to={`/product/${p.id}`} className="relative block overflow-hidden rounded-2xl bg-white">
        <Img src={p.image} alt={p.name} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
        {off > 0 && <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">-{off}%</span>}
      </Link>
      <div className="mt-3 flex justify-between gap-2">
        <div>
          <p className="text-xs text-black/50">{p.category}</p>
          <Link to={`/product/${p.id}`} className="font-medium hover:text-accent">{p.name}</Link>
          <p className="text-sm">
            <b>{money(finalPrice(p))}</b>
            {p.salePrice && <s className="ml-2 text-black/40">{money(p.price)}</s>}
          </p>
        </div>
        <button
          aria-label={`Add ${p.name} to cart`}
          onClick={() => addToCart(p.id)}
          className="grid h-10 w-10 shrink-0 self-end place-items-center rounded-full bg-accent text-white transition hover:bg-accent-dark active:scale-90"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
    </article>
  )
}
