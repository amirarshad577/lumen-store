import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
      {items.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
