import { Link } from 'react-router-dom'
import Img from '../components/Img.jsx'
import { products } from '../data/products.js'

const values = [
  ['Our mission', 'Make thoughtful design accessible to everyone.'],
  ['Sustainability', 'Recycled materials and carbon-neutral shipping.'],
  ['Craftsmanship', 'Every piece is tested and made to last.'],
]

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[.25em] text-accent">OUR STORY</p>
          <h1 className="mt-3 font-serif text-5xl">Made with intention.</h1>
          <p className="mt-5 text-black/70">
            Lumen & Co. began in 2019 with a simple belief: the things we use every day should be beautiful, durable and responsibly made.
            We partner with small workshops around the world to bring you essentials that earn their place in your life.
          </p>
          <Link to="/shop" className="btn-primary mt-6">Explore the collection</Link>
        </div>
        <Img src={products[5].image} alt="Halo Desk Lamp" className="aspect-square w-full rounded-3xl object-cover" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {values.map(([t, s]) => (
          <div key={t} className="rounded-2xl bg-white p-6">
            <h2 className="font-serif text-xl">{t}</h2>
            <p className="mt-2 text-sm text-black/60">{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
