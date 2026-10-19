import React, { useState, useRef, useEffect } from 'react'
import ThreeUISketchbookViewer from './ThreeUISketchbookViewer'
import sketchbookFace from '../assets/sketchbook-face.png'
import sketchbookFlowerSticker from '../assets/sketchbook-flower-sticker.png'
import sketchbookCatSticker from '../assets/sketchbook-cat-sticker.png'
import sketchbookHydrantSticker from '../assets/sketchbook-hydrant-sticker.png'
import sketchbookElementsSprite from '../assets/sketchbook-elements-sprite.png'
import sketchbookStopSignSticker from '../assets/sketchbook-stop-sign-sticker.png'
import sketchbookQuoteStickers from '../assets/sketchbook-quote-stickers.png'
import sketchbookThisIsArt from '../assets/sketchbook-this-is-art.svg'

const PDF_PAGE_NUMBERS = Array.from({ length: 87 }, (_, index) => index + 1)
  .filter((pageNumber) => pageNumber !== 31 && pageNumber !== 32)

const PDF_SKETCH_SPREADS = Array.from({ length: Math.ceil(PDF_PAGE_NUMBERS.length / 2) }, (_, index) => {
  const pagesInSpread = PDF_PAGE_NUMBERS.slice(index * 2, index * 2 + 2)
  const pageRange = pagesInSpread.length === 1
    ? `${pagesInSpread[0]}`
    : `${pagesInSpread[0]}-${pagesInSpread[pagesInSpread.length - 1]}`

  return {
    url: `/assets/sketchbook/om-paya-${String(index + 1).padStart(2, '0')}.jpg`,
    title: `Sketchbook spread ${pageRange}`
  }
})

const STICKER_LIBRARY = [
  { id: 'flower', label: 'Red flower', src: sketchbookFlowerSticker, width: 36, height: 48, x: 58, y: 4, background: '#fff' },
  { id: 'stop-sign', label: 'Stop sign', src: sketchbookStopSignSticker, width: 47, height: 55, x: 54, y: 36 },
  { id: 'trash-can', label: 'Purple trash can', sprite: true, width: 35, height: 20, x: 7, y: 5, rotation: -30, flipX: true },
  { id: 'cat', label: 'White cat', src: sketchbookCatSticker, width: 34, height: 34, x: 56, y: 64, rotation: 40 },
  { id: 'hydrant', label: 'Yellow hydrant', src: sketchbookHydrantSticker, width: 43, height: 48, x: 4, y: 31 },
  { id: 'not-art', label: 'This is not art', sprite: true, spritePosition: '0% 0%', width: 28, height: 32, x: 20, y: 25, rotation: -6, spriteSource: sketchbookQuoteStickers },
  { id: 'this-is-art', label: 'This is art', src: sketchbookThisIsArt, width: 24, height: 13, x: 39, y: 47, rotation: 4 },
  { id: 'think-big', label: 'Think big', sprite: true, spritePosition: '0% 100%', width: 32, height: 28, x: 56, y: 22, rotation: 5, spriteSource: sketchbookQuoteStickers },
  { id: 'jpeg', label: 'JPEG', sprite: true, spritePosition: '100% 100%', width: 20, height: 22, x: 69, y: 66, rotation: -8, spriteSource: sketchbookQuoteStickers },
]

const STICKER_PRESETS_BY_ID = Object.fromEntries(STICKER_LIBRARY.map((sticker) => [sticker.id, sticker]))
const DEFAULT_COVER_STICKERS = [
  { ...STICKER_PRESETS_BY_ID['think-big'], x: -5, y: -5, width: 53, height: 39, rotation: -38 },
  { ...STICKER_PRESETS_BY_ID['this-is-art'], x: 3, y: 11, width: 41, rotation: -37 },
  { ...STICKER_PRESETS_BY_ID.flower, x: 44, y: 1.3, width: 54, rotation: 0 },
  { ...STICKER_PRESETS_BY_ID.hydrant, x: 0, y: 40, width: 25, rotation: 20 },
  { ...STICKER_PRESETS_BY_ID.jpeg, x: 3, y: 66, width: 44, height: 40, rotation: -14 },
  { ...STICKER_PRESETS_BY_ID.cat, x: 8, y: 36, width: 50, rotation: 0 },
  { ...STICKER_PRESETS_BY_ID['stop-sign'], x: 31, y: 15, width: 85, rotation: 0 },
]
const STICKER_LAYOUT_STORAGE_KEY = 'sketchbook-cover-stickers-v8'
const STICKER_LAYOUT_VERSION = 8

const makeSticker = (preset, overrides = {}) => ({
  ...preset,
  id: `sticker-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  layoutVersion: STICKER_LAYOUT_VERSION,
  crop: 0,
  ...overrides,
})

const loadStickerLayout = () => {
  if (typeof window === 'undefined') return DEFAULT_COVER_STICKERS.map((preset) => makeSticker(preset))

  try {
    const savedLayout = window.localStorage.getItem(STICKER_LAYOUT_STORAGE_KEY)
    if (!savedLayout) return DEFAULT_COVER_STICKERS.map((preset) => makeSticker(preset))

    const stickers = JSON.parse(savedLayout)
    if (!Array.isArray(stickers) || stickers.some((sticker) => (
      !sticker || sticker.layoutVersion !== STICKER_LAYOUT_VERSION
      || typeof sticker.id !== 'string' || typeof sticker.label !== 'string'
      || !Number.isFinite(sticker.x) || !Number.isFinite(sticker.y)
      || !Number.isFinite(sticker.width) || sticker.width <= 0
    ))) {
      return DEFAULT_COVER_STICKERS.map((preset) => makeSticker(preset))
    }

    return stickers
  } catch {
    return DEFAULT_COVER_STICKERS.map((preset) => makeSticker(preset))
  }
}

export default function PaperStoreSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditingStickers, setIsEditingStickers] = useState(false)
  const [stickers, setStickers] = useState(loadStickerLayout)
  const [selectedStickerId, setSelectedStickerId] = useState(null)
  const [clipboardSticker, setClipboardSticker] = useState(null)
  const [removeBgTolerance, setRemoveBgTolerance] = useState(55)
  const [removeBgMessage, setRemoveBgMessage] = useState('')
  const spreadPages = PDF_SKETCH_SPREADS

  // 3D tilt tracking for closed cover
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const coverRef = useRef(null)
  const stickerDragRef = useRef(null)
  const hasLoadedStickerLayoutRef = useRef(false)

  useEffect(() => {
    if (stickers.some((sticker) => sticker.layoutVersion !== STICKER_LAYOUT_VERSION)) {
      setStickers(DEFAULT_COVER_STICKERS.map((preset) => makeSticker(preset)))
      return
    }

    if (!hasLoadedStickerLayoutRef.current) {
      hasLoadedStickerLayoutRef.current = true
      return
    }

    try {
      window.localStorage.setItem(STICKER_LAYOUT_STORAGE_KEY, JSON.stringify(stickers))
    } catch (error) {
      console.warn('Could not save the sketchbook sticker layout in this browser.', error)
    }
  }, [stickers])

  const selectedSticker = stickers.find((sticker) => sticker.id === selectedStickerId) ?? null

  const addSticker = (preset, overrides = {}) => {
    const stickerWidth = overrides.width ?? preset.width
    const sticker = makeSticker(preset, {
      ...overrides,
      ...(preset.height && !overrides.height
        ? { height: preset.height * (stickerWidth / preset.width) }
        : {}),
    })
    setStickers((current) => [...current, sticker])
    setSelectedStickerId(sticker.id)
    setIsEditingStickers(true)
  }

  const updateSelectedSticker = (updates) => {
    if (!selectedStickerId) return
    setStickers((current) => current.map((sticker) =>
      sticker.id === selectedStickerId
        ? {
            ...sticker,
            ...updates,
            ...(updates.width && sticker.height
              ? { height: sticker.height * (updates.width / sticker.width) }
              : {}),
          }
        : sticker
    ))
  }

  const handleStickerPointerDown = (event, sticker) => {
    if (!isEditingStickers || !coverRef.current) return
    event.preventDefault()
    event.stopPropagation()
    setSelectedStickerId(sticker.id)
    stickerDragRef.current = {
      id: sticker.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      stickerX: sticker.x,
      stickerY: sticker.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleStickerPointerMove = (event) => {
    const drag = stickerDragRef.current
    const cover = coverRef.current
    if (!drag || !cover || drag.pointerId !== event.pointerId) return
    const bounds = cover.getBoundingClientRect()
    const deltaX = ((event.clientX - drag.startX) / bounds.width) * 100
    const deltaY = ((event.clientY - drag.startY) / bounds.height) * 100
    setStickers((current) => current.map((sticker) => sticker.id === drag.id
      ? {
          ...sticker,
          x: Math.max(8 - sticker.width, Math.min(99, drag.stickerX + deltaX)),
          y: Math.max(8 - (sticker.height ?? sticker.width), Math.min(99, drag.stickerY + deltaY)),
        }
      : sticker
    ))
  }

  const finishStickerDrag = (event) => {
    if (stickerDragRef.current?.pointerId === event.pointerId) stickerDragRef.current = null
  }

  const copySelectedSticker = () => {
    if (selectedSticker) setClipboardSticker({ ...selectedSticker })
  }

  const pasteSticker = () => {
    if (!clipboardSticker) return
    const sticker = makeSticker(clipboardSticker, {
      x: Math.min(clipboardSticker.x + 6, 100 - clipboardSticker.width),
      y: Math.min(clipboardSticker.y + 6, 90),
    })
    setStickers((current) => [...current, sticker])
    setSelectedStickerId(sticker.id)
    setIsEditingStickers(true)
  }

  const uploadSticker = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => addSticker({
      id: 'uploaded',
      label: file.name.replace(/\.[^.]+$/, '') || 'Uploaded sticker',
      src: String(reader.result),
      width: 28,
      x: 34,
      y: 35,
    })
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const removeSelectedBackground = () => {
    if (!selectedSticker?.src) return
    setRemoveBgMessage('Removing background…')
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, 1800 / Math.max(image.naturalWidth, image.naturalHeight))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        setRemoveBgMessage('Could not process this image.')
        return
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const { data, width, height } = imageData
      const cornerIndices = [0, width - 1, (height - 1) * width, height * width - 1]
      const corners = cornerIndices
        .map((pixel) => pixel * 4)
        .filter((index) => data[index + 3] > 16)
      if (!corners.length) {
        setRemoveBgMessage('This sticker already has a transparent background.')
        return
      }

      const background = [0, 0, 0]
      corners.forEach((index) => {
        background[0] += data[index]
        background[1] += data[index + 1]
        background[2] += data[index + 2]
      })
      background.forEach((_, channel) => { background[channel] /= corners.length })

      const pixelCount = width * height
      const visited = new Uint8Array(pixelCount)
      const queue = new Int32Array(pixelCount)
      let head = 0
      let tail = 0
      const addIfBackground = (pixel) => {
        if (pixel < 0 || pixel >= pixelCount || visited[pixel]) return
        const index = pixel * 4
        if (data[index + 3] <= 16) {
          visited[pixel] = 1
          return
        }
        const difference = Math.max(
          Math.abs(data[index] - background[0]),
          Math.abs(data[index + 1] - background[1]),
          Math.abs(data[index + 2] - background[2]),
        )
        if (difference <= removeBgTolerance) {
          visited[pixel] = 1
          queue[tail++] = pixel
        }
      }

      for (let x = 0; x < width; x += 1) {
        addIfBackground(x)
        addIfBackground((height - 1) * width + x)
      }
      for (let y = 1; y < height - 1; y += 1) {
        addIfBackground(y * width)
        addIfBackground(y * width + width - 1)
      }

      while (head < tail) {
        const pixel = queue[head++]
        data[pixel * 4 + 3] = 0
        const x = pixel % width
        if (x > 0) addIfBackground(pixel - 1)
        if (x < width - 1) addIfBackground(pixel + 1)
        if (pixel >= width) addIfBackground(pixel - width)
        if (pixel + width < pixelCount) addIfBackground(pixel + width)
      }

      context.putImageData(imageData, 0, 0)
      setStickers((current) => current.map((sticker) => sticker.id === selectedStickerId
        ? { ...sticker, src: canvas.toDataURL('image/png'), background: undefined }
        : sticker
      ))
      setRemoveBgMessage('Background removed. Increase the tolerance if an edge remains.')
    }
    image.onerror = () => setRemoveBgMessage('Could not load this image for background removal.')
    image.src = selectedSticker.src
  }

  const handleMouseMove = (e) => {
    if (isOpen || isEditingStickers || !coverRef.current) return
    const rect = coverRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Limit tilt range between -12 and +12 degrees
    const rotateY = (x / (rect.width / 2)) * 12
    const rotateX = -(y / (rect.height / 2)) * 12
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section
      id="sketchbook"
      data-theme="light"
      className="w-full relative pt-14 sm:pt-24 md:pt-28 pb-12 sm:pb-24 px-2 xs:px-4 sm:px-8 overflow-hidden select-none flex flex-col items-center justify-between min-h-[580px] xs:min-h-[640px] sm:min-h-[760px] md:min-h-[920px] ca-dotted-grid-bg text-neutral-900 border-b-4 border-black transition-colors duration-500"
    >
      {/* FEATURED WORKS DOTTED GRID CANVAS PATTERN */}
      <div className="ca-dotted-grid-pattern" aria-hidden="true" />

      {/* SECTION HEADER: "I ALSO SKETCH" IN SAME FONT & STYLE AS FEATURED WORKS */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center mb-8 sm:mb-12">
        <div className="flex flex-col items-center">
          <div className="font-myfont text-3xl sm:text-4xl text-neutral-800 font-medium tracking-wide flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem] lowercase">
            explore my notebook!
          </div>
          <svg viewBox="0 0 64 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="mt-1 h-3.5 w-24 sm:w-28 text-[#E84A4A]">
            <path d="M3 4c18-3 40-3 58 0" />
            <path d="M9 9c14-2.5 32-2.5 46 0" />
          </svg>
        </div>
        <div className="mt-6 flex w-full items-center justify-center gap-0">
          <h2 className="font-akira text-[26px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-neutral-950 uppercase font-black text-center">
            I ALSO SKETCH
          </h2>
          <div className="shrink-0 animate-float-gentle">
            <img
              src={sketchbookFace}
              alt=""
              aria-hidden="true"
              className="w-[75px] h-[75px] xs:w-[90px] xs:h-[90px] sm:w-[132px] sm:h-[132px] md:w-[165px] md:h-[165px] object-contain rotate-[15.6deg]"
            />
          </div>
        </div>
      </div>

      {/* CENTER STAGE: THE 3D MOLESKINE NOTEBOOK */}
      <div className="my-auto py-4 sm:py-10 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl xl:max-w-none">
        {!isOpen ? (
          /* ================= CLOSED NOTEBOOK ================= */
          <div className="flex flex-col items-center gap-4 xl:grid xl:w-full xl:grid-cols-[minmax(0,1fr)_560px_minmax(0,1fr)] xl:items-start xl:gap-6">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => { if (!isEditingStickers) setIsOpen(true) }}
            className={`relative xl:col-start-2 xl:row-start-1 xl:justify-self-center ${isEditingStickers ? 'cursor-default' : 'cursor-pointer'} transition-transform duration-200 ease-out group`}
            data-sketchbook-cover="true"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* AMBIENT DROP SHADOW BENEATH THE FLOATING BOOK */}
            <div
              className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-12 sm:h-16 bg-neutral-950/35 blur-2xl rounded-full pointer-events-none transition-all duration-300 group-hover:scale-105 group-hover:bg-neutral-950/45"
            />

            {/* THE TACTILE MOLESKINE BOOK COVER */}
            <div
              ref={coverRef}
              className="relative w-[195px] xs:w-[225px] sm:w-[380px] md:w-[560px] h-[275px] xs:h-[315px] sm:h-[530px] md:h-[760px] bg-[#222226] rounded-r-[20px] xs:rounded-r-[24px] sm:rounded-r-[30px] rounded-l-[4px] border border-neutral-800/80 overflow-hidden transition-all duration-300 group-hover:shadow-[0_45px_85px_-15px_rgba(0,0,0,0.45)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* SPECULAR SHEEN LIGHTING ON COVER */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)`
                }}
              />

              {stickers.map((sticker) => (
                <div
                  key={sticker.id}
                  aria-hidden="true"
                  onPointerDown={(event) => handleStickerPointerDown(event, sticker)}
                  onPointerMove={handleStickerPointerMove}
                  onPointerUp={finishStickerDrag}
                  onPointerCancel={finishStickerDrag}
                  onClick={(event) => {
                    event.stopPropagation()
                    if (isEditingStickers) setSelectedStickerId(sticker.id)
                  }}
                  className={`absolute top-0 left-0 ${isEditingStickers ? 'cursor-move touch-none' : 'pointer-events-none'} ${selectedStickerId === sticker.id && isEditingStickers ? 'z-30 outline outline-1 outline-dashed outline-white' : 'z-10'}`}
                  style={{
                    left: `${sticker.x}%`,
                    top: `${sticker.y}%`,
                    width: `${sticker.width}%`,
                    height: sticker.sprite ? `${sticker.height}%` : undefined,
                    transform: `rotate(${sticker.rotation ?? 0}deg) scaleX(${sticker.flipX ? -1 : 1})`,
                    transformOrigin: 'center',
                    backgroundImage: sticker.sprite ? `url(${sticker.spriteSource ?? sketchbookElementsSprite})` : undefined,
                    backgroundSize: sticker.sprite ? '200% 200%' : undefined,
                    backgroundPosition: sticker.sprite ? (sticker.spritePosition ?? '100% 0%') : undefined,
                    backgroundRepeat: sticker.sprite ? 'no-repeat' : undefined,
                    clipPath: sticker.sprite ? `inset(${sticker.crop ?? 0}%)` : undefined,
                  }}
                >
                  {sticker.src && (
                    <img
                      src={sticker.src}
                      alt=""
                      draggable="false"
                      className="block h-auto w-full select-none object-contain"
                      style={{
                        background: sticker.background,
                        clipPath: `inset(${sticker.crop ?? 0}%)`,
                      }}
                    />
                  )}
                </div>
              ))}

              {/* LEFT SPINE BINDING TAPE */}
              <div className="absolute top-0 bottom-0 left-0 w-[28px] xs:w-[34px] sm:w-[48px] bg-[#16161A] border-r border-black/60 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.5)] flex flex-col justify-between py-4 sm:py-6">
                <div className="w-full h-6 sm:h-8 border-b border-black/30" />
                <div className="w-full h-6 sm:h-8 border-t border-black/30" />
              </div>

              {/* COVER RIGHT EDGE SUBTLE EMBOSS / CREASE */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />

              {/* CENTER "CLICK TO OPEN" BADGE - FONT MYFONT, NO ICON */}
              <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${isEditingStickers ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="px-4 xs:px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/25 text-white font-fredoka font-semibold text-xl xs:text-2xl sm:text-3xl tracking-wide shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform lowercase">
                  <span>click to open</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden max-h-[calc(100vh-180px)] w-full shrink-0 overflow-y-auto rounded-2xl border border-neutral-900/15 bg-white/90 p-3 shadow-lg backdrop-blur-sm sm:p-4 xl:sticky xl:top-24 xl:col-start-3 xl:row-start-1 xl:block xl:w-[300px] xl:justify-self-end"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm text-neutral-900">Sticker studio</p>
                <p className="text-xs text-neutral-600">Add, drag, resize, crop, and duplicate stickers. Your layout saves automatically in this browser.</p>
                <p className="mt-1 text-xs text-neutral-500">Parts beyond the cover edge are clipped.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditingStickers((editing) => !editing)
                  setSelectedStickerId(null)
                }}
                className="shrink-0 rounded-full bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-neutral-700"
              >
                {isEditingStickers ? 'Done' : 'Edit cover'}
              </button>
            </div>

            {isEditingStickers && (
              <div className="mt-3 space-y-3 border-t border-neutral-200 pt-3">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Add a sticker</p>
                  <div className="flex flex-wrap gap-2 pb-1">
                  {STICKER_LIBRARY.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => addSticker(preset, {
                        x: 34,
                        y: 34,
                        width: Math.min(preset.width, 34),
                        ...(preset.sprite ? { height: 20 } : {}),
                      })}
                      className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-xs text-neutral-800 transition hover:border-neutral-500 hover:bg-neutral-50"
                    >
                      + {preset.label}
                    </button>
                  ))}
                  <label className="cursor-pointer rounded-lg border border-dashed border-neutral-400 bg-white px-2.5 py-2 text-xs text-neutral-800 transition hover:bg-neutral-50">
                    Upload image
                    <input type="file" accept="image/*" className="sr-only" onChange={uploadSticker} />
                  </label>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Stickers on cover</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stickers.map((sticker) => (
                      <button
                        key={sticker.id}
                        type="button"
                        onClick={() => setSelectedStickerId(sticker.id)}
                        className={`rounded-full border px-2.5 py-1 text-[11px] transition ${selectedStickerId === sticker.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-600'}`}
                      >
                        {sticker.label}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSticker ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end xl:grid-cols-1">
                    <p className="text-xs font-semibold text-neutral-900 sm:col-span-3 xl:col-span-1">Editing: {selectedSticker.label}</p>
                    <div className="grid grid-cols-2 gap-2 sm:col-span-3 xl:col-span-1">
                      <label className="flex flex-col gap-1 text-xs text-neutral-700">
                        <span className="flex justify-between"><span>Position X / left</span><span>{Math.round(selectedSticker.x)}%</span></span>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          step="1"
                          value={selectedSticker.x}
                          onChange={(event) => updateSelectedSticker({ x: Number(event.target.value) })}
                          className="w-full accent-neutral-900"
                          aria-label={`${selectedSticker.label} horizontal position`}
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-neutral-700">
                        <span className="flex justify-between"><span>Position Y / top</span><span>{Math.round(selectedSticker.y)}%</span></span>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          step="1"
                          value={selectedSticker.y}
                          onChange={(event) => updateSelectedSticker({ y: Number(event.target.value) })}
                          className="w-full accent-neutral-900"
                          aria-label={`${selectedSticker.label} vertical position`}
                        />
                      </label>
                      <p className="col-span-2 text-[10px] text-neutral-500">Positions are percentages from the top-left corner of the cover.</p>
                    </div>
                    <label className="flex flex-col gap-1 text-xs text-neutral-700">
                      <span className="flex justify-between"><span>Size</span><span>{Math.round(selectedSticker.width)}%</span></span>
                      <input
                        type="range"
                        min="8"
                        max="85"
                        value={selectedSticker.width}
                        onChange={(event) => updateSelectedSticker({ width: Number(event.target.value) })}
                        className="w-full accent-neutral-900"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-neutral-700">
                      <span className="flex justify-between"><span>Crop</span><span>{selectedSticker.crop ?? 0}%</span></span>
                      <input
                        type="range"
                        min="0"
                        max="35"
                        value={selectedSticker.crop ?? 0}
                        onChange={(event) => updateSelectedSticker({ crop: Number(event.target.value) })}
                        className="w-full accent-neutral-900"
                      />
                    </label>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={copySelectedSticker} className="rounded-lg border border-neutral-300 px-2.5 py-2 text-xs hover:bg-neutral-100">Copy</button>
                      <button type="button" onClick={pasteSticker} disabled={!clipboardSticker} className="rounded-lg border border-neutral-300 px-2.5 py-2 text-xs enabled:hover:bg-neutral-100 disabled:opacity-40">Paste</button>
                      <button
                        type="button"
                        onClick={() => {
                          setStickers((current) => current.filter((sticker) => sticker.id !== selectedStickerId))
                          setSelectedStickerId(null)
                        }}
                        className="rounded-lg border border-red-200 px-2.5 py-2 text-xs text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                    <label className="flex flex-col gap-1 text-xs text-neutral-700 sm:col-span-2 xl:col-span-1">
                      <span className="flex justify-between"><span>Tilt</span><span>{selectedSticker.rotation ?? 0}°</span></span>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={selectedSticker.rotation ?? 0}
                        onChange={(event) => updateSelectedSticker({ rotation: Number(event.target.value) })}
                        className="w-full accent-neutral-900"
                      />
                    </label>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:col-span-3 xl:col-span-1">
                      <button
                        type="button"
                        onClick={removeSelectedBackground}
                        disabled={!selectedSticker.src}
                        className="rounded-lg border border-neutral-300 px-2.5 py-2 text-xs enabled:hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Remove background
                      </button>
                      <label className="flex min-w-[150px] flex-1 items-center gap-2 text-xs text-neutral-700">
                        Tolerance
                        <input
                          type="range"
                          min="15"
                          max="120"
                          value={removeBgTolerance}
                          onChange={(event) => setRemoveBgTolerance(Number(event.target.value))}
                          className="min-w-0 flex-1 accent-neutral-900"
                        />
                        <span className="w-7 text-right">{removeBgTolerance}</span>
                      </label>
                    </div>
                    {removeBgMessage && <p className="text-xs text-neutral-500 sm:col-span-3 xl:col-span-1">{removeBgMessage}</p>}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500">Select a sticker on the cover to edit it, or add one from the tray.</p>
                )}
              </div>
            )}
          </div>
          </div>
        ) : (
          /* ================= OPEN THREEUI 3D SKETCHBOOK SPREAD ================= */
          <div className="w-full max-w-6xl relative">
            <ThreeUISketchbookViewer
              pages={spreadPages}
              onClose={() => setIsOpen(false)}
              autoRiffle={false}
            />
          </div>
        )}
      </div>
    </section>
  )
}

