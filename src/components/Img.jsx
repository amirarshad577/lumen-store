import { useState } from 'react'

// Image with a graceful fallback if the remote photo fails to load.
export default function Img({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-sand to-[#d9c9b6] text-sm text-black/40 ${className}`}>
        {alt}
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />
}
