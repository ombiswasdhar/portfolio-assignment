import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Check,
  Star,
  ExternalLink,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  Info
} from 'lucide-react'

// Default product catalog based on the PlayStaples Series 01 Figma design
export const PLAYSTAPLES_PRODUCTS = [
  {
    id: 'kaali-peeli',
    title: 'KAALI - PEELI',
    subtitle: 'Sedan & Hatchback — Series 01',
    materials: 'Teak + Rosewood',
    price: 1850,
    tag: 'BESTSELLER',
    sku: 'PS-KG-01',
    description: 'Iconic Bombay Premier Padmini taxi handcrafted collectible with detachable magnetic luggage carrier.',
    image: '/playstaples-pt2/thumbnail.webp'
  },
  {
    id: 'konkan-ghats',
    title: 'KONKAN GHATS',
    subtitle: 'Mini Vans & Buses — Series 01',
    materials: 'Teak + Rosewood',
    price: 1850,
    tag: 'BESTSELLER',
    sku: 'PS-KG-02',
    description: 'Rugged terrain coastal red transport bus celebrating Maharashtra & Konkan highway heritage.',
    image: '/playstaples-pt2/shop_collections_full.webp'
  },
  {
    id: 'bombay-dreams',
    title: 'BOMBAY DREAMS',
    subtitle: 'Sedan & Hatchback — Series 01',
    materials: 'Teak + Rosewood',
    price: 1850,
    tag: 'BESTSELLER',
    sku: 'PS-KG-03',
    description: 'Pastel coastal cruiser inspired by evening Marine Drive drives and city light reflections.',
    image: '/playstaples-pt2/shop_collections_full.webp'
  },
  {
    id: 'retro-rohtak',
    title: 'RETRO ROHTAK',
    subtitle: 'Sedan & Hatchback — Series 01',
    materials: 'Teak + Rosewood',
    price: 1850,
    tag: 'LIMITED DROP',
    sku: 'PS-KG-04',
    description: 'Midnight black with crimson roof edition celebrating timeless North Indian grand touring sedans.',
    image: '/playstaples-pt2/thumbnail.webp'
  }
]

export default function PlayStaplesStoreView({
  initialPage = 'home',
  isEmbedded = false,
  onClose
}) {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(initialPage) // 'home' | 'shop' | 'collections' | 'product'
  const [cart, setCart] = useState([
    {
      id: 'kaali-peeli',
      title: 'KAALI - PEELI (Special Edition)',
      price: 1850,
      qty: 1,
      variant: 'Bombay Yellow & Black',
      image: '/playstaples-pt2/thumbnail.webp'
    }
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [selectedColor, setSelectedColor] = useState('yellow') // 'yellow' | 'black'
  const [productQty, setProductQty] = useState(1)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewStars, setReviewStars] = useState(5)
  const [reviewAuthor, setReviewAuthor] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const topScrollRef = useRef(null)

  // Scroll to top on page switch
  useEffect(() => {
    if (topScrollRef.current) {
      topScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage])

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  // Cart actions
  const addToCart = (product, customQty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + customQty } : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          qty: customQty,
          variant: selectedColor === 'yellow' ? 'Bombay Taxi (Yellow & Black)' : 'Stealth Black Taxi',
          image: product.image || '/playstaples-pt2/thumbnail.webp'
        }
      ]
    })
    showToast(`✓ Added ${product.title} to your cart!`)
  }

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
    showToast('Item removed from cart.')
  }

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0)
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  // Ticker text matching original master frame
  const tickerItems = [
    'KONKAN GHATS',
    'BOMBAY DREAMS',
    'LADAKH NIGHTS',
    'JAIPUR SKIES',
    'VAGATOR SURF',
    'SOURCED FROM NATURE',
    'BUILT FOR THE FUTURE',
    'SOLID HARDWOOD',
    'HANDCRAFTED COLLECTIBLES',
    'NEODYMIUM MAGNETIC SYSTEM'
  ]

  return (
    <div
      ref={topScrollRef}
      className={`relative w-full min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white font-sans ${
        isEmbedded ? 'rounded-2xl overflow-y-auto max-h-[88vh]' : ''
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. RUNNING TICKER MARQUEE BAR (Topmost)                                   */}
      {/* ========================================================================= */}
      <div className="w-full bg-white text-black border-b border-black text-[11px] sm:text-xs font-bold tracking-widest uppercase overflow-hidden py-1.5 select-none z-30 relative">
        <div className="flex w-max animate-marquee-fast hover:[animation-play-state:paused]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-3">
              <span>{item}</span>
              <span className="text-neutral-400 font-light">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PERSISTENT PLAYSTAPLES HEADER NAVBAR                                   */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-black/10 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
            title="PlayStaples Home"
          >
            <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center font-black text-lg tracking-tighter group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tighter uppercase leading-none">
                play staples
              </span>
              <span className="text-[9px] tracking-widest uppercase text-neutral-400 font-medium">
                Wooden Toys • PT2
              </span>
            </div>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-bold uppercase tracking-wider pl-4 border-l border-neutral-200">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className={`hover:text-amber-500 transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-black underline underline-offset-4' : 'text-neutral-500'
              }`}
            >
              Vehicles
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('product')}
              className={`hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'product' ? 'text-black underline underline-offset-4' : 'text-neutral-500'
              }`}
            >
              <span>Taxis</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('collections')}
              className={`hover:text-amber-500 transition-colors cursor-pointer ${
                currentPage === 'collections' ? 'text-black underline underline-offset-4' : 'text-neutral-500'
              }`}
            >
              Series 01
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('shop')}
              className={`hover:text-amber-500 transition-colors cursor-pointer ${
                currentPage === 'shop' ? 'text-black underline underline-offset-4' : 'text-neutral-500'
              }`}
            >
              Shop All
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('home')
                setTimeout(() => {
                  const el = document.getElementById('ps-philosophy')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="text-neutral-500 hover:text-amber-500 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>
        </div>

        {/* Right Action Icons: Search, Cart, Portfolio Exit / Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Toggle */}
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
            title="Search Products"
            aria-label="Search Products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Shop button */}
          <button
            type="button"
            onClick={() => setCurrentPage('shop')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-black transition-all cursor-pointer ${
              currentPage === 'shop'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            Shop
          </button>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-black text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-sm"
            title="View Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Cart</span>
            <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[10px] font-black flex items-center justify-center">
              {totalCartCount}
            </span>
          </button>

          {/* Return / Close control */}
          {isEmbedded && onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors ml-1 cursor-pointer"
              title="Close Store View"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/#work"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors ml-1"
              title="Return to Om Biswas Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>
          )}
        </div>
      </header>

      {/* Search Bar Flyout */}
      {isSearchOpen && (
        <div className="w-full bg-neutral-100 border-b border-black/10 px-4 sm:px-8 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 z-30 relative">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Premier Padmini, Kaali Peeli, Konkan Ghats, wooden vehicles..."
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setIsSearchOpen(false)
            }}
            className="text-xs text-neutral-500 hover:text-black font-semibold uppercase"
          >
            Close
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FLOATING PAGE CONTROL PILL BAR                                         */}
      {/* ========================================================================= */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentPage === 'home'
              ? 'bg-amber-400 text-black shadow-md scale-105'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage('shop')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentPage === 'shop'
              ? 'bg-amber-400 text-black shadow-md scale-105'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Shop All
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage('collections')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentPage === 'collections'
              ? 'bg-amber-400 text-black shadow-md scale-105'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Series 01
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage('product')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentPage === 'product'
              ? 'bg-amber-400 text-black shadow-md scale-105'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span>Kaali-Peeli PDP</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        </button>

        {!isEmbedded && (
          <Link
            to="/#work"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 border-l border-white/20 pl-3 ml-1"
            title="Return to Portfolio"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Portfolio</span>
          </Link>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN STORE CONTENT VIEWS                                               */}
      {/* ========================================================================= */}
      <main className="w-full relative">
        {/* ===================== VIEW 1: HOME PAGE ===================== */}
        {currentPage === 'home' && (
          <div className="w-full flex flex-col items-center">
            {/* Master Figma Frame Graphic */}
            <div className="relative w-full max-w-[1920px] mx-auto select-none">
              <img
                src="/playstaples-pt2/home_full.webp"
                alt="PlayStaples Redesigned Website - Kaali Peeli, Series 01 Indian Terrain Vehicles, Wooden Collectibles"
                className="w-full h-auto block select-none pointer-events-none"
                loading="eager"
              />

              {/* ================= INTERACTIVE HOTSPOTS ON HOME ================= */}
              {/* Hotspot 1: Hero Taxi Click to PDP */}
              <div
                onClick={() => setCurrentPage('product')}
                className="absolute cursor-pointer group"
                style={{
                  left: '20%',
                  top: '1.2%',
                  width: '60%',
                  height: '7.5%'
                }}
                title="Explore Kaali Peeli Premier Padmini"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400/40 rounded-3xl transition-all flex items-end justify-center pb-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                    View Product Details ↗
                  </span>
                </div>
              </div>

              {/* Hotspot 2: Collection "View All" Button */}
              <div
                onClick={() => setCurrentPage('shop')}
                className="absolute cursor-pointer"
                style={{
                  left: '24%',
                  top: '11.2%',
                  width: '12%',
                  height: '0.8%'
                }}
                title="View All Collections"
              >
                <div className="w-full h-full hover:bg-white/20 rounded transition-colors" />
              </div>

              {/* Hotspots for the 4 Product Cards in the home grid */}
              {/* Product 1: Kaali-Peeli */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '0%', top: '12.4%', width: '25%', height: '5.2%' }}
                onClick={() => setCurrentPage('product')}
                title="Kaali - Peeli Taxi"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400/50 transition-all flex items-end justify-between p-4">
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold bg-black text-white px-2.5 py-1 rounded-full uppercase">
                    View PDP
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[0])
                    }}
                    className="w-9 h-9 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product 2: Konkan Ghats */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '25%', top: '12.4%', width: '25%', height: '5.2%' }}
                onClick={() => setCurrentPage('collections')}
                title="Konkan Ghats Mini Vans"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400/50 transition-all flex items-end justify-between p-4">
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold bg-black text-white px-2.5 py-1 rounded-full uppercase">
                    View Series
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[1])
                    }}
                    className="w-9 h-9 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product 3: Bombay Dreams */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '50%', top: '12.4%', width: '25%', height: '5.2%' }}
                onClick={() => setCurrentPage('collections')}
                title="Bombay Dreams Sedan"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400/50 transition-all flex items-end justify-between p-4">
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold bg-black text-white px-2.5 py-1 rounded-full uppercase">
                    View Series
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[2])
                    }}
                    className="w-9 h-9 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product 4: Retro Rohtak */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '75%', top: '12.4%', width: '25%', height: '5.2%' }}
                onClick={() => setCurrentPage('collections')}
                title="Retro Rohtak Sedan"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400/50 transition-all flex items-end justify-between p-4">
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold bg-black text-white px-2.5 py-1 rounded-full uppercase">
                    View Series
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[3])
                    }}
                    className="w-9 h-9 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Philosophy Anchor Point */}
              <div id="ps-philosophy" className="absolute" style={{ top: '45%' }} />
            </div>
          </div>
        )}

        {/* ===================== VIEW 2: SHOP ALL CATALOG ===================== */}
        {currentPage === 'shop' && (
          <div className="w-full flex flex-col items-center">
            {/* Sub-header Filter Tabs */}
            <div className="w-full max-w-[1920px] bg-neutral-100 border-b border-black/10 px-4 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  Catalog View:
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage('shop')}
                  className="px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase"
                >
                  Full Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('collections')}
                  className="px-3 py-1 rounded-full bg-white text-black hover:bg-neutral-200 border border-black/20 text-xs font-bold uppercase"
                >
                  Series 01 Grid
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <span>Showing 4 Series 01 Vehicle Models</span>
                <span>• All Handcrafted in Steam Beech & Teak</span>
              </div>
            </div>

            <div className="relative w-full max-w-[1920px] mx-auto select-none">
              <img
                src="/playstaples-pt2/shop_all_full.webp"
                alt="PlayStaples Shop All Catalog"
                className="w-full h-auto block select-none pointer-events-none"
              />

              {/* Interactive Hotspot to switch to Collections */}
              <div
                onClick={() => setCurrentPage('collections')}
                className="absolute cursor-pointer group"
                style={{ left: '0%', top: '5%', width: '100%', height: '40%' }}
                title="View Indian Terrain Vehicles Collection"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs font-bold uppercase px-4 py-2 rounded-full shadow-xl">
                    Click to Open Series 01 Grid ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW 3: COLLECTIONS / SERIES 01 ===================== */}
        {currentPage === 'collections' && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-[1920px] bg-neutral-100 border-b border-black/10 px-4 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage('shop')}
                  className="p-1.5 rounded-full hover:bg-white text-black transition-colors"
                  title="Back to Shop All"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  Series 01 — Indian Terrain Vehicles
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                Click any car to open its full 360° Product Page
              </span>
            </div>

            <div className="relative w-full max-w-[1920px] mx-auto select-none">
              <img
                src="/playstaples-pt2/shop_collections_full.webp"
                alt="PlayStaples Series 01 Indian Terrain Vehicles"
                className="w-full h-auto block select-none pointer-events-none"
              />

              {/* 4 Interactive Columns for Series 01 Grid */}
              {/* Col 1: Kaali-Peeli */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '0%', top: '5.5%', width: '25%', height: '17%' }}
                onClick={() => setCurrentPage('product')}
                title="Kaali - Peeli (₹1,850)"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400 transition-all flex items-end justify-between p-6">
                  <span className="opacity-0 group-hover:opacity-100 text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase shadow">
                    Open PDP ↗
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[0])
                    }}
                    className="w-11 h-11 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
                    title="Add Kaali-Peeli to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Col 2: Konkan Ghats */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '25%', top: '5.5%', width: '25%', height: '17%' }}
                onClick={() => setCurrentPage('product')}
                title="Konkan Ghats (₹1,850)"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400 transition-all flex items-end justify-between p-6">
                  <span className="opacity-0 group-hover:opacity-100 text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase shadow">
                    Open PDP ↗
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[1])
                    }}
                    className="w-11 h-11 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
                    title="Add Konkan Ghats to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Col 3: Bombay Dreams */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '50%', top: '5.5%', width: '25%', height: '17%' }}
                onClick={() => setCurrentPage('product')}
                title="Bombay Dreams (₹1,850)"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400 transition-all flex items-end justify-between p-6">
                  <span className="opacity-0 group-hover:opacity-100 text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase shadow">
                    Open PDP ↗
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[2])
                    }}
                    className="w-11 h-11 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
                    title="Add Bombay Dreams to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Col 4: Retro Rohtak */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '75%', top: '5.5%', width: '25%', height: '17%' }}
                onClick={() => setCurrentPage('product')}
                title="Retro Rohtak (₹1,850)"
              >
                <div className="w-full h-full border-2 border-transparent group-hover:border-amber-400 transition-all flex items-end justify-between p-6">
                  <span className="opacity-0 group-hover:opacity-100 text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase shadow">
                    Open PDP ↗
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(PLAYSTAPLES_PRODUCTS[3])
                    }}
                    className="w-11 h-11 rounded-full bg-black hover:bg-amber-400 hover:text-black text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
                    title="Add Retro Rohtak to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW 4: PRODUCT DETAIL PAGE (KAALI PEELI PDP) ===================== */}
        {currentPage === 'product' && (
          <div className="w-full flex flex-col items-center">
            {/* Sticky Product Purchase Bar on PDP */}
            <div className="sticky top-[58px] z-30 w-full bg-amber-400 border-b border-black px-4 sm:px-8 py-2.5 flex items-center justify-between flex-wrap gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-black">
                  KAALI - PEELI (Premier Padmini Collectible)
                </span>
                <span className="hidden sm:inline text-xs font-bold text-black/80">
                  • ₹1,850 INR
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center bg-white rounded-full border border-black px-2 py-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setProductQty((prev) => Math.max(1, prev - 1))}
                    className="p-1 hover:text-amber-500 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2.5">{productQty}</span>
                  <button
                    type="button"
                    onClick={() => setProductQty((prev) => prev + 1)}
                    className="p-1 hover:text-amber-500 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(PLAYSTAPLES_PRODUCTS[0], productQty)}
                  className="px-5 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider shadow transition-transform active:scale-95 cursor-pointer"
                >
                  Add to Cart • ₹{(1850 * productQty).toLocaleString()}
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-[1920px] mx-auto select-none">
              <img
                src="/playstaples-pt2/product_full.webp"
                alt="PlayStaples Kaali Peeli Product Detail Page"
                className="w-full h-auto block select-none pointer-events-none"
              />

              {/* Hotspot: Color Swatches on Hero Photography */}
              <div
                className="absolute cursor-pointer flex flex-col gap-2"
                style={{ left: '1.2%', top: '6.4%', width: '2%', height: '5%' }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor('black')
                    showToast('Selected: Stealth Black Taxi')
                  }}
                  className={`w-6 h-6 rounded-full bg-black border-2 transition-transform hover:scale-125 ${
                    selectedColor === 'black' ? 'border-amber-400 scale-110 shadow-md' : 'border-white/60'
                  }`}
                  title="Black Edition"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor('yellow')
                    showToast('Selected: Bombay Yellow & Black Taxi')
                  }}
                  className={`w-6 h-6 rounded-full bg-amber-400 border-2 transition-transform hover:scale-125 ${
                    selectedColor === 'yellow' ? 'border-black scale-110 shadow-md' : 'border-white/60'
                  }`}
                  title="Bombay Yellow Edition"
                />
              </div>

              {/* Hotspot: Write a Review Button on PDP */}
              <div
                onClick={() => setIsReviewModalOpen(true)}
                className="absolute cursor-pointer group"
                style={{ left: '84%', top: '48.5%', width: '9%', height: '1.2%' }}
                title="Write a Customer Review"
              >
                <div className="w-full h-full rounded-full group-hover:bg-amber-400/20 transition-colors" />
              </div>

              {/* Hotspot: Related Products at bottom of PDP */}
              <div
                onClick={() => setCurrentPage('shop')}
                className="absolute cursor-pointer"
                style={{ left: '0%', top: '35%', width: '100%', height: '10%' }}
                title="Explore Other Series 01 Vehicles"
              />
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 5. SLIDE-OVER SHOPPING CART DRAWER                                        */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-black/10 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-black text-black">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-base uppercase tracking-tight text-neutral-900">
                    Your Shopping Bag
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in order
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                title="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Banner */}
            <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free standard insured shipping across India unlocked!</span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-neutral-400">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-3 text-neutral-300" />
                  <p className="font-bold text-sm text-neutral-700">Your bag is empty</p>
                  <p className="text-xs text-neutral-400 mt-1">Explore the handcrafted Series 01 collection!</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false)
                      setCurrentPage('collections')
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-black text-white text-xs font-bold uppercase"
                  >
                    View Vehicles
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-xl border border-black/10 bg-neutral-50/60"
                  >
                    <div className="w-16 h-16 rounded-lg bg-neutral-200 overflow-hidden shrink-0 border border-black/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-xs uppercase tracking-tight text-neutral-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{item.variant}</p>
                      <p className="text-xs font-black text-black mt-1">
                        ₹{item.price.toLocaleString()} INR
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-black/20 rounded-full bg-white px-2 py-0.5 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.id, -1)}
                            className="p-0.5 hover:text-amber-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.id, 1)}
                            className="p-0.5 hover:text-amber-500 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCartItem(item.id)}
                          className="text-[11px] text-red-500 hover:text-red-700 font-semibold cursor-pointer underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            <div className="p-5 border-t border-black/10 bg-neutral-50 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-black text-base font-black">
                  ₹{cartSubtotal.toLocaleString()} INR
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Shipping & Taxes</span>
                <span className="text-emerald-700 font-bold">Free</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast('✓ Simulating checkout order! Thank you for testing PlayStaples PT2.')
                }}
                disabled={cart.length === 0}
                className="w-full py-3 rounded-full bg-black hover:bg-neutral-800 disabled:bg-neutral-300 text-white font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-neutral-400 font-medium">
                Prototype demonstration of the PlayStaples website redesign.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. WRITE A REVIEW MODAL                                                   */}
      {/* ========================================================================= */}
      {isReviewModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4 border border-black/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div>
                <h3 className="font-black text-base uppercase text-neutral-900">
                  Write a Review
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  Kaali - Peeli Handcrafted Collectible
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-3" />
                </div>
                <h4 className="font-black text-base text-neutral-900">Thank You for Your Feedback!</h4>
                <p className="text-xs text-neutral-500">
                  Your review has been verified and added to the Kaali Peeli product testimonials.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReviewSubmitted(false)
                    setIsReviewModalOpen(false)
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-bold uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setReviewSubmitted(true)
                  showToast('✓ Review submitted successfully!')
                }}
                className="space-y-4 text-xs font-medium"
              >
                <div>
                  <label className="block font-bold text-neutral-700 uppercase mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewStars(star)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewStars ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-neutral-600 ml-2">
                      {reviewStars} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Om Biswas / Collector"
                    className="w-full px-3 py-2 rounded-lg border border-black/20 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase mb-1">
                    Review Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="What did you love about the wood finish, magnetic roof carrier, or packaging?"
                    className="w-full px-3 py-2 rounded-lg border border-black/20 outline-none focus:border-black resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-black/20 text-neutral-700 hover:bg-neutral-100 font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-wide shadow"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TOAST FEEDBACK NOTIFICATION                                            */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-4 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
