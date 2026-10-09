'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDeviceTier } from '../../utils/deviceTier';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    radius: number;
    label: string;
    pulse: number;
}

export default function ConstellationGrid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const { tier, isHigh, isMedium, isLow, isMobile, dprCap } = useDeviceTier();

    // Sync theme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let isVisible = !document.hidden;
        let isScrolling = false;
        let scrollTimeout: any = null;

        // Pointer velocity & inertial tracking (mouse & touch)
        const mouse = {
            x: -1000,
            y: -1000,
            prevX: -1000,
            prevY: -1000,
            vx: 0,
            vy: 0,
            radius: isMobile ? 160 : 220,
        };

        let nodes: Node[] = [];

        // Dynamic spacing tailored to device capabilities across mobile AND laptops/desktops:
        // High-end (desktop rigs, M-series Macs, flagship phones): 55px (dense, full visual richness)
        // Mid-end (Intel UHD, AMD Vega, mid-end phones): 70px on desktop/laptop (cuts pairwise math by 65%), 76px on mobile
        // Low-end (Intel HD, Celeron/Pentium, dual-core): 84px on desktop/laptop (cuts pairwise math by 84%), 92px on mobile
        const spacing = isLow ? (isMobile ? 92 : 84) :
                        isMedium ? (isMobile ? 76 : 70) : 55;

        // Dynamic connection distance
        const MAX_CONN_DIST = isLow ? (isMobile ? 60 : 64) : (isMedium ? (isMobile ? 86 : 72) : 75);
        const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

        const handleResize = () => {
            const dpr = dprCap || (isHigh ? Math.min(window.devicePixelRatio || 1, 2) : (isMobile ? 1.2 : 1.25));
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            initNodes();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches && e.touches[0]) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        const handleTouchEnd = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 100);
        };

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
            if (isVisible && !animationFrameId) {
                lastTime = performance.now();
                animationFrameId = requestAnimationFrame(render);
            }
        };

        const initNodes = () => {
            nodes = [];
            const cols = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    nodes.push({
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        baseX: x,
                        baseY: y,
                        radius: Math.random() * 1.2 + 1.2,
                        label: `${(i * 7).toString(16).toUpperCase()}:${(j * 11).toString(16).toUpperCase()}`,
                        pulse: Math.random() * Math.PI * 2,
                    });
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);

        let lastTime = performance.now();
        let lastRenderTime = 0;

        const render = (now: number) => {
            if (!isVisible) {
                animationFrameId = 0;
                return;
            }

            // Yield frame rate during active scrolling on mid/low-tier laptops, desktops, and phones
            if ((isMedium || isLow) && isScrolling) {
                if (now - lastRenderTime < 34) {
                    animationFrameId = requestAnimationFrame(render);
                    return;
                }
            }

            lastRenderTime = now;
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            // Mouse velocity calculation
            mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
            mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

            // Color paletting for dark/light seamlessness
            const bgColor = isDarkMode ? '#030407' : '#f8fafc';
            const nodeColor = isDarkMode ? '255, 255, 255' : '15, 23, 42';
            const accentColor = isDarkMode ? '56, 189, 248' : '2, 132, 199'; // Sky Cyan Accent

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            // Node Physics Engine (Hooke's Law Spring-Mass-Damping system)
            const SPRING_K = 18;
            const DAMPING = 0.82;
            const hasMouseInViewport = mouse.x > -500;

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.pulse += dt * 3;

                if (hasMouseInViewport) {
                    const dx = mouse.x - n.x;
                    const dy = mouse.y - n.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Dynamic shockwave repulsion based on cursor speed
                    if (dist < mouse.radius && dist > 0) {
                        const power = (1 - dist / mouse.radius);
                        const force = power * (1500 + speed * 150);
                        const angle = Math.atan2(dy, dx);

                        n.vx -= Math.cos(angle) * force * dt;
                        n.vy -= Math.sin(angle) * force * dt;
                    }
                }

                // Restoring force back to home anchor point (baseX, baseY)
                const homeDx = n.baseX - n.x;
                const homeDy = n.baseY - n.y;

                n.vx += homeDx * SPRING_K * dt;
                n.vy += homeDy * SPRING_K * dt;

                n.vx *= DAMPING;
                n.vy *= DAMPING;

                n.x += n.vx * dt * 60;
                n.y += n.vy * dt * 60;
            }

            // Draw Connections (Optimized Distance Culling with Rapid Coordinate Rejection)
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];

                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];

                    // Rapid bounding box reject before expensive sqrt/multiplication
                    const ndx = n.x - n2.x;
                    if (ndx > MAX_CONN_DIST || ndx < -MAX_CONN_DIST) continue;
                    const ndy = n.y - n2.y;
                    if (ndy > MAX_CONN_DIST || ndy < -MAX_CONN_DIST) continue;

                    const distSq = ndx * ndx + ndy * ndy;

                    if (distSq < MAX_CONN_DIST_SQ) {
                        const nDist = Math.sqrt(distSq);
                        const alpha = (1 - nDist / MAX_CONN_DIST) * (isDarkMode ? 0.18 : 0.08);

                        ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            // Render Node Points & Interactive Highlights
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                let isNear = false;
                let dist = 9999;

                if (hasMouseInViewport) {
                    const dx = mouse.x - n.x;
                    const dy = mouse.y - n.y;
                    dist = Math.sqrt(dx * dx + dy * dy);
                    isNear = dist < mouse.radius;
                }

                // Node base opacity pulse
                const baseAlpha = isNear ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;

                ctx.fillStyle = isNear
                    ? `rgba(${accentColor}, ${baseAlpha})`
                    : `rgba(${nodeColor}, ${baseAlpha})`;

                const currentRadius = isNear
                    ? n.radius * 2.2
                    : n.radius + Math.sin(n.pulse) * 0.3;

                ctx.beginPath();
                ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
                ctx.fill();

                // Spatial Radar Rings on active proximity (desktop/touch)
                if (hasMouseInViewport && dist < 90) {
                    const pulseRing = ((n.pulse * 20) % 30) + 4;
                    const ringAlpha = (1 - pulseRing / 34) * 0.4;

                    ctx.strokeStyle = `rgba(${accentColor}, ${ringAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, pulseRing, 0, Math.PI * 2);
                    ctx.stroke();

                    // Hex Coordinate Readout
                    ctx.font = '8px ui-monospace, SFMono-Regular, Consolas, monospace';
                    ctx.fillStyle = `rgba(${accentColor}, 0.85)`;
                    ctx.fillText(n.label, n.x + 10, n.y - 10);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            clearTimeout(scrollTimeout);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isDarkMode, tier, isHigh, isMedium, isLow, isMobile, dprCap]);

    return (
        <div className="relative w-full h-screen overflow-hidden select-none bg-slate-950 dark:bg-slate-950 light:bg-slate-50">
            <canvas ref={canvasRef} className="absolute inset-0 block cursor-crosshair" />

            {/* Seamless overlay title */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none mix-blend-difference text-white">
                <h1 className="font-mono text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                    Constellation
                </h1>
                <p className="mt-4 font-mono text-xs md:text-sm max-w-lg opacity-70">
                    High-velocity dynamic mesh. Sweep your cursor quickly across the grid to unleash kinetic shockwaves.
                </p>
            </div>
        </div>
    );
}
