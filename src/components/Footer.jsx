import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-10 bg-charcoal text-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white">Lumen<span className="text-accent">.</span></p>
          <p className="mt-2">Modern essentials for everyday living.</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
        <div>
          <p>hello@lumenandco.com<br />Mon–Fri, 9am–6pm</p>
          <div className="mt-4 flex gap-4 text-white">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs">© 2026 Lumen & Co. Demo storefront.</p>
    </footer>
  )
}
