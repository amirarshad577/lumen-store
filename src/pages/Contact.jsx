import { useState } from 'react'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { notify } = useCart()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  const validate = (f) => {
    const e = {}
    if (!f.name.trim()) e.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email'
    if (!f.subject.trim()) e.subject = 'Please add a subject'
    if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) return
    notify('Message sent — we will reply within 24 hours')
    setForm(empty)
  }

  const bind = (k) => ({
    value: form[k],
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
    className: `input ${errors[k] ? 'input-error' : ''}`,
  })
  const err = (k) => errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 md:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl">Get in touch</h1>
        <p className="mt-3 text-black/60">Questions about an order or a product? We're here to help.</p>
        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex gap-3"><MapPin size={18} className="text-accent" />12 Market Street, London</li>
          <li className="flex gap-3"><Mail size={18} className="text-accent" />hello@lumenandco.com</li>
          <li className="flex gap-3"><Phone size={18} className="text-accent" />+44 20 7946 0123</li>
        </ul>
        <div className="mt-6 flex gap-4">
          <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
        </div>
      </div>
      <form noValidate onSubmit={submit} className="space-y-3">
        <div><input placeholder="Your name" aria-label="Name" {...bind('name')} />{err('name')}</div>
        <div><input type="email" placeholder="Email" aria-label="Email" {...bind('email')} />{err('email')}</div>
        <div><input placeholder="Subject" aria-label="Subject" {...bind('subject')} />{err('subject')}</div>
        <div><textarea rows="5" placeholder="Message" aria-label="Message" {...bind('message')} />{err('message')}</div>
        <button type="submit" className="btn-primary">Send message</button>
      </form>
    </div>
  )
}
