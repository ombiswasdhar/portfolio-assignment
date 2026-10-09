"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useDeviceTier } from "@/utils/deviceTier";

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[3];

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * 0.0243902439) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float noiseVal = 0.0;
  noiseVal += 0.50 * snoise(p * 1.5 + vec2(u_time * 0.2, -u_time * 0.15));
  noiseVal += 0.25 * snoise(p * 3.0 - vec2(-u_time * 0.1, u_time * 0.25));

  vec3 col = mix(u_colors[0], u_colors[1], smoothstep(-0.6, 0.6, noiseVal));
  col = mix(col, u_colors[2], smoothstep(0.1, 0.8, noiseVal));

  float g = fract(sin(dot(uv + fract(u_time), vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * u_grain * 0.15;

  float dist = length(uv - 0.5);
  col *= smoothstep(1.2, 0.2, dist);

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface AuralisProps {
  colors?: string[];
  speed?: number;
  grain?: number;
  height?: string;
  className?: string;
}

const DEFAULT_COLORS = ["#ef4444", "#dc2626", "#b91c1c"];

const Auralis = ({
  colors = DEFAULT_COLORS,
  speed = 0.3,
  grain = 0.6,
  height = "100vh",
  className,
}: AuralisProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const { tier, isHigh, isMedium, isLow, isMobile, dprCap } = useDeviceTier();

  // IntersectionObserver so WebGL shader halts completely when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  };

  useEffect(() => {
    if (isLow) return; // Low tier uses CSS gradient fallback

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", { antialias: isHigh, powerPreference: "low-power" });
    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderGLSL));
    gl.attachShader(
      program,
      createShader(gl.FRAGMENT_SHADER, fragmentShaderGLSL),
    );
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      res: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      grain: gl.getUniformLocation(program, "u_grain"),
      colors: gl.getUniformLocation(program, "u_colors"),
    };

    const resize = () => {
      const dpr = dprCap || (isHigh ? Math.min(window.devicePixelRatio || 1, 1.5) : 1.0);
      canvas.width = Math.floor(container.clientWidth * dpr);
      canvas.height = Math.floor(container.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf: number = 0;
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
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = (t: number) => {
      if (!isInView || document.hidden) {
        raf = 0;
        return;
      }

      // On mid/low-tier laptops, desktops, and mobile during aggressive scrolling, skip alternate frames to guarantee 60fps scroll
      if ((isMedium || isLow) && isScrolling) {
        if (t - lastRenderTime < 34) {
          raf = requestAnimationFrame(render);
          return;
        }
      }

      lastRenderTime = t;

      gl.uniform2f(locs.res, canvas.width, canvas.height);
      gl.uniform1f(locs.time, t * 0.001 * speed);
      gl.uniform1f(locs.grain, grain);

      const flat = new Float32Array(colors.slice(0, 3).flatMap(hexToRgb));
      gl.uniform3fv(locs.colors, flat);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (!document.hidden && isInView && !raf) {
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (isInView && !document.hidden) {
      raf = requestAnimationFrame(render);
    }

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      gl.deleteProgram(program);
    };
  }, [colors, speed, grain, isInView, isHigh, isMedium, isLow, isMobile, dprCap]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={cn("relative w-full overflow-hidden bg-[#010103]", className)}
    >
      {isLow ? (
        <div 
          className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(185,28,28,0.25)_0%,_rgba(1,1,3,1)_70%)] pointer-events-none"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center" />
    </div>
  );
};

export default Auralis;
