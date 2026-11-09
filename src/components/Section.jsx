export default function Section({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-14 ${className}`}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-black/60">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
