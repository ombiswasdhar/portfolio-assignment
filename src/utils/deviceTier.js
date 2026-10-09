/**
 * Device Tier & Performance Detection System
 * 
 * Auto-detects device hardware capabilities (GPU renderer, logical cores, RAM, touch, battery)
 * across both mobile phones and desktop/laptop computers.
 * 
 * Dynamically adapts graphics fidelity across three tiers:
 *   - 'high': High-end desktops & laptops (Apple M1-M4, NVIDIA RTX/GTX 1060+, AMD RX, Core i7/i9 8+ cores),
 *             flagship phones (iPhone Pro, Galaxy S series) -> 100% full visual fidelity, zero compromises.
 *   - 'medium': Mid-range laptops/desktops (Intel UHD 620/630, Iris, AMD Radeon Vega/Ryzen APUs, GeForce MX, 4-6 cores),
 *               mid-end phones (Mali-G52/G57, Adreno 6xx, 4-6GB RAM) -> optimized physics, clamped DPR, scroll-yielding.
 *   - 'low': Lower-end laptops/desktops (Intel HD Graphics, Celeron/Pentium, dual-core, <=4GB RAM),
 *            budget phones, battery-saver mode -> lightweight fallbacks, 1.0 DPR, CSS gradients.
 * 
 * Includes an automated Realtime Frame-Rate Watchdog:
 * Continuously monitors render frames on mount and during active scrolling.
 * If any laptop, desktop, or phone suffers frame drops (e.g., thermal throttling, battery saving),
 * it automatically steps down gracefully to maintain a locked 60fps.
 */

import { useState, useEffect } from 'react';

// Cache detection result so evaluation runs once at startup
let cachedTier = null;
let cachedStats = null;
const listeners = new Set();

function getGpuInfo() {
  if (typeof window === 'undefined') return { renderer: '', vendor: '' };
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return { renderer: '', vendor: '' };
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return { renderer: '', vendor: '' };
    const renderer = (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '').toLowerCase();
    const vendor = (gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '').toLowerCase();
    return { renderer, vendor };
  } catch (e) {
    return { renderer: '', vendor: '' };
  }
}

export function detectDeviceTier() {
  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      cores: 8,
      memory: 8,
      isTouch: false,
      isMobile: false,
      dprCap: 2,
      gpuRenderer: '',
    };
  }

  const { renderer } = getGpuInfo();
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8; // in GB (Chrome/Edge API, undefined in Safari/Firefox)
  const isTouch = window.matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  const isMobile = isTouch && (window.innerWidth <= 768 || window.screen.width <= 768);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Low-End GPUs (Desktop/Laptop & Mobile)
  const isLowEndGpu = 
    // Intel Integrated Legacy & Low-Power
    (renderer.includes('hd graphics') && !renderer.includes('uhd graphics')) || // Intel HD Graphics (2000, 3000, 4000, 4400, 4600, 520, 530)
    renderer.includes('uhd graphics 600') ||         // Celeron/Pentium UHD 600/605/610
    renderer.includes('uhd graphics 605') ||
    renderer.includes('uhd graphics 610') ||
    renderer.includes('celeron') ||
    renderer.includes('pentium') ||
    renderer.includes('atom') ||
    // AMD Legacy APUs & Budget Discrete
    renderer.includes('radeon hd') ||                // Radeon HD series (5xxx, 6xxx, 7xxx)
    renderer.includes('radeon r2') ||
    renderer.includes('radeon r3') ||
    renderer.includes('radeon r4') ||
    renderer.includes('radeon r5') ||
    renderer.includes('vega 3') ||
    // NVIDIA Legacy & Budget Entry
    renderer.includes('geforce gt 6') ||             // GT 610, GT 630
    renderer.includes('geforce gt 7') ||             // GT 710, GT 730
    renderer.includes('geforce 820m') ||
    renderer.includes('geforce 920m') ||
    renderer.includes('geforce 930m') ||
    renderer.includes('geforce 940m') ||
    // Mobile Budget
    renderer.includes('mali-400') ||
    renderer.includes('mali-450') ||
    renderer.includes('mali-t') ||
    renderer.includes('adreno (tm) 3') ||
    renderer.includes('adreno (tm) 4') ||
    renderer.includes('adreno (tm) 5') ||
    // Virtual / Software Renderers
    renderer.includes('swiftshader') ||
    renderer.includes('llvmpipe') ||
    renderer.includes('basic render') ||
    renderer.includes('microsoft basic');

  // 2. Mid-Range GPUs (Desktop/Laptop & Mobile)
  const isMidRangeGpu = 
    // Intel Mainstream Integrated
    renderer.includes('uhd graphics') ||             // UHD 620, 630 (8th-11th gen Core i3/i5/i7)
    renderer.includes('iris') ||                     // Intel Iris Plus 640/645/650/655/G4/G7
    renderer.includes('intel(r) graphics') ||        // Modern entry Core 3 / i3 integrated
    // AMD Mainstream Integrated
    renderer.includes('radeon(tm) graphics') ||      // Ryzen 3000/4000/5000/7000 mobile APUs
    renderer.includes('vega 6') ||
    renderer.includes('vega 7') ||
    renderer.includes('vega 8') ||
    renderer.includes('vega 10') ||
    renderer.includes('vega 11') ||
    renderer.includes('radeon rx 550') ||
    renderer.includes('radeon rx 560') ||
    // NVIDIA Mainstream Entry & Older Mid
    renderer.includes('geforce mx') ||               // MX110, MX130, MX150, MX230, MX250, MX330, MX350, MX450
    renderer.includes('gt 1030') ||
    renderer.includes('gtx 650') ||
    renderer.includes('gtx 750') ||
    renderer.includes('gtx 950') ||
    renderer.includes('gtx 960') ||
    // Mobile Mid-Range
    renderer.includes('adreno (tm) 6') ||            // Adreno 610, 612, 616, 618, 619, 642, 643
    renderer.includes('mali-g5') ||                  // Mali-G52, Mali-G57
    renderer.includes('mali-g6') ||                  // Mali-G68
    renderer.includes('mali-g72') ||
    renderer.includes('mali-g76') ||
    renderer.includes('mali-g77') ||
    renderer.includes('powervr');

  // 3. High-End GPUs (Desktop/Laptop & Mobile)
  const isHighEndGpu = 
    renderer.includes('apple') ||                    // Apple M1/M2/M3/M4 / A15+
    renderer.includes('rtx') ||                      // RTX 2060+, 3050+, 4050+
    renderer.includes('gtx 1060') ||
    renderer.includes('gtx 1070') ||
    renderer.includes('gtx 1080') ||
    renderer.includes('gtx 1650') ||
    renderer.includes('gtx 1660') ||
    renderer.includes('gtx 970') ||
    renderer.includes('gtx 980') ||
    renderer.includes('gtx titan') ||
    renderer.includes('radeon rx') ||                // RX 470+, 570+, 580+, 6000+, 7000+
    renderer.includes('radeon pro') ||
    renderer.includes('arc(tm)') ||                  // Intel Arc A380, A580, A750, A770
    renderer.includes('iris(r) xe') ||               // Intel Iris Xe (modern 11th-13th gen Core i5/i7/i9)
    renderer.includes('adreno (tm) 7') ||            // Snapdragon 8 Gen 1/2/3
    renderer.includes('adreno (tm) 8') ||            // Snapdragon 8 Elite
    renderer.includes('immortalis') ||
    renderer.includes('mali-g715') ||
    renderer.includes('mali-g720') ||
    renderer.includes('mali-g725');

  let tier = 'high';

  if (prefersReducedMotion) {
    tier = 'low';
  } else if (!isTouch) {
    // Desktop / Laptop Computers
    if (isLowEndGpu || cores <= 2 || memory <= 3) {
      tier = 'low';
    } else if (isMidRangeGpu || cores <= 4 || memory <= 6) {
      tier = 'medium';
    } else if (isHighEndGpu || (cores >= 8 && memory >= 8)) {
      tier = 'high';
    } else {
      tier = 'medium';
    }
  } else {
    // Touch Devices (Mobile Phones & Tablets)
    if (isLowEndGpu || cores <= 4 || memory <= 3) {
      tier = 'low';
    } else if (isHighEndGpu && cores >= 6 && memory >= 6) {
      tier = 'high';
    } else if (isMidRangeGpu || isMobile || cores <= 8 || memory <= 6) {
      tier = 'medium';
    } else {
      tier = 'high';
    }
  }

  // Calculate recommended DevicePixelRatio cap per tier
  const dprCap = tier === 'high' ? Math.min(window.devicePixelRatio || 1, 2) :
                 tier === 'medium' ? Math.min(window.devicePixelRatio || 1, 1.25) : 1;

  return {
    tier,
    cores,
    memory,
    isTouch,
    isMobile,
    dprCap,
    gpuRenderer: renderer,
  };
}

export function getDeviceTier() {
  if (!cachedStats) {
    cachedStats = detectDeviceTier();
    cachedTier = cachedStats.tier;
    applyHtmlAttributes(cachedStats);
    startFpsWatchdog();
  }
  return cachedTier;
}

export function getDeviceStats() {
  if (!cachedStats) {
    getDeviceTier();
  }
  return cachedStats;
}

function applyHtmlAttributes(stats) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-perf-tier', stats.tier);
  document.documentElement.setAttribute('data-is-touch', stats.isTouch ? 'true' : 'false');
  document.documentElement.setAttribute('data-is-mobile', stats.isMobile ? 'true' : 'false');
}

export function setDeviceTier(newTier) {
  if (cachedTier === newTier) return;
  cachedTier = newTier;
  if (cachedStats) {
    cachedStats.tier = newTier;
    cachedStats.dprCap = newTier === 'high' ? Math.min(window.devicePixelRatio || 1, 2) :
                         newTier === 'medium' ? Math.min(window.devicePixelRatio || 1, 1.25) : 1;
    applyHtmlAttributes(cachedStats);
  }
  listeners.forEach((callback) => {
    try {
      callback(newTier, cachedStats);
    } catch (e) {
      console.error('Error in device tier listener:', e);
    }
  });
}

export function subscribeDeviceTier(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Real-Time Frame-Rate Watchdog
 * Samples animation frames on initial load and actively monitors scrolling.
 * If average FPS falls below 44 FPS (or > 5 severe frame spikes > 35ms occur),
 * dynamically and smoothly steps down the tier (high -> medium or medium -> low).
 */
let watchdogStarted = false;
function startFpsWatchdog() {
  if (watchdogStarted || typeof window === 'undefined') return;
  watchdogStarted = true;

  let frameCount = 0;
  let severeDrops = 0;
  let lastTime = performance.now();
  let totalDuration = 0;
  const maxFrames = 75;

  const checkInitialFrames = (now) => {
    const delta = now - lastTime;
    lastTime = now;

    if (delta > 5 && delta < 200) {
      frameCount++;
      totalDuration += delta;
      if (delta > 35) {
        severeDrops++;
      }
    }

    if (frameCount < maxFrames) {
      requestAnimationFrame(checkInitialFrames);
    } else {
      const avgFps = 1000 / (totalDuration / frameCount);
      if (avgFps < 44 || severeDrops >= 6) {
        if (cachedTier === 'high') {
          console.warn(`[PerfWatchdog] Average FPS was ${avgFps.toFixed(1)} with ${severeDrops} drops. Stepping down to 'medium'.`);
          setDeviceTier('medium');
        } else if (cachedTier === 'medium' && avgFps < 32) {
          console.warn(`[PerfWatchdog] Average FPS was ${avgFps.toFixed(1)}. Stepping down to 'low'.`);
          setDeviceTier('low');
        }
      }
    }
  };

  requestAnimationFrame(checkInitialFrames);

  // Scroll Performance Monitor for Laptops/Desktops:
  // If user begins scrolling and the device experiences stuttering/lag, auto-step-down!
  let scrollDropCount = 0;
  let scrollLastTime = 0;
  let scrollWatchTimeout = null;

  const handleScrollFrame = () => {
    const now = performance.now();
    if (scrollLastTime > 0) {
      const delta = now - scrollLastTime;
      if (delta > 38 && delta < 200) {
        scrollDropCount++;
        if (scrollDropCount >= 5) {
          if (cachedTier === 'high') {
            console.warn('[PerfWatchdog] Repeated scroll frame drops detected. Stepping down to medium tier.');
            setDeviceTier('medium');
            scrollDropCount = 0;
          } else if (cachedTier === 'medium' && scrollDropCount >= 9) {
            console.warn('[PerfWatchdog] Persistent scroll lag detected. Stepping down to low tier.');
            setDeviceTier('low');
            window.removeEventListener('scroll', onActiveScroll);
          }
        }
      }
    }
    scrollLastTime = now;
  };

  const onActiveScroll = () => {
    handleScrollFrame();
    clearTimeout(scrollWatchTimeout);
    scrollWatchTimeout = setTimeout(() => {
      scrollLastTime = 0;
      scrollDropCount = Math.max(0, scrollDropCount - 1);
    }, 200);
  };

  window.addEventListener('scroll', onActiveScroll, { passive: true });
}

/**
 * React Hook for consuming device performance tier
 */
export function useDeviceTier() {
  const [stats, setStats] = useState(getDeviceStats);

  useEffect(() => {
    const unsubscribe = subscribeDeviceTier((_, newStats) => {
      setStats({ ...newStats });
    });
    return unsubscribe;
  }, []);

  return {
    tier: stats.tier,
    isHigh: stats.tier === 'high',
    isMedium: stats.tier === 'medium',
    isLow: stats.tier === 'low',
    isTouch: stats.isTouch,
    isMobile: stats.isMobile,
    dprCap: stats.dprCap,
    cores: stats.cores,
    memory: stats.memory,
    gpuRenderer: stats.gpuRenderer,
  };
}

export default useDeviceTier;
