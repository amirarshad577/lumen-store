import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const links = [['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']]

export default function Header() {
  const { count } = useCart()
  const [menu, setMenu] = useState(false)
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => setMenu(false), [pathname])

  const submit = (e) => {
    e.preventDefault()
    navigate(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
    setSearching(false)
  }

  const navClass = ({ isActive }) => `transition hover:text-accent ${isActive ? 'font-medium text-accent' : ''}`

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
      <div className="bg-charcoal px-4 py-2 text-center text-xs text-white">
        Free shipping on orders over $100 · Use code <b>WELCOME10</b>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
        <Link to="/" className="font-serif text-2xl font-semibold tracking-tight">
          Lumen<span className="text-accent">.</span>
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={navClass}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Search" onClick={() => setSearching(!searching)}><Search size={20} /></button>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] text-white">{count}</span>
            )}
          </Link>
        </div>
      </div>
      {searching && (
        <form onSubmit={submit} className="fade mx-auto max-w-7xl px-4 pb-3">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="input rounded-full px-5 py-2.5" />
        </form>
      )}
      {menu && (
        <nav className="fade flex flex-col border-t border-black/5 px-4 py-2 md:hidden">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={(s) => `py-3 ${navClass(s)}`}>{label}</NavLink>)}
        </nav>
      )}
    </header>
  )
}
