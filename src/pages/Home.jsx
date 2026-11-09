import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react'
import Section from '../components/Section.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Img from '../components/Img.jsx'
import { categories, products } from '../data/products.js'

const perks = [
  [Truck, 'Free fast shipping', 'On all orders over $100.'],
  [ShieldCheck, '2-year warranty', 'Quality you can rely on.'],
  [RotateCcw, '30-day returns', 'Changed your mind? No problem.'],
]
const reviews = [
  ['Amelia R.', 'The tote is stunning — the leather feels incredible.'],
  ['Daniel K.', 'The best headphones I have owned. Fast delivery too.'],
  ['Sofia M.', 'Beautiful packaging and excellent customer service.'],
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState({ text: '', ok: false })
  const best = products.filter((p) => p.bestseller)
  const fresh = [...products].sort((a, b) => b.added - a.added).slice(0, 4)

  const subscribe = (e) => {
    e.preventDefault()
    const ok = /^\S+@\S+\.\S+$/.test(email)
    setMsg(ok ? { text: 'Thanks for subscribing! Check your inbox for 10% off.', ok } : { text: 'Please enter a valid email address.', ok })
    if (ok) setEmail('')
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="fade">
          <p className="mb-4 text-xs tracking-[.25em] text-accent">AUTUMN / WINTER 2026</p>
          <h1 className="font-serif text-5xl leading-[1.05] md:text-6xl">Considered design for everyday living.</h1>
          <p className="mt-5 max-w-md text-black/60">Thoughtfully made essentials across tech, fashion and home — built to last, designed to be loved.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link to="/about" className="btn-outline">Our story</Link>
          </div>
        </div>
        <Img src={products[2].image} alt="Atelier Leather Tote" className="aspect-[5/4] w-full rounded-3xl object-cover shadow-xl" />
      </section>

      <Section title="Shop by category">
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.name} to={`/shop?cat=${c.name}`} className="group relative block overflow-hidden rounded-2xl">
              <Img src={c.image} alt={c.name} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <h3 className="font-serif text-2xl">{c.name}</h3>
                <p className="text-sm text-white/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Best sellers" subtitle="Our most-loved pieces." action={<Link to="/shop" className="hidden text-sm text-accent sm:block">View all →</Link>}>
        <ProductGrid items={best} />
      </Section>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-charcoal p-10 text-white md:flex-row md:p-14">
          <div>
            <h2 className="font-serif text-3xl">Up to 30% off selected pieces</h2>
            <p className="mt-2 text-white/60">Limited-time seasonal offer.</p>
          </div>
          <Link to="/shop?sort=sale" className="btn-primary">Shop the sale</Link>
        </div>
      </div>

      <Section title="New arrivals"><ProductGrid items={fresh} /></Section>

      <Section title="Why choose us">
        <div className="grid gap-6 sm:grid-cols-3">
          {perks.map(([Icon, t, s]) => (
            <div key={t} className="rounded-2xl bg-white p-6">
              <Icon className="text-accent" size={28} />
              <h3 className="mt-3 font-medium">{t}</h3>
              <p className="text-sm text-black/60">{s}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Loved by customers">
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map(([name, text]) => (
            <figure key={name} className="rounded-2xl bg-white p-6">
              <div className="flex gap-0.5 text-accent">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              <blockquote className="mt-3">“{text}”</blockquote>
              <figcaption className="mt-3 text-sm text-black/50">{name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <section className="bg-sand px-4 py-16 text-center">
        <h2 className="font-serif text-3xl">Join the list</h2>
        <p className="mt-2 text-black/60">Get 10% off your first order.</p>
        <form onSubmit={subscribe} noValidate className="mx-auto mt-6 flex max-w-md gap-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" className="input rounded-full px-5" />
          <button className="btn-primary" type="submit">Subscribe</button>
        </form>
        {msg.text && <p className={`fade mt-3 text-sm ${msg.ok ? 'text-green-700' : 'text-red-600'}`}>{msg.text}</p>}
      </section>
    </>
  )
}
