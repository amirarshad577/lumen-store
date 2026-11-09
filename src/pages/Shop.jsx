import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import { products, finalPrice } from '../data/products.js'

const cats = ['All', 'Tech', 'Fashion', 'Home']
const sorts = {
  newest: ['Newest', (a, b) => b.added - a.added],
  low: ['Price: low to high', (a, b) => finalPrice(a) - finalPrice(b)],
  high: ['Price: high to low', (a, b) => finalPrice(b) - finalPrice(a)],
  sale: ['On sale first', (a, b) => Boolean(b.salePrice) - Boolean(a.salePrice)],
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = cats.includes(params.get('cat')) ? params.get('cat') : 'All'
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'newest'
  const q = params.get('q') || ''

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    setParams(next, { replace: true })
  }

  const items = useMemo(
    () =>
      products
        .filter((p) => (cat === 'All' || p.category === cat) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q.toLowerCase()))
        .sort(sorts[sort][1]),
    [cat, sort, q]
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-serif text-4xl">{q ? `Results for “${q}”` : 'Shop'}</h1>
      <p className="mb-6 mt-1 text-sm text-black/50">{items.length} product{items.length !== 1 && 's'}</p>
      <div className="mb-8 flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => update('cat', c === 'All' ? '' : c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? 'border-charcoal bg-charcoal text-white' : 'border-black/10 bg-white hover:border-black/30'}`}>
              {c}
            </button>
          ))}
        </div>
        <select aria-label="Sort products" value={sort} onChange={(e) => update('sort', e.target.value === 'newest' ? '' : e.target.value)}
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">
          {Object.entries(sorts).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
        </select>
      </div>
      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-black/60">No products match your search.</p>
          <button className="btn-primary mt-4" onClick={() => setParams({})}>Clear filters</button>
        </div>
      )}
    </div>
  )
}
