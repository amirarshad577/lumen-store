import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { products, finalPrice, discountPct, money } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import Section from '../components/Section.jsx'
import Img from '../components/Img.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [view, setView] = useState(0)

  if (!product) {
    return (
      <div className="py-28 text-center">
        <h1 className="font-serif text-4xl">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
      </div>
    )
  }

  const gallery = [
    { src: product.image, cls: '' },
    { src: product.image, cls: 'scale-x-[-1]' },
    { src: product.image, cls: 'scale-150' },
  ]
  const related = [...products.filter((p) => p.id !== product.id && p.category === product.category), ...products.filter((p) => p.category !== product.category)].slice(0, 4)
  const off = discountPct(product)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" key={product.id}>
      <Link to="/shop" className="mb-6 inline-block text-sm text-black/60 hover:text-accent">← Back to shop</Link>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl bg-white">
            <Img src={gallery[view].src} alt={product.name} className={`aspect-square w-full object-cover transition duration-300 ${gallery[view].cls}`} />
          </div>
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setView(i)} aria-label={`View image ${i + 1}`}
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${view === i ? 'border-accent' : 'border-transparent'}`}>
                <Img src={g.src} alt="" className={`h-full w-full object-cover ${g.cls}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="fade">
          <p className="text-xs text-black/50">{product.category}</p>
          <h1 className="mt-1 font-serif text-4xl">{product.name}</h1>
          <p className="mt-3 flex items-center gap-3 text-2xl">
            <b>{money(finalPrice(product))}</b>
            {product.salePrice && (
              <>
                <s className="text-lg text-black/40">{money(product.price)}</s>
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-white">-{off}%</span>
              </>
            )}
          </p>
          <p className="mt-5 text-black/70">{product.description}</p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-black/15 bg-white">
              <button aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
              <span className="w-8 text-center" aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" className="grid h-11 w-11 place-items-center" onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
            </div>
            <button className="btn-primary flex-1" onClick={() => addToCart(product.id, qty)}>Add to Cart</button>
          </div>
          <div className="mt-8 border-t border-black/10 pt-6">
            <h2 className="mb-3 font-medium">Product details</h2>
            <ul className="space-y-2 text-sm text-black/70">
              {product.details.map((d) => <li key={d} className="flex gap-2"><Check size={16} className="mt-0.5 text-accent" />{d}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <Section title="You may also like" className="px-0"><ProductGrid items={related} /></Section>
    </div>
  )
}
