"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { Sparkles, Leaf } from "lucide-react"

type ImageValue = string | { src?: string; alt?: string } | null | undefined

type ImageInput = ImageValue | { image?: ImageValue; offsetY?: number; label?: string; category?: string }

interface Slide {
    src: string | null
    offsetY: number
    label?: string
    category?: string
}

export interface SmoothScrollSliderProps {
    images?: ImageInput[]

    slideWidth?: number
    slideHeight?: number

    spacing?: number
    direction?: "right" | "left"

    smoothness?: number

    radius?: number
    dim?: number
    background?: string

    sensitivity?: number
    loop?: boolean
    style?: CSSProperties
}

const PLACEHOLDER_COUNT = 8

const MAX_SCALE = 2.5
const MIN_SCALE = 0.1

function wrap(value: number, span: number): number {
    return ((value % span) + span) % span
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

function resolveSrc(value: ImageValue): string | null {
    if (!value) return null
    if (typeof value === "string") return value || null
    const src = value.src
    return typeof src === "string" && src ? src : null
}

function imageOf(item: ImageInput): string | null {
    if (item && typeof item === "object" && "image" in item)
        return resolveSrc(item.image)
    return resolveSrc(item as ImageValue)
}

function offsetOf(item: ImageInput): number {
    if (item && typeof item === "object" && "offsetY" in item) {
        const offset = item.offsetY
        return typeof offset === "number" && isFinite(offset) ? offset : 0
    }
    return 0
}

function labelOf(item: ImageInput): string {
    if (item && typeof item === "object" && "label" in item && typeof item.label === "string") {
        return item.label
    }
    return "Nandi Farms"
}

function categoryOf(item: ImageInput): string {
    if (item && typeof item === "object" && "category" in item && typeof item.category === "string") {
        return item.category
    }
    return "Farm Fresh"
}

function placeholderFill(index: number): string {
    const hue = (index * 47 + 210) % 360
    return `linear-gradient(150deg, hsl(${hue} 42% 34%), hsl(${
        (hue + 45) % 360
    } 55% 10%))`
}

interface Frame {
    count: number
    step: number
    slideWidth: number
    width: number
    ease: number
    maxScale: number
    minScale: number
    dim: number
    loop: boolean
    flip: boolean
}

function __OriginkitBase_SmoothScrollSlider({
    images = [
        {
            image: { alt: "Fresh Vegetables", src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80" },
            offsetY: 0,
            label: "Fresh Vegetables",
            category: "100% Organic Produce"
        },
        {
            image: { alt: "Fresh Fruits & Organic Herbs", src: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80" },
            offsetY: 0,
            label: "Fresh Fruits & Herbs",
            category: "Garden Harvest"
        },
        {
            image: { alt: "Exotic Produce", src: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=80" },
            offsetY: 0,
            label: "Exotic Produce",
            category: "Farm Fresh"
        },
        {
            image: { alt: "Premium Basmati Rice", src: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80" },
            offsetY: 0,
            label: "Premium Rice",
            category: "Aromatic Grains"
        },
        {
            image: { alt: "Farm Fresh Eggs", src: "/eggs-category.png" },
            offsetY: 0,
            label: "Farm Fresh Eggs",
            category: "Dairy & Essentials"
        },
        {
            image: { alt: "Karam Podulu", src: "/karam-podulu.png" },
            offsetY: 0,
            label: "Karam Podulu",
            category: "Traditional Spices"
        },
        {
            image: { alt: "Traditional Sweets", src: "/gulab-jamun.png" },
            offsetY: 0,
            label: "Sweets",
            category: "Gulab Jamun Box"
        },
        {
            image: { alt: "Motichoor Ladoo", src: "/motichoor-ladoo.png" },
            offsetY: 0,
            label: "Motichoor Ladoo",
            category: "Festive Sweets"
        },
        {
            image: { alt: "Nandi Farms Direct", src: "/pooja-needs.png" },
            offsetY: 0,
            label: "Pooja Needs",
            category: "Sacred Essentials"
        },
        {
            image: { alt: "Ravva", src: "/ravva.png" },
            offsetY: 0,
            label: "Bombay Ravva",
            category: "Whole Grains"
        }
    ],
    slideWidth = 320,
    slideHeight = 360,
    spacing = 2,
    direction = "right",
    smoothness = 10,
    radius = 24,
    dim = 6,
    background = "transparent",
    sensitivity = 5,
    loop = true,
    style,
}: SmoothScrollSliderProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const nodes = useRef<(HTMLDivElement | null)[]>([])
    const target = useRef(0)
    const current = useRef(0)
    const [width, setWidth] = useState(0)

    const source = useMemo<Slide[]>(() => {
        const resolved: Slide[] = []
        for (const item of images ?? []) {
            const src = imageOf(item)
            if (src) resolved.push({ 
                src, 
                offsetY: offsetOf(item),
                label: labelOf(item),
                category: categoryOf(item)
            })
        }
        return resolved.length
            ? resolved
            : Array.from({ length: PLACEHOLDER_COUNT }, () => ({
                  src: null,
                  offsetY: 0,
                  label: "Nandi Farms",
                  category: "Fresh"
              }))
    }, [images])

    const step = slideWidth + clamp(spacing, 0, 10) * 20
    const ease = 0.15 - (clamp(smoothness, 0, 10) / 10) * 0.13
    const dimAmount = (clamp(dim, 0, 10) / 10) * 0.85
    const wheelMultiplier = 0.4 + (clamp(sensitivity, 0, 10) / 10) * 1.2
    const dragMultiplier = 0.6 + (clamp(sensitivity, 0, 10) / 10) * 1.8

    const flip = direction === "left"

    const repeats = useMemo(() => {
        if (!loop || width <= 0 || step <= 0) return 1
        return Math.max(1, Math.ceil((width + step * 2) / (source.length * step)))
    }, [loop, width, step, source.length])

    const slides = useMemo(() => {
        const out: Slide[] = []
        for (let r = 0; r < repeats; r += 1) out.push(...source)
        return out
    }, [source, repeats])

    const frame = useRef<Frame>({
        count: 0,
        step: 0,
        slideWidth: 0,
        width: 0,
        ease: 0.075,
        maxScale: MAX_SCALE,
        minScale: MIN_SCALE,
        dim: 0,
        loop: true,
        flip: false,
    })
    frame.current = {
        count: slides.length,
        step,
        slideWidth,
        width,
        ease,
        maxScale: MAX_SCALE,
        minScale: MIN_SCALE,
        dim: dimAmount,
        loop,
        flip,
    }

    const input = useRef({ wheelMultiplier, dragMultiplier, flip })
    input.current = { wheelMultiplier, dragMultiplier, flip }

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width)
        })
        observer.observe(node)
        setWidth(node.getBoundingClientRect().width)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        nodes.current.length = slides.length
    }, [slides.length])

    useEffect(() => {
        let raf = 0
        let last = 0

        const tick = (now: number) => {
            raf = requestAnimationFrame(tick)
            const c = frame.current
            const delta = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60
            last = now
            if (!c.count || c.step <= 0 || c.width <= 0) return

            const span = c.count * c.step

            if (c.loop) {
                if (current.current > span || current.current < -span) {
                    const shift = Math.trunc(current.current / span) * span
                    current.current -= shift
                    target.current -= shift
                }
            } else {
                target.current = clamp(target.current, 0, (c.count - 1) * c.step)
            }

            const k = 1 - Math.pow(1 - c.ease, delta * 60)
            current.current += (target.current - current.current) * k

            const pad = (c.width - c.slideWidth) / 2
            const half = c.width / 2

            for (let i = 0; i < c.count; i += 1) {
                const node = nodes.current[i]
                if (!node) continue

                const raw = i * c.step - current.current + pad

                const x = c.loop ? wrap(raw + c.step, span) - c.step : raw

                const distance = x + c.slideWidth / 2 - half
                let scale: number
                let push: number
                if (distance > 0) {
                    scale = Math.min(c.maxScale, 1 + distance / c.width)

                    push = (scale - 1) * c.slideWidth * 0.75
                } else {
                    scale = Math.max(c.minScale, 1 + distance / c.width)
                    push = 0
                }

                const left = c.flip ? c.width - c.slideWidth - (x + push) : x + push
                node.style.transform = `translate3d(${left}px, -50%, 0) scale(${scale})`

                if (c.dim > 0 && scale < 1) {
                    const t = (1 - scale) / Math.max(0.001, 1 - c.minScale)
                    node.style.filter = `brightness(${1 - t * c.dim})`
                } else {
                    node.style.filter = "none"
                }
            }
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        const onWheel = (event: WheelEvent) => {
            event.preventDefault()
            const dominant =
                Math.abs(event.deltaX) > Math.abs(event.deltaY)
                    ? event.deltaX
                    : event.deltaY
            target.current += dominant * input.current.wheelMultiplier
        }
        node.addEventListener("wheel", onWheel, { passive: false })
        return () => node.removeEventListener("wheel", onWheel)
    }, [])

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        let pointer: number | null = null
        let lastX = 0

        const onDown = (event: PointerEvent) => {
            if (pointer !== null) return
            pointer = event.pointerId
            lastX = event.clientX
            node.setPointerCapture(event.pointerId)
        }
        const onMove = (event: PointerEvent) => {
            if (pointer !== event.pointerId) return
            const dx = event.clientX - lastX
            lastX = event.clientX
            target.current += (input.current.flip ? dx : -dx) * input.current.dragMultiplier
        }
        const onUp = (event: PointerEvent) => {
            if (pointer !== event.pointerId) return
            pointer = null
            if (node.hasPointerCapture(event.pointerId))
                node.releasePointerCapture(event.pointerId)
        }

        node.addEventListener("pointerdown", onDown)
        node.addEventListener("pointermove", onMove)
        node.addEventListener("pointerup", onUp)
        node.addEventListener("pointercancel", onUp)
        return () => {
            node.removeEventListener("pointerdown", onDown)
            node.removeEventListener("pointermove", onMove)
            node.removeEventListener("pointerup", onUp)
            node.removeEventListener("pointercancel", onUp)
        }
    }, [])

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="inline-flex items-center space-x-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Nandi Farms Showcase</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
                        Farm Produce Showcase
                    </h2>
                </div>
            </div>

            {/* Slider Container */}
            <div className="h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 relative">
                <div
                    ref={containerRef}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        background,
                        cursor: "grab",
                        touchAction: "pan-y",
                        opacity: width > 0 ? 1 : 0,
                        transition: "opacity 0.35s ease",
                        ...style,
                    }}
                >
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                nodes.current[i] = el
                            }}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 0,
                                width: slideWidth,
                                height: slideHeight,
                                borderRadius: radius,
                                overflow: "hidden",
                                background: slide.src ? "#111" : placeholderFill(i),
                                willChange: "transform, filter",
                                transform: "translate3d(0, -50%, 0)",
                                pointerEvents: "none",
                            }}
                        >
                            {slide.src ? (
                                <div className="relative w-full h-full group">
                                    <img
                                        src={slide.src}
                                        alt={slide.label || ""}
                                        draggable={false}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: `50% calc(50% + ${slide.offsetY}px)`,
                                            display: "block",
                                            userSelect: "none",
                                        }}
                                    />
                                    {/* Gradient Dark Overlay with Brand Tag */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
                                        <div className="flex justify-start">
                                            <span className="bg-emerald-600/90 backdrop-blur-md text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider text-white shadow-xs border border-emerald-400/40">
                                                Nandi Farms
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block">
                                                {slide.category}
                                            </span>
                                            <h3 className="text-lg font-black text-white tracking-tight drop-shadow-md">
                                                {slide.label}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const __originkitPresetProps = {
  "images": [
    {
      "image": {
        "alt": "Fresh Vegetables",
        "src": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80"
      },
      "offsetY": 0,
      "label": "Fresh Vegetables",
      "category": "100% Organic Produce"
    },
    {
      "image": {
        "alt": "Fresh Fruits & Organic Herbs",
        "src": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80"
      },
      "offsetY": 0,
      "label": "Fresh Fruits & Herbs",
      "category": "Garden Harvest"
    },
    {
      "image": {
        "alt": "Exotic Produce",
        "src": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=80"
      },
      "offsetY": 0,
      "label": "Exotic Produce",
      "category": "Farm Fresh"
    },
    {
      "image": {
        "alt": "Premium Basmati Rice",
        "src": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80"
      },
      "offsetY": 0,
      "label": "Premium Rice",
      "category": "Aromatic Grains"
    },
    {
      "image": {
        "alt": "Farm Fresh Eggs",
        "src": "/eggs-category.png"
      },
      "offsetY": 0,
      "label": "Farm Fresh Eggs",
      "category": "Dairy & Essentials"
    },
    {
      "image": {
        "alt": "Karam Podulu",
        "src": "/karam-podulu.png"
      },
      "offsetY": 0,
      "label": "Karam Podulu",
      "category": "Traditional Spices"
    },
    {
      "image": {
        "alt": "Gulab Jamun Box",
        "src": "/gulab-jamun.png"
      },
      "offsetY": 0,
      "label": "Gulab Jamun Box",
      "category": "Authentic Sweets"
    },
    {
      "image": {
        "alt": "Motichoor Ladoo Box",
        "src": "/motichoor-ladoo.png"
      },
      "offsetY": 0,
      "label": "Motichoor Ladoo",
      "category": "Festive Sweets"
    },
    {
      "image": {
        "alt": "Pooja Needs",
        "src": "/pooja-needs.png"
      },
      "offsetY": 0,
      "label": "Pooja Needs",
      "category": "Sacred Essentials"
    },
    {
      "image": {
        "alt": "Bombay Ravva",
        "src": "/ravva.png"
      },
      "offsetY": 0,
      "label": "Bombay Ravva",
      "category": "Whole Grains"
    }
  ],
  "slideWidth": 300,
  "slideHeight": 340,
  "spacing": 2,
  "direction": "right",
  "smoothness": 10,
  "radius": 20,
  "dim": 6,
  "background": "transparent",
  "sensitivity": 5,
  "loop": true
};

export default function SmoothScrollSlider(props: Record<string, unknown>) {
  return <__OriginkitBase_SmoothScrollSlider {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
