"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDeviceTier } from '@/utils/deviceTier';

interface MatrixNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    col: number;
    row: number;
    radius: number;
    label: string;
    tension: number;
    pulsePhase: number;
}

interface SynapticPulse {
    fromNode: number;
    toNode: number;
    progress: number;
    speed: number;
}

interface GravitationalShockwave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    power: number;
}

export interface KineticMatrixProps {
    title?: string;
    className?: string;
    mode?: 'dark' | 'light' | 'auto';
    bgColor?: string;
    gridColor?: string;
}

export function KineticMatrix({
    title = "TOPOLOGY",
    className = "",
    mode,
    bgColor: customBgColor,
    gridColor: customGridColor,
}: KineticMatrixProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isRunning, setIsRunning] = useState(true);
    const [isInView, setIsInView] = useState(false);
    const { tier, isHigh, isMedium, isLow, isMobile, dprCap } = useDeviceTier();

    // IntersectionObserver so off-screen instances (e.g. Hero when scrolled down, or About when scrolled away)
    // consume exactly 0% CPU and GPU.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { rootMargin: '120px' }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Sync color scheme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Pointer state with smooth inertia
    const pointerRef = useRef({
        x: -2000,
        y: -2000,
        prevX: -2000,
        prevY: -2000,
        vx: 0,
        vy: 0,
        radius: isMobile ? 120 : 140,
        isDown: false,
    });

    const nodesRef = useRef<MatrixNode[]>([]);
    const pulsesRef = useRef<SynapticPulse[]>([]);
    const shockwavesRef = useRef<GravitationalShockwave[]>([]);
    const dimensionsRef = useRef({ width: 0, height: 0, cols: 0, rows: 0, spacing: 52 });

    // Grid lattice initializer tailored dynamically by tier across mobile and laptops/desktops
    const buildLattice = useCallback((width: number, height: number) => {
        const spacing = isLow ? (isMobile ? 78 : 72) :
                        isMedium ? (isMobile ? 65 : 60) : 52;

        const cols = Math.ceil(width / spacing) + 1;
        const rows = Math.ceil(height / spacing) + 1;
        const nodes: MatrixNode[] = [];

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                const x = c * spacing;
                const y = r * spacing;
                nodes.push({
                    x,
                    y,
                    vx: 0,
                    vy: 0,
                    baseX: x,
                    baseY: y,
                    col: c,
                    row: r,
                    radius: 1.4,
                    label: `0x${((c * 17 + r * 31) % 256).toString(16).padStart(2, '0').toUpperCase()}`,
                    tension: 0,
                    pulsePhase: Math.random() * Math.PI * 2,
                });
            }
        }

        dimensionsRef.current = { width, height, cols, rows, spacing };
        nodesRef.current = nodes;
        pulsesRef.current = [];
    }, [isLow, isMedium, isMobile]);

    // Canvas Resize Observer with immediate initial mount sizing
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const updateSize = (w: number, h: number) => {
            if (w <= 0 || h <= 0) return;
            const dpr = dprCap || (isHigh ? Math.min(window.devicePixelRatio || 1, 2) : (isMobile ? 1.2 : 1.25));

            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            buildLattice(w, h);
        };

        const initialRect = container.getBoundingClientRect();
        if (initialRect.width > 0 && initialRect.height > 0) {
            updateSize(initialRect.width, initialRect.height);
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const rect = entry.contentRect;
                updateSize(rect.width, rect.height);
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, [buildLattice, dprCap, isHigh, isMobile]);

    // Unified pointer tracking so animation works across overlays
    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            const container = containerRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                pointerRef.current.x = e.clientX - rect.left;
                pointerRef.current.y = e.clientY - rect.top;
            } else {
                pointerRef.current.x = -2000;
                pointerRef.current.y = -2000;
            }
        };

        const onPointerDown = (e: PointerEvent) => {
            const container = containerRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                pointerRef.current.isDown = true;
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                shockwavesRef.current.push({
                    x,
                    y,
                    radius: 8,
                    maxRadius: Math.max(rect.width, rect.height) * 0.55,
                    power: 0.6,
                });
            }
        };

        const onPointerUp = () => {
            pointerRef.current.isDown = false;
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, []);

    // Draw connecting lattice strands with refined tension glow
    const drawLatticeLink = useCallback((
        ctx: CanvasRenderingContext2D,
        n1: MatrixNode,
        n2: MatrixNode,
        restLen: number,
        isDark: boolean,
        nodeColor: string
    ) => {
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const stretch = Math.abs(len - restLen) / restLen;

        if (stretch > 0.04 || n1.tension > 0.1 || n2.tension > 0.1) {
            const glow = Math.min(1, Math.max(n1.tension, n2.tension, stretch * 1.2));
            ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${Math.min(0.5, 0.12 + glow * 0.38)})`
                : `rgba(0, 0, 0, ${Math.min(0.95, 0.5 + glow * 0.45)})`;
            ctx.lineWidth = isDark ? (0.6 + glow * 0.6) : (0.95 + glow * 0.95);
        } else {
            ctx.strokeStyle = isDark
                ? `rgba(${nodeColor}, 0.07)`
                : `rgba(0, 0, 0, 0.32)`;
            ctx.lineWidth = isDark ? 0.55 : 0.85;
        }

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
    }, []);

    // Main High-Performance Simulation & Rendering Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animId = 0;
        let lastTime = performance.now();
        let lastRenderTime = 0;
        let isScrolling = false;
        let scrollTimeout: any = null;

        const handleScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const render = (now: number) => {
            if (!isRunning || !isInView || document.hidden) {
                animId = 0;
                return;
            }

            // Yield frame rate during scroll on mid/low-tier laptops, desktops, and mobile
            if ((isMedium || isLow) && isScrolling) {
                if (now - lastRenderTime < 34) {
                    animId = requestAnimationFrame(render);
                    return;
                }
            }

            lastRenderTime = now;
            const dt = Math.min((now - lastTime) / 1000, 0.033);
            lastTime = now;

            const { width, height, cols, rows, spacing } = dimensionsRef.current;
            const nodes = nodesRef.current;
            const pulses = pulsesRef.current;
            const shockwaves = shockwavesRef.current;
            const pointer = pointerRef.current;

            // Pointer velocity interpolation
            pointer.vx = (pointer.x - pointer.prevX) / (dt * 1000 || 1);
            pointer.vy = (pointer.y - pointer.prevY) / (dt * 1000 || 1);
            pointer.prevX = pointer.x;
            pointer.prevY = pointer.y;
            const mouseSpeed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

            const isDark = mode === 'light'
                ? false
                : mode === 'dark'
                ? true
                : (document.documentElement.classList.contains('dark') || isDarkMode);
            const bgColor = customBgColor || (isDark ? '#06070a' : '#ffffff');
            const nodeColor = isDark ? '255, 255, 255' : '0, 0, 0';
            const accentGlow = isDark ? '255, 255, 255' : '0, 0, 0';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            // 1. Propagate Shockwaves
            for (let s = shockwaves.length - 1; s >= 0; s--) {
                const sw = shockwaves[s];
                sw.radius += 360 * dt;
                sw.power *= Math.pow(0.12, dt);
                if (sw.radius > sw.maxRadius || sw.power < 0.01) {
                    shockwaves.splice(s, 1);
                }
            }

            // 2. Physics & Node Displacement
            const SPRING = 18;
            const DAMPING = 0.82;
            const hasPointer = pointer.x > -1000;

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.pulsePhase += dt * 2.5;

                let fx = (n.baseX - n.x) * SPRING;
                let fy = (n.baseY - n.y) * SPRING;

                if (hasPointer) {
                    const dx = pointer.x - n.x;
                    const dy = pointer.y - n.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < pointer.radius && dist > 0) {
                        const falloff = 1 - dist / pointer.radius;
                        const force = falloff * (pointer.isDown ? 1800 : 750 + mouseSpeed * 120);
                        const angle = Math.atan2(dy, dx);
                        fx -= Math.cos(angle) * force;
                        fy -= Math.sin(angle) * force;
                        n.tension = Math.min(1, n.tension + falloff * 0.45);
                    }
                }

                for (let s = 0; s < shockwaves.length; s++) {
                    const sw = shockwaves[s];
                    const dx = n.x - sw.x;
                    const dy = n.y - sw.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const ringDist = Math.abs(dist - sw.radius);

                    if (ringDist < 60) {
                        const waveFactor = (1 - ringDist / 60) * sw.power * 2200;
                        const angle = Math.atan2(dy, dx);
                        fx += Math.cos(angle) * waveFactor;
                        fy += Math.sin(angle) * waveFactor;
                        n.tension = Math.min(1, n.tension + (1 - ringDist / 60) * sw.power);
                    }
                }

                n.vx = (n.vx + fx * dt) * DAMPING;
                n.vy = (n.vy + fy * dt) * DAMPING;
                n.x += n.vx * dt * 60;
                n.y += n.vy * dt * 60;
                n.tension *= Math.pow(0.2, dt);
            }

            // 3. Draw Grid Lattice Connections
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const idx = c * rows + r;
                    const n = nodes[idx];
                    if (!n) continue;

                    if (c + 1 < cols) {
                        const rightNode = nodes[(c + 1) * rows + r];
                        if (rightNode) drawLatticeLink(ctx, n, rightNode, spacing, isDark, nodeColor);
                    }
                    if (r + 1 < rows) {
                        const bottomNode = nodes[c * rows + (r + 1)];
                        if (bottomNode) drawLatticeLink(ctx, n, bottomNode, spacing, isDark, nodeColor);
                    }
                }
            }

            // 4. Propagate & Render Synaptic Pulses
            if (pulses.length < (isLow ? 4 : (isMedium ? 7 : 12)) && Math.random() < (isLow ? 0.03 : 0.07)) {
                const randomNodeIdx = Math.floor(Math.random() * nodes.length);
                const n = nodes[randomNodeIdx];
                if (n) {
                    const neighbors: number[] = [];
                    if (n.col + 1 < cols) neighbors.push((n.col + 1) * rows + n.row);
                    if (n.row + 1 < rows) neighbors.push(n.col * rows + (n.row + 1));
                    if (n.col - 1 >= 0) neighbors.push((n.col - 1) * rows + n.row);
                    if (n.row - 1 >= 0) neighbors.push(n.col * rows + (n.row - 1));

                    if (neighbors.length > 0) {
                        const target = neighbors[Math.floor(Math.random() * neighbors.length)];
                        pulses.push({
                            fromNode: randomNodeIdx,
                            toNode: target,
                            progress: 0,
                            speed: 1.4 + Math.random() * 1.8,
                        });
                    }
                }
            }

            for (let p = pulses.length - 1; p >= 0; p--) {
                const pulse = pulses[p];
                pulse.progress += pulse.speed * dt;

                const n1 = nodes[pulse.fromNode];
                const n2 = nodes[pulse.toNode];

                if (n1 && n2 && pulse.progress <= 1) {
                    const px = n1.x + (n2.x - n1.x) * pulse.progress;
                    const py = n1.y + (n2.y - n1.y) * pulse.progress;

                    ctx.fillStyle = isDark ? '#ffffff' : '#000000';
                    ctx.beginPath();
                    ctx.arc(px, py, isDark ? 1.6 : 2.2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    pulses.splice(p, 1);
                }
            }

            // 5. Render Nodes and Hover Overlays
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const dx = pointer.x - n.x;
                const dy = pointer.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isNear = hasPointer && dist < pointer.radius;

                const currentRadius = isNear
                    ? n.radius * 2.1
                    : n.radius + Math.sin(n.pulsePhase) * 0.25;

                if (n.tension > 0.08 || isNear) {
                    const glowAlpha = Math.min(0.7, (n.tension + (isNear ? 0.4 : 0)) * 0.6);
                    ctx.fillStyle = isDark
                        ? `rgba(${accentGlow}, ${glowAlpha})`
                        : `rgba(0, 0, 0, ${glowAlpha * 0.7})`;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, currentRadius * 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.fillStyle = isNear || n.tension > 0.12
                    ? (isDark ? '#ffffff' : '#000000')
                    : (isDark ? `rgba(${nodeColor}, 0.25)` : `rgba(0, 0, 0, 0.65)`);

                ctx.beginPath();
                ctx.arc(n.x, n.y, Math.max(isDark ? 0.7 : 1.25, currentRadius), 0, Math.PI * 2);
                ctx.fill();

                if (hasPointer && dist < 65) {
                    const radarRing = ((n.pulsePhase * 20) % 28) + 4;
                    const ringAlpha = (1 - radarRing / 32) * 0.22;

                    ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${ringAlpha})` : `rgba(0, 0, 0, ${ringAlpha * 1.6})`;
                    ctx.lineWidth = 0.75;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, radarRing, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.font = '7px ui-monospace, SFMono-Regular, Consolas, monospace';
                    ctx.fillStyle = isDark ? `rgba(255, 255, 255, 0.55)` : `rgba(0, 0, 0, 0.8)`;
                    ctx.fillText(n.label, n.x + 8, n.y - 8);
                }
            }

            animId = requestAnimationFrame(render);
        };

        const handleVisibilityChange = () => {
            if (!document.hidden && isInView && isRunning && !animId) {
                lastTime = performance.now();
                animId = requestAnimationFrame(render);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        if (isInView && isRunning && !document.hidden) {
            lastTime = performance.now();
            animId = requestAnimationFrame(render);
        }

        return () => {
            if (animId) cancelAnimationFrame(animId);
            clearTimeout(scrollTimeout);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isRunning, isInView, isDarkMode, mode, customBgColor, customGridColor, drawLatticeLink, isMedium, isLow, isMobile]);

    const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        pointerRef.current.x = e.clientX - rect.left;
        pointerRef.current.y = e.clientY - rect.top;
    };

    const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        pointerRef.current.isDown = true;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        shockwavesRef.current.push({
            x,
            y,
            radius: 8,
            maxRadius: Math.max(rect.width, rect.height) * 0.55,
            power: 0.6,
        });
    };

    const handlePointerUp = () => {
        pointerRef.current.isDown = false;
    };

    const handlePointerLeave = () => {
        pointerRef.current.x = -2000;
        pointerRef.current.y = -2000;
        pointerRef.current.isDown = false;
    };

    const triggerCentralImpulse = () => {
        const { width, height } = dimensionsRef.current;
        shockwavesRef.current.push({
            x: width / 2,
            y: height / 2,
            radius: 10,
            maxRadius: Math.max(width, height) * 0.6,
            power: 0.7,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handlePointerMove}
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerLeave}
            className={cn(
                "group relative flex h-full w-full select-none flex-col justify-between overflow-hidden transition-colors duration-700",
                mode === 'light' ? "bg-white" : "bg-neutral-50 dark:bg-[#06070a]",
                className
            )}
        >
            {/* Absolute Edge-to-Edge Canvas Viewport */}
            <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full cursor-crosshair" />

            {/* Content Deck Wrapper with Safe Padding */}
            <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 md:p-10 pointer-events-none">
                {/* Top Header Deck */}
                <header className="flex w-full items-center justify-between font-mono text-[11px] text-neutral-500 dark:text-neutral-400 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={triggerCentralImpulse}
                            className="flex items-center gap-1.5 rounded-lg border border-neutral-300/80 bg-white/70 px-2.5 py-1.5 backdrop-blur-md transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-800 cursor-pointer"
                            title="Trigger Shockwave"
                        >
                            <Sparkles className="size-3 text-neutral-800 dark:text-neutral-200" />
                            <span className="hidden sm:inline font-mono text-[10px]">PULSE</span>
                        </button>

                        <button
                            onClick={() => setIsRunning((prev) => !prev)}
                            className="flex items-center gap-1.5 rounded-lg border border-neutral-300/80 bg-white/70 px-2.5 py-1.5 backdrop-blur-md transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-800 cursor-pointer"
                        >
                            {isRunning ? <Pause className="size-3" /> : <Play className="size-3" />}
                            <span className="font-mono text-[10px]">{isRunning ? "FREEZE" : "RUN"}</span>
                        </button>
                    </div>
                </header>

                {/* Center Hero Stencil Typography */}
                <main className="pointer-events-none flex flex-col items-center justify-center text-center">
                    <h1 className="font-mono text-5xl font-black tracking-tighter uppercase sm:text-7xl md:text-9xl text-neutral-900 dark:text-white">
                        {title}
                    </h1>
                </main>

                <div />
            </div>
        </div>
    );
}
export default KineticMatrix;
