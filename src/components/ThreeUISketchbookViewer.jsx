import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import '../styles/sketchbook3d.css';

const N = 18;        // 18 strips forming the curved surface
const SPAN = 0.449;  // gutter to outer page edge
const BETA = 0.60;   // peak curl arc in radians
const TILT_X = 4.5;
const TILT_Y = 7.0;
const ZOOM_MIN = 0.9;
const ZOOM_MAX = 1.5;
const MAG = 2.3;

export default function ThreeUISketchbookViewer({ pages, onClose, autoRiffle = true }) {
  const M = pages.length;
  const [idx, setIdx] = useState(0);
  const [loupeOn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hasTurned, setHasTurned] = useState(false);

  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const sb3dRef = useRef(null);
  const bookRef = useRef(null);
  const loupeRef = useRef(null);
  const zoomWrapRef = useRef(null);
  const zoomInnerRef = useRef(null);

  // Mutable animation state
  const stateRef = useRef({
    idx: 0,
    turn: null, // { dir: 'next'|'prev', from: number, to: number, t: number }
    strips: [],
    spring: null,
    raf: null,
    last: 0,
    view: { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 },
    viewActive: false,
    drag: null,
    lx: null,
    ly: null,
    lgrab: null,
    lTarget: null,
    introOn: false,
    riffle: [],
    riffleAt: 0
  });

  const state = stateRef.current;
  state.idx = idx;

  // Helper to kick animation frame loop
  const kick = useCallback(() => {
    if (state.raf === null) {
      state.last = performance.now();
      state.raf = requestAnimationFrame(tick);
    }
  }, []);

  // Update layout book width
  const layout = useCallback(() => {
    if (bookRef.current && sb3dRef.current) {
      sb3dRef.current.style.setProperty('--bw', `${bookRef.current.clientWidth}px`);
    }
  }, []);

  // Apply 3D perspective lean and scale
  const applyView = useCallback(() => {
    if (!sb3dRef.current) return;
    sb3dRef.current.style.setProperty('--rx', `${state.view.rx.toFixed(2)}deg`);
    sb3dRef.current.style.setProperty('--ry', `${state.view.ry.toFixed(2)}deg`);
    sb3dRef.current.style.setProperty('--zoom', state.view.z.toFixed(3));
    setZoomLevel(state.view.z);
    if (typeof placeLoupe === 'function') placeLoupe();
  }, []);

  const setView = useCallback((rx, ry, z) => {
    state.view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
    state.view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
    state.view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    state.viewActive = true;
    kick();
  }, [kick]);

  // Spring tick for 3D tilt
  const viewSpring = useCallback(() => {
    const e = 0.14;
    let moved = false;
    for (const [k, t] of [['rx', 'trx'], ['ry', 'try_'], ['z', 'tz']]) {
      const d = state.view[t] - state.view[k];
      if (Math.abs(d) > 0.0006) {
        state.view[k] += d * e;
        moved = true;
      } else {
        state.view[k] = state.view[t];
      }
    }
    if (moved) applyView();
    state.viewActive = moved;
    return moved;
  }, [applyView]);

  // Apply cosine lighting and rotation to the 18 strips
  const applyTurn = useCallback((t) => {
    if (!sb3dRef.current) return;
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta;
    const td = (2 * beta) / N;

    sb3dRef.current.style.setProperty('--tt', `${(tt * D).toFixed(2)}deg`);
    sb3dRef.current.style.setProperty('--td', `${(td * D).toFixed(3)}deg`);
    sb3dRef.current.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));

    for (let i = 0; i < state.strips.length; i++) {
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      const st = state.strips[i].style;
      st.setProperty('--lit', l1.toFixed(3));
      st.setProperty('--a1', ((1 - l1) * 0.62).toFixed(3));
      st.setProperty('--a2', ((1 - l2) * 0.62).toFixed(3));
    }
  }, []);

  // Sync magnified mirror layer for the loupe
  const syncZoomLayer = useCallback(() => {
    if (!zoomInnerRef.current || !bookRef.current) return;
    zoomInnerRef.current.textContent = '';
    for (const child of bookRef.current.children) {
      if (child.classList.contains('sb-zone')) continue;
      zoomInnerRef.current.appendChild(child.cloneNode(true));
    }
  }, []);

  // Loupe placement and coordinates
  const loupeSize = useCallback(() => {
    if (!bookRef.current) return 220;
    return Math.round(Math.max(160, Math.min(260, bookRef.current.clientWidth * 0.24)));
  }, []);

  const placeLoupe = useCallback(() => {
    if (state.lx === null || !loupeRef.current || !bookRef.current || !zoomWrapRef.current || !zoomInnerRef.current) return;
    const bw = bookRef.current.clientWidth;
    const bh = bookRef.current.clientHeight;
    if (!bw) return;

    const R = loupeSize() / 2;
    const bez = R * 2 * 0.058;
    loupeRef.current.style.setProperty('--lr', `${R * 2}px`);
    loupeRef.current.style.transform = `translate3d(${(state.lx - R).toFixed(1)}px, ${(state.ly - R).toFixed(1)}px, 0)`;

    const z = state.view.z;
    const cx = bw / 2;
    const cy = bh / 2;
    const x0 = cx + (bw * 0.051 - cx) * z;
    const x1 = cx + (bw * 0.949 - cx) * z;
    const y0 = cy + (bh * 0.218 - cy) * z;
    const y1 = cy + (bh * 0.782 - cy) * z;

    const nx = Math.max(x0, Math.min(state.lx, x1));
    const ny = Math.max(y0, Math.min(state.ly, y1));
    const inside = (state.lx > x0 && state.lx < x1 && state.ly > y0 && state.ly < y1)
      ? Math.min(state.lx - x0, x1 - state.lx, state.ly - y0, y1 - state.ly)
      : -Math.hypot(state.lx - nx, state.ly - ny);

    const k = Math.max(0, Math.min(1, (inside + R * 0.30) / (R * 0.55)));
    zoomWrapRef.current.style.opacity = (loupeOn ? k : 0).toFixed(3);
    if (k <= 0.002) return;

    const r = (R - bez).toFixed(1);
    const mask = `radial-gradient(circle ${r}px at ${state.lx.toFixed(1)}px ${state.ly.toFixed(1)}px, #000 calc(100% - 1px), transparent 100%)`;
    zoomWrapRef.current.style.webkitMaskImage = mask;
    zoomWrapRef.current.style.maskImage = mask;

    const px = cx + (state.lx - cx) / z;
    const py = cy + (state.ly - cy) / z;
    const s = MAG * z;
    zoomInnerRef.current.style.transform = `translate(${(state.lx - px * s).toFixed(1)}px, ${(state.ly - py * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
  }, [loupeOn, loupeSize]);

  const restLoupe = useCallback(() => {
    if (!bookRef.current) return;
    state.lx = bookRef.current.clientWidth * 0.88;
    state.ly = bookRef.current.clientHeight * 0.84;
    placeLoupe();
  }, [placeLoupe]);

  const shoveLoupe = useCallback((dir) => {
    if (!loupeOn || state.lx === null || state.lgrab || !bookRef.current) return;
    const bw = bookRef.current.clientWidth;
    const bh = bookRef.current.clientHeight;
    state.lTarget = {
      x: bw * (dir === 'next' ? 0.12 : 0.88),
      y: bh * 0.84
    };
    kick();
  }, [kick, loupeOn]);

  const loupeEase = useCallback(() => {
    if (!state.lTarget) return false;
    if (state.lgrab) {
      state.lTarget = null;
      return false;
    }
    const dx = state.lTarget.x - state.lx;
    const dy = state.lTarget.y - state.ly;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      state.lx = state.lTarget.x;
      state.ly = state.lTarget.y;
      state.lTarget = null;
      placeLoupe();
      return false;
    }
    state.lx += dx * 0.17;
    state.ly += dy * 0.17;
    placeLoupe();
    return true;
  }, [placeLoupe]);

  // Construct the nested 18-strip curl
  const buildCurl = useCallback((dir, from, to) => {
    state.strips = [];
    const c = document.createElement('div');
    c.className = `curl ${dir}`;
    c.style.setProperty('--n', N);
    c.style.setProperty('--span', SPAN);

    let host = c;
    for (let i = 0; i < N; i++) {
      const s = document.createElement('div');
      s.className = 'strip';
      s.style.setProperty('--i', i);

      const gut = 'calc(var(--bw) * 0.5)';
      const sw = `calc(var(--bw) * ${SPAN} / ${N})`;
      const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
      const B = `calc(${(i + 1)} * ${sw} - ${gut})`;

      const f = document.createElement('div');
      f.className = 'face front';
      const b = document.createElement('div');
      b.className = 'face back';

      f.style.backgroundImage = `url(${pages[from].url})`;
      f.style.backgroundPositionX = dir === 'next' ? A : B;

      b.style.backgroundImage = `url(${pages[to].url})`;
      b.style.backgroundPositionX = dir === 'next' ? B : A;

      const fSh = document.createElement('div'); fSh.className = 'sh';
      const fGl = document.createElement('div'); fGl.className = 'gl';
      f.appendChild(fSh); f.appendChild(fGl);

      const bSh = document.createElement('div'); bSh.className = 'sh';
      const bGl = document.createElement('div'); bGl.className = 'gl';
      b.appendChild(bSh); b.appendChild(bGl);

      s.appendChild(f);
      s.appendChild(b);

      if (i === N - 1) s.classList.add('edge');
      host.appendChild(s);
      host = s;
      state.strips.push(s);
    }
    return c;
  }, [pages]);

  // Render DOM elements inside .sb-book
  const paint = useCallback(() => {
    if (!bookRef.current || !sb3dRef.current) return;
    const book = bookRef.current;
    book.textContent = '';

    if (!state.turn) {
      const f = document.createElement('div');
      f.className = 'sb-full';
      const im = new Image();
      im.src = pages[state.idx].url;
      im.alt = pages[state.idx].title;
      im.draggable = false;
      f.appendChild(im);
      book.appendChild(f);
      sb3dRef.current.style.setProperty('--shade', '0');
    } else {
      const next = state.turn.dir === 'next';
      // Left half
      const lh = document.createElement('div');
      lh.className = 'sb-half left';
      const lImg = new Image();
      lImg.className = 'sb-half-img left';
      lImg.src = pages[next ? state.turn.from : state.turn.to].url;
      lImg.draggable = false;
      const lShade = document.createElement('div');
      lShade.className = 'gutter-shade left';
      lh.appendChild(lImg);
      lh.appendChild(lShade);
      book.appendChild(lh);

      // Right half
      const rh = document.createElement('div');
      rh.className = 'sb-half right';
      const rImg = new Image();
      rImg.className = 'sb-half-img right';
      rImg.src = pages[next ? state.turn.to : state.turn.from].url;
      rImg.draggable = false;
      const rShade = document.createElement('div');
      rShade.className = 'gutter-shade right';
      rh.appendChild(rImg);
      rh.appendChild(rShade);
      book.appendChild(rh);

      // 18-strip curl
      const curl = buildCurl(state.turn.dir, state.turn.from, state.turn.to);
      book.appendChild(curl);
      applyTurn(state.turn.t);
    }

    // Touch / click zones
    const zoneL = document.createElement('button');
    zoneL.className = 'sb-zone sb-prev';
    zoneL.setAttribute('aria-label', 'Previous page');
    const zoneR = document.createElement('button');
    zoneR.className = 'sb-zone sb-next';
    zoneR.setAttribute('aria-label', 'Next page');
    book.appendChild(zoneL);
    book.appendChild(zoneR);

    layout();
    syncZoomLayer();
    placeLoupe();
  }, [applyTurn, buildCurl, layout, pages, placeLoupe, syncZoomLayer]);

  // Main animation frame handler
  const tick = useCallback((now) => {
    state.raf = null;
    const dt = Math.min(0.032, (now - state.last) / 1000 || 0.016);
    state.last = now;

    if (state.spring && state.turn) {
      const s = state.spring;
      if (s.kind === 'tween') {
        s.e += dt;
        const k = Math.min(1, s.e / s.dur);
        state.turn.t = s.from + (s.target - s.from) * k;
        applyTurn(state.turn.t);
        if (k >= 1) {
          state.spring = null;
          if (s.done) s.done();
        }
      } else {
        const x = state.turn.t - s.target;
        s.v += (-s.k * x - s.c * s.v) * dt;
        state.turn.t += s.v * dt;
        if (Math.abs(state.turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
          state.turn.t = s.target;
          state.spring = null;
          applyTurn(state.turn.t);
          if (s.done) s.done();
        } else {
          applyTurn(state.turn.t);
        }
      }
    }

    viewSpring();
    const lmoved = loupeEase();

    if ((state.spring || state.viewActive || lmoved) && state.raf === null) {
      state.raf = requestAnimationFrame(tick);
    }
  }, [applyTurn, loupeEase, viewSpring]);

  const animateTo = useCallback((target, onDone, stiff = 170, damp = 26) => {
    state.spring = { kind: 'spring', v: 0, target, done: onDone, k: stiff, c: damp };
    kick();
  }, [kick]);

  const tweenTo = useCallback((target, dur, onDone) => {
    state.spring = { kind: 'tween', from: state.turn ? state.turn.t : 0, target, dur, e: 0, done: onDone };
    kick();
  }, [kick]);

  // Turn management
  const startTurn = useCallback((dir, t = 0) => {
    state.spring = null;
    if (state.turn) {
      state.idx = state.turn.to;
      setIdx(state.idx);
      state.turn = null;
    }
    if ((dir === 'next' && state.idx >= M - 1) || (dir === 'prev' && state.idx <= 0)) return;
    shoveLoupe(dir);
    const from = state.idx;
    const to = dir === 'next' ? from + 1 : from - 1;
    state.turn = { dir, from, to, t };
    paint();
  }, [M, paint, shoveLoupe]);

  const commit = useCallback(() => {
    if (!state.turn) return;
    animateTo(1, () => {
      const nextIdx = state.turn.to;
      state.idx = nextIdx;
      setIdx(nextIdx);
      state.turn = null;
      paint();
      setHasTurned(true);
    }, 170, 26);
  }, [animateTo, paint]);

  const cancel = useCallback(() => {
    if (!state.turn) return;
    animateTo(0, () => {
      state.turn = null;
      paint();
    }, 150, 24);
  }, [animateTo, paint]);

  const step = useCallback((dir) => {
    if (state.introOn) endIntro();
    if (state.turn) {
      state.idx = state.turn.to;
      setIdx(state.idx);
      state.turn = null;
    }
    if ((dir === 'next' && state.idx >= M - 1) || (dir === 'prev' && state.idx <= 0)) return;
    startTurn(dir, 0);
    commit();
  }, [M, commit, startTurn]);

  const goTo = useCallback((i) => {
    if (state.introOn) endIntro();
    if (i === state.idx) return;
    if (state.turn) {
      state.idx = state.turn.to;
      state.turn = null;
    }
    const distance = i - state.idx;
    if (Math.abs(distance) === 1) {
      step(distance > 0 ? 'next' : 'prev');
      return;
    }
    state.idx = i;
    setIdx(i);
    paint();
  }, [M, paint, step]);

  // Riffle intro sequence
  const endIntro = useCallback(() => {
    state.introOn = false;
  }, []);

  const riffleStep = useCallback(() => {
    const s = state.riffle[state.riffleAt];
    startTurn('next', 0);
    tweenTo(1, s.dur, () => {
      const nextIdx = state.turn.to;
      state.idx = nextIdx;
      setIdx(nextIdx);
      state.turn = null;
      state.riffleAt++;
      if (state.introOn && state.riffleAt < state.riffle.length) {
        paint();
        riffleStep();
      } else {
        endIntro();
        paint();
      }
    });
  }, [endIntro, paint, startTurn, tweenTo]);

  const startIntro = useCallback(() => {
    const steps = M;
    state.riffle = [];
    for (let r = 0; r < steps; r++) {
      const bell = Math.sin(Math.PI * (r / (steps - 1 || 1)));
      state.riffle.push({ bell, dur: 0.28 - 0.18 * bell });
    }
    state.riffleAt = 0;
    state.introOn = true;
    riffleStep();
  }, [M, riffleStep]);

  // Initialize and attach mouse tilt & drag listeners
  useEffect(() => {
    layout();
    paint();
    applyView();
    restLoupe();

    const stage = stageRef.current;
    if (!stage) return;

    // Pointer move tilt
    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch' || state.drag || !bookRef.current) return;
      const r = bookRef.current.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, state.view.tz);
    };

    const handlePointerOut = (e) => {
      if (!e.relatedTarget) setView(0, 0, state.view.tz);
    };

    // Drag to curl interaction
    const handlePointerDown = (e) => {
      if (e.button !== 0 || !bookRef.current) return;
      const onBook = e.target.closest('.sb-zone');
      if (!onBook || state.introOn) return;
      e.preventDefault();
      stage.setPointerCapture(e.pointerId);

      const r = bookRef.current.getBoundingClientRect();
      if (e.pointerType === 'touch') {
        state.drag = { dir: null, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
        return;
      }
      const dir = (e.clientX - r.left) / r.width > 0.5 ? 'next' : 'prev';
      startTurn(dir, 0);
      state.drag = { dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
    };

    const handleDragMove = (e) => {
      if (!state.drag) return;
      const dx = e.clientX - state.drag.x0;
      state.drag.moved = Math.max(state.drag.moved, Math.abs(dx));
      if (!state.drag.dir && state.drag.moved > 8) {
        state.drag.dir = dx < 0 ? 'next' : 'prev';
        startTurn(state.drag.dir, 0);
      }
      if (!state.drag.dir || !state.turn) return;
      const raw = (state.drag.dir === 'next' ? -dx : dx) / (state.drag.w * 0.62);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      state.drag.vel = (t - (state.turn ? state.turn.t : 0)) / Math.max(0.001, (now - state.drag.tPrev) / 1000);
      state.drag.tPrev = now;
      if (state.turn) {
        state.turn.t = t;
        applyTurn(t);
      }
    };

    const handlePointerUp = () => {
      if (!state.drag) return;
      const d = state.drag;
      state.drag = null;
      if (!state.turn) return;
      if (!d.dir) return;
      if (d.moved < 8) {
        commit();
        return;
      }
      const touchSwipe = d.dir && d.moved >= Math.min(64, d.w * 0.14) && state.turn.t > 0.16;
      const go = touchSwipe || state.turn.t > 0.42 || d.vel > 1.1;
      if (go) commit();
      else cancel();
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        step('next');
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('keydown', handleKeyDown);
    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointermove', handleDragMove);
    stage.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('resize', layout);

    // Run opening riffle if requested
    if (autoRiffle) {
      const timer = setTimeout(() => {
        startIntro();
      }, 250);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerout', handlePointerOut);
        window.removeEventListener('keydown', handleKeyDown);
        stage.removeEventListener('pointerdown', handlePointerDown);
        stage.removeEventListener('pointermove', handleDragMove);
        stage.removeEventListener('pointerup', handlePointerUp);
        stage.removeEventListener('pointercancel', handlePointerUp);
        window.removeEventListener('resize', layout);
      };
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('keydown', handleKeyDown);
      stage.removeEventListener('pointerdown', handlePointerDown);
      stage.removeEventListener('pointermove', handleDragMove);
      stage.removeEventListener('pointerup', handlePointerUp);
      stage.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', layout);
    };
  }, [applyTurn, applyView, autoRiffle, cancel, commit, layout, paint, restLoupe, setView, startIntro, startTurn, step]);

  // Loupe drag handlers
  const handleLoupeDown = (e) => {
    if (!loupeOn || e.button !== 0 || !loupeRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    state.lTarget = null;
    state.lgrab = { cx: e.clientX, cy: e.clientY, lx0: state.lx, ly0: state.ly };
    loupeRef.current.classList.add('held');
    loupeRef.current.setPointerCapture(e.pointerId);
  };

  const handleLoupeMove = (e) => {
    if (!state.lgrab || !bookRef.current) return;
    const bw = bookRef.current.clientWidth;
    const bh = bookRef.current.clientHeight;
    const R = loupeSize() / 2;
    state.lx = Math.max(-R * 0.7, Math.min(bw + R * 0.7, state.lgrab.lx0 + (e.clientX - state.lgrab.cx)));
    state.ly = Math.max(-R * 0.7, Math.min(bh + R * 1.0, state.lgrab.ly0 + (e.clientY - state.lgrab.cy)));
    placeLoupe();
  };

  const handleLoupeUp = () => {
    state.lgrab = null;
    if (loupeRef.current) loupeRef.current.classList.remove('held');
  };

  const visibleSpreadIndexes = M <= 5
    ? pages.map((_, i) => i)
    : [...new Set([0, idx - 1, idx, idx + 1].filter((i) => i >= 0 && i < M))];

  return (
    <div
      ref={containerRef}
      className={`sketchbook-viewer w-full flex flex-col items-center animate-fadeIn select-none ${zoomLevel > 1.02 ? 'is-zoomed' : ''}`}
    >
      {/* SPREAD TOOLBAR (CLOSE, SPREAD NUMBER, ZOOM, LOUPE, ARROWS) */}
      <div className={`sb-toolbar w-full max-w-6xl flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 px-1 sm:px-2 ${zoomLevel > 1.02 ? 'is-zoomed' : ''}`}>
        {/* Left: Close Cover button */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 transition-all cursor-pointer active:scale-95 shadow-sm font-medium text-xs font-poppins"
        >
          <X className="w-3.5 h-3.5 text-neutral-600" />
          <span>Close Cover</span>
        </button>

        {/* Center: Interactive Spread Index Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-neutral-900/5 p-0.5 sm:p-1 rounded-full border border-neutral-300/60">
            {visibleSpreadIndexes.map((i, visibleIndex) => (
              <React.Fragment key={i}>
                {visibleIndex > 0 && i - visibleSpreadIndexes[visibleIndex - 1] > 1 && (
                  <span className="px-0.5 sm:px-1 text-xs text-neutral-400 font-fredoka" aria-hidden="true">…</span>
                )}
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to spread ${i + 1}`}
                  aria-current={i === idx ? 'page' : undefined}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-fredoka transition-all cursor-pointer ${
                    i === idx
                      ? 'bg-neutral-900 text-white font-bold shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              </React.Fragment>
            ))}
          </div>
          <button
            type="button"
            className="tool"
            onClick={() => setView(0, 0, 1)}
            title="Reset Zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Zoom controls */}
        <div className="sb-tools flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            className="tool"
            onClick={() => setView(state.view.trx, state.view.try_, state.view.tz / 1.15)}
            disabled={zoomLevel <= ZOOM_MIN + 0.01}
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="zoom-read font-fredoka">{Math.round(zoomLevel * 100)}%</span>
          <button
            type="button"
            className="tool"
            onClick={() => setView(state.view.trx, state.view.try_, state.view.tz * 1.15)}
            disabled={zoomLevel >= ZOOM_MAX - 0.01}
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D SKETCHBOOK STAGE */}
      <div className="sb-wrap">
        <div ref={stageRef} className={`sb-stage ${zoomLevel > 1.02 ? 'is-zoomed' : ''}`}>
          {/* Previous Arrow */}
          <button
            type="button"
            className="sb-arrow prev"
            onClick={() => step('prev')}
            disabled={idx === 0}
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>

          {/* 3D Container with Perspective */}
          <div ref={sb3dRef} className="sb-3d">
            {/* Ambient & Contact Shadow Pool */}
            <div className="sb-cast ambient" />
            <div className="sb-cast contact" />
            <div className="sb-cast hair" />

            {/* Leaning 3D Tilt Container */}
            <div className="sb-tilt">
              {/* Physical Book Spine & Spreads */}
              <div ref={bookRef} className="sb-book" />
            </div>

            {/* Draggable Loupe Magnifier */}
            <div
              ref={loupeRef}
              className={`loupe ${loupeOn ? 'on' : ''}`}
              onPointerDown={handleLoupeDown}
              onPointerMove={handleLoupeMove}
              onPointerUp={handleLoupeUp}
              onPointerCancel={handleLoupeUp}
            >
              <div className="ring">
                <span className="lens" />
              </div>
              <div className="grip" />
            </div>

            {/* Magnified Mirror Copy */}
            <div ref={zoomWrapRef} className="zoomwrap">
              <div ref={zoomInnerRef} className="zoominner" />
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            className="sb-arrow next"
            onClick={() => step('next')}
            disabled={idx === M - 1}
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Drag hint */}
        {!hasTurned && (
          <p className="sb-hint font-fredoka text-[11px] text-neutral-500 uppercase tracking-widest">
            Tip: Drag page edges with cursor to peel & turn
          </p>
        )}
      </div>
    </div>
  );
}
