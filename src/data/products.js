const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

export const categories = [
  { name: 'Tech', blurb: 'Smart essentials', image: u('photo-1505740420928-5e560c06d30e') },
  { name: 'Fashion', blurb: 'Everyday style', image: u('photo-1584917865442-de89df76afd3') },
  { name: 'Home', blurb: 'Calm interiors', image: u('photo-1514228742587-6b1558fcca3d') },
]

export const products = [
  { id: 1, name: 'Aero Smartwatch', category: 'Tech', price: 199, salePrice: 149, image: u('photo-1523275335684-37898b6baf30'), description: 'Titanium case, always-on display and a 7-day battery.', details: ['Titanium case', 'Water resistant to 50m', 'Heart-rate and sleep tracking', '7-day battery life'], added: 8, bestseller: true },
  { id: 2, name: 'Studio Headphones', category: 'Tech', price: 249, image: u('photo-1505740420928-5e560c06d30e'), description: 'Over-ear wireless headphones with adaptive noise cancelling.', details: ['40-hour playback', 'Adaptive noise cancelling', 'Bluetooth 5.3', 'Memory-foam ear cushions'], added: 7, bestseller: true },
  { id: 3, name: 'Atelier Leather Tote', category: 'Fashion', price: 180, salePrice: 129, image: u('photo-1584917865442-de89df76afd3'), description: 'Full-grain vegetable-tanned leather with a suede-lined interior.', details: ['Full-grain leather', 'Suede lining', 'Fits a 15" laptop', 'Hand-finished edges'], added: 6, bestseller: true },
  { id: 4, name: 'Stride Sneakers', category: 'Fashion', price: 120, image: u('photo-1542291026-7eec264c27ff'), description: 'Minimal low-top sneakers in recycled knit with a cushioned sole.', details: ['Recycled knit upper', 'Cushioned insole', 'Non-slip rubber sole', 'Machine washable'], added: 5, bestseller: true },
  { id: 5, name: 'Solstice Sunglasses', category: 'Fashion', price: 95, salePrice: 69, image: u('photo-1572635196237-14b3f281503f'), description: 'Polarised lenses in lightweight acetate frames.', details: ['100% UV protection', 'Polarised lenses', 'Acetate frame', 'Includes hard case'], added: 4 },
  { id: 6, name: 'Halo Desk Lamp', category: 'Home', price: 89, image: u('photo-1507473885765-e6ed057f782c'), description: 'Dimmable warm LED lamp with a wireless charging base.', details: ['Touch dimming', '3 colour temperatures', 'Qi wireless charger', 'Energy efficient LED'], added: 3 },
  { id: 7, name: 'Ceramic Pour-Over Mug', category: 'Home', price: 34, image: u('photo-1514228742587-6b1558fcca3d'), description: 'Hand-glazed stoneware mug, 350ml, dishwasher safe.', details: ['Hand-glazed stoneware', '350ml capacity', 'Dishwasher safe', 'Microwave safe'], added: 2 },
  { id: 8, name: 'Cedar & Fig Candle', category: 'Home', price: 42, salePrice: 29, image: u('photo-1603006905003-be475563bc59'), description: 'Hand-poured soy wax candle with a 50-hour burn time.', details: ['100% soy wax', '50-hour burn time', 'Cotton wick', 'Recyclable glass jar'], added: 1 },
]

export const finalPrice = (p) => p.salePrice ?? p.price
export const discountPct = (p) => (p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0)
export const money = (n) => `$${n.toFixed(2)}`
export const FREE_SHIPPING_OVER = 100
export const SHIPPING_FEE = 9
