'use client';

import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   CivicLens AI – Animated Canvas Hero Background
   • India map outline drawn from AI neural-network nodes
   • Flowing data packets along node edges
   • Drifting particle field
   • Pulsing glow rings on nodes
   • Soft gradient lighting that breathes
   • Seamless 18-second loop, 60fps
   • Centre area kept clean for page content
───────────────────────────────────────────────────────────────── */

// ─── India map: approximate lat/lon → normalised (0-1) x,y coords
// Points trace the outer coastline + borders, then interior state capitals
const INDIA_OUTLINE: [number, number][] = [
  // Kashmir / North
  [0.470, 0.068], [0.498, 0.055], [0.520, 0.060], [0.540, 0.072],
  [0.555, 0.088], [0.565, 0.108], [0.558, 0.125], [0.542, 0.140],
  [0.522, 0.148], [0.504, 0.155], [0.488, 0.162],
  // North-East states
  [0.565, 0.108], [0.585, 0.098], [0.608, 0.105], [0.628, 0.118],
  [0.642, 0.133], [0.648, 0.150], [0.635, 0.162], [0.620, 0.170],
  [0.605, 0.162],
  // East coast going south
  [0.628, 0.118], [0.635, 0.162], [0.640, 0.200], [0.648, 0.240],
  [0.655, 0.280], [0.658, 0.320], [0.652, 0.360], [0.644, 0.400],
  [0.632, 0.440], [0.618, 0.478], [0.600, 0.515], [0.582, 0.548],
  [0.562, 0.578], [0.542, 0.605], [0.522, 0.628], [0.505, 0.648],
  [0.490, 0.668], [0.478, 0.688], [0.468, 0.706],
  // Southern tip
  [0.468, 0.706], [0.460, 0.722], [0.452, 0.738], [0.446, 0.752],
  [0.444, 0.764], [0.449, 0.774], [0.458, 0.780],
  // West coast going north
  [0.458, 0.780], [0.466, 0.764], [0.472, 0.748], [0.478, 0.730],
  [0.484, 0.710], [0.490, 0.688], [0.494, 0.662], [0.498, 0.635],
  [0.502, 0.605], [0.506, 0.572], [0.510, 0.538], [0.512, 0.502],
  [0.510, 0.465], [0.504, 0.428], [0.500, 0.390], [0.496, 0.352],
  [0.492, 0.312], [0.488, 0.272], [0.484, 0.235], [0.480, 0.200],
  // Gujarat peninsula
  [0.484, 0.235], [0.468, 0.240], [0.450, 0.250], [0.432, 0.262],
  [0.418, 0.274], [0.408, 0.288], [0.402, 0.305], [0.408, 0.320],
  [0.420, 0.330], [0.434, 0.334], [0.448, 0.328], [0.460, 0.318],
  [0.472, 0.305], [0.480, 0.292], [0.484, 0.272],
  // Western / Pakistan border going north
  [0.480, 0.200], [0.472, 0.185], [0.462, 0.168], [0.450, 0.150],
  [0.440, 0.132], [0.432, 0.115], [0.428, 0.097], [0.430, 0.080],
  [0.440, 0.068], [0.452, 0.062], [0.465, 0.062], [0.470, 0.068],
];

// State capital / major city nodes (interior connection points)
const CITY_NODES: { x: number; y: number; name: string; size: number }[] = [
  { x: 0.497, y: 0.182, name: 'Delhi',         size: 5.5 },
  { x: 0.480, y: 0.345, name: 'Mumbai',        size: 5   },
  { x: 0.520, y: 0.545, name: 'Bengaluru',     size: 4.5 },
  { x: 0.534, y: 0.462, name: 'Hyderabad',     size: 4.5 },
  { x: 0.520, y: 0.510, name: 'Chennai',       size: 4.5 },
  { x: 0.600, y: 0.282, name: 'Kolkata',       size: 4.5 },
  { x: 0.490, y: 0.310, name: 'Ahmedabad',     size: 4   },
  { x: 0.504, y: 0.382, name: 'Pune',          size: 4   },
  { x: 0.488, y: 0.208, name: 'Jaipur',        size: 4   },
  { x: 0.528, y: 0.218, name: 'Lucknow',       size: 4   },
  { x: 0.572, y: 0.235, name: 'Patna',         size: 3.5 },
  { x: 0.548, y: 0.298, name: 'Bhubaneswar',   size: 3.5 },
  { x: 0.518, y: 0.268, name: 'Bhopal',        size: 3.5 },
  { x: 0.600, y: 0.165, name: 'Guwahati',      size: 3.5 },
  { x: 0.462, y: 0.108, name: 'Srinagar',      size: 3.5 },
  { x: 0.456, y: 0.618, name: 'Thiruvanant',   size: 3.5 },
  { x: 0.548, y: 0.335, name: 'Raipur',        size: 3   },
  { x: 0.474, y: 0.255, name: 'Udaipur',       size: 3   },
  { x: 0.510, y: 0.175, name: 'Chandigarh',    size: 3   },
  { x: 0.536, y: 0.192, name: 'Dehradun',      size: 3   },
];

// Edges between city nodes (index pairs)
const CITY_EDGES: [number, number][] = [
  [0,1],[0,8],[0,9],[0,18],[0,19],[1,3],[1,6],[1,7],[1,16],
  [2,3],[2,4],[2,15],[3,4],[3,7],[3,16],[4,7],[5,9],[5,11],
  [5,13],[6,7],[7,1],[8,9],[9,10],[9,17],[10,11],[11,16],
  [12,16],[12,9],[13,5],[14,8],[15,4],[16,11],[17,6],[18,19],
];

type Particle = {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; color: string; life: number; maxLife: number;
};

type DataPacket = {
  edgeIdx: number; t: number; speed: number; alpha: number; color: string;
};

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize handler ──────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Colour palette ───────────────────────────────────────────
    const BLUE    = '#2563EB';
    const INDIGO  = '#4F46E5';
    const EMERALD = '#10B981';
    const AMBER   = '#F59E0B';
    const PACKET_COLORS = [BLUE, INDIGO, EMERALD, AMBER];

    // ── Particles ────────────────────────────────────────────────
    const MAX_PARTICLES = 90;
    const particles: Particle[] = [];

    const spawnParticle = (): Particle => ({
      x:       Math.random(),
      y:       Math.random(),
      vx:      (Math.random() - 0.5) * 0.00015,
      vy:      (Math.random() - 0.5) * 0.00015 - 0.00005,
      size:    Math.random() * 2.2 + 0.6,
      alpha:   Math.random() * 0.5 + 0.2,
      color:   PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)],
      life:    0,
      maxLife: Math.random() * 400 + 200,
    });

    for (let i = 0; i < MAX_PARTICLES; i++) particles.push(spawnParticle());

    // ── Data packets flowing along edges ─────────────────────────
    const MAX_PACKETS = 30;
    const packets: DataPacket[] = [];
    for (let i = 0; i < MAX_PACKETS; i++) {
      packets.push({
        edgeIdx: Math.floor(Math.random() * CITY_EDGES.length),
        t:       Math.random(),
        speed:   Math.random() * 0.0012 + 0.0004,
        alpha:   Math.random() * 0.7 + 0.3,
        color:   PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)],
      });
    }

    // ── Pulse rings on nodes ──────────────────────────────────────
    const pulsePhases = CITY_NODES.map(() => Math.random() * Math.PI * 2);

    // ── Draw helpers ──────────────────────────────────────────────
    const toScreen = (nx: number, ny: number) => ({
      sx: nx * canvas.width,
      sy: ny * canvas.height,
    });

    // Glow using shadow
    const glowCircle = (
      x: number, y: number, r: number,
      fillColor: string, glowColor: string,
      glowBlur: number, alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur  = glowBlur;
      ctx.fillStyle   = fillColor;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgba = (hex: string, a: number) => {
      const { r, g, b } = hexToRgb(hex);
      return `rgba(${r},${g},${b},${a})`;
    };

    // ── Main draw loop ────────────────────────────────────────────
    const draw = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000; // seconds

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // ── 1. Base gradient background ──────────────────────────
      const isDark = document.documentElement.classList.contains('dark');
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      if (isDark) {
        bgGrad.addColorStop(0,   '#030712');
        bgGrad.addColorStop(0.5, '#090D1E');
        bgGrad.addColorStop(1,   '#0B132B');
      } else {
        bgGrad.addColorStop(0,   '#F8FAFF');
        bgGrad.addColorStop(0.5, '#F4F8FF');
        bgGrad.addColorStop(1,   '#EEF5FF');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Breathing radial glows ────────────────────────────
      const breathe = Math.sin(elapsed * 0.35) * 0.5 + 0.5; // 0-1 slow breathe

      // Top-right blue glow
      const blueGrad = ctx.createRadialGradient(W * 0.85, H * 0.05, 0, W * 0.85, H * 0.05, W * 0.45);
      blueGrad.addColorStop(0, rgba(BLUE,   isDark ? (0.16 + breathe * 0.08) : (0.10 + breathe * 0.06)));
      blueGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = blueGrad;
      ctx.fillRect(0, 0, W, H);

      // Bottom-left indigo glow
      const indGrad = ctx.createRadialGradient(W * 0.08, H * 0.92, 0, W * 0.08, H * 0.92, W * 0.42);
      indGrad.addColorStop(0, rgba(INDIGO, isDark ? (0.14 + breathe * 0.06) : (0.08 + breathe * 0.05)));
      indGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = indGrad;
      ctx.fillRect(0, 0, W, H);

      // Emerald mid-right accent
      const emGrad = ctx.createRadialGradient(W * 0.9, H * 0.55, 0, W * 0.9, H * 0.55, W * 0.25);
      emGrad.addColorStop(0, rgba(EMERALD, isDark ? 0.06 : 0.04));
      emGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = emGrad;
      ctx.fillRect(0, 0, W, H);

      // ── 3. Subtle dotted grid ────────────────────────────────
      const gridAlpha = isDark ? 0.05 : 0.08;
      const gridSpacing = 28;
      ctx.fillStyle = rgba(BLUE, gridAlpha);
      for (let gx = 0; gx < W; gx += gridSpacing) {
        for (let gy = 0; gy < H; gy += gridSpacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 4. India outline path (very low opacity) ─────────────
      ctx.save();
      ctx.globalAlpha = isDark ? 0.09 : 0.07;
      ctx.strokeStyle = BLUE;
      ctx.lineWidth   = 1.2;
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = -(elapsed * 4) % 10; // animate dash
      ctx.beginPath();
      INDIA_OUTLINE.forEach(([nx, ny], i) => {
        const { sx, sy } = toScreen(nx, ny);
        if (i === 0) ctx.moveTo(sx, sy);
        else         ctx.lineTo(sx, sy);
      });
      ctx.stroke();
      ctx.restore();

      // ── 5. City-edge connection lines ────────────────────────
      ctx.save();
      ctx.lineWidth = 1;
      CITY_EDGES.forEach(([a, b]) => {
        const na = CITY_NODES[a];
        const nb = CITY_NODES[b];
        const { sx: ax, sy: ay } = toScreen(na.x, na.y);
        const { sx: bx, sy: by } = toScreen(nb.x, nb.y);

        const lineGrad = ctx.createLinearGradient(ax, ay, bx, by);
        lineGrad.addColorStop(0,   rgba(BLUE,   isDark ? 0.18 : 0.12));
        lineGrad.addColorStop(0.5, rgba(INDIGO, isDark ? 0.22 : 0.15));
        lineGrad.addColorStop(1,   rgba(BLUE,   isDark ? 0.18 : 0.12));
        ctx.strokeStyle = lineGrad;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -(elapsed * 8) % 10;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();

      // ── 6. City nodes with pulse rings ───────────────────────
      CITY_NODES.forEach((node, idx) => {
        const { sx, sy } = toScreen(node.x, node.y);
        const phase = pulsePhases[idx];
        const pulse = (Math.sin(elapsed * 1.8 + phase) + 1) / 2; // 0-1

        // Outer pulse ring
        const ringR = node.size * 3.5 + pulse * node.size * 3;
        ctx.save();
        ctx.globalAlpha = (1 - pulse) * (isDark ? 0.35 : 0.22);
        ctx.strokeStyle = BLUE;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Core node glow
        glowCircle(sx, sy, node.size * 1.8, rgba(BLUE, 0.4), BLUE, 12, isDark ? 0.55 : 0.35);

        // Core node dot
        glowCircle(sx, sy, node.size * 0.8, rgba(BLUE, 1), BLUE, 6, isDark ? 0.9 : 0.7);
      });

      // ── 7. Flowing data packets along edges ──────────────────
      packets.forEach((pkt) => {
        pkt.t += pkt.speed;
        if (pkt.t > 1) {
          pkt.t = 0;
          pkt.edgeIdx = Math.floor(Math.random() * CITY_EDGES.length);
          pkt.color   = PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)];
        }

        const [a, b] = CITY_EDGES[pkt.edgeIdx];
        if (!CITY_NODES[a] || !CITY_NODES[b]) return;
        const na = CITY_NODES[a];
        const nb = CITY_NODES[b];
        const { sx: ax, sy: ay } = toScreen(na.x, na.y);
        const { sx: bx, sy: by } = toScreen(nb.x, nb.y);

        const px = ax + (bx - ax) * pkt.t;
        const py = ay + (by - ay) * pkt.t;

        // Tail
        const tailLen = 24;
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const tx  = px - (dx / len) * tailLen * pkt.t;
        const ty  = py - (dy / len) * tailLen * pkt.t;

        const tailGrad = ctx.createLinearGradient(tx, ty, px, py);
        tailGrad.addColorStop(0,   rgba(pkt.color, 0));
        tailGrad.addColorStop(1,   rgba(pkt.color, pkt.alpha * (isDark ? 0.7 : 0.5)));

        ctx.save();
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth   = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Head dot
        glowCircle(px, py, 2.5, rgba(pkt.color, pkt.alpha), pkt.color, 8, isDark ? 0.8 : 0.6);
        ctx.restore();
      });

      // ── 8. Drifting background particles ─────────────────────
      particles.forEach((p, idx) => {
        p.x    += p.vx;
        p.y    += p.vy;
        p.life += 1;

        if (p.life > p.maxLife || p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) {
          particles[idx] = spawnParticle();
          return;
        }

        const lifeFade = Math.min(p.life / 40, 1) * Math.min((p.maxLife - p.life) / 40, 1);
        const { sx, sy } = toScreen(p.x, p.y);

        ctx.save();
        ctx.globalAlpha = p.alpha * lifeFade * (isDark ? 0.7 : 0.45);
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 4;
        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── 9. Light ray diagonals (very subtle) ─────────────────
      const rayAlpha = (Math.sin(elapsed * 0.2) * 0.3 + 0.7) * (isDark ? 0.015 : 0.012);
      ctx.save();
      ctx.filter = 'blur(40px)';
      ctx.globalAlpha = rayAlpha;
      ctx.fillStyle = rgba(BLUE, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(W * 0.35, 0);
      ctx.lineTo(W * 0.55, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 10. Holographic shimmer sweep (very slow) ────────────
      const shimmerX = ((elapsed * 0.05) % 1.3 - 0.15) * W;
      const shimGrad = ctx.createLinearGradient(shimmerX - 80, 0, shimmerX + 80, H);
      shimGrad.addColorStop(0,   'rgba(255,255,255,0)');
      shimGrad.addColorStop(0.5, `rgba(255,255,255,${isDark ? 0.015 : 0.025})`);
      shimGrad.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = shimGrad;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* ── Canvas animated background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* ── Glassmorphism floating badges (xl screens) ── */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">

        {/* Top-left: Government Schemes */}
        <div className="absolute top-10 left-6 animate-float-slow">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-blue-700 dark:text-blue-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-blue-100/80 dark:bg-blue-900/60 flex items-center justify-center text-sm">✓</span>
            Government Schemes
          </div>
        </div>

        {/* Top-right: AI Assistant */}
        <div className="absolute top-10 right-6 animate-float-delayed">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-indigo-700 dark:text-indigo-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/60 flex items-center justify-center text-sm">✦</span>
            AI Assistant
          </div>
        </div>

        {/* Mid-left: Document Verification */}
        <div className="absolute top-[30%] left-4 animate-float-delayed">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-emerald-700 dark:text-emerald-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-900/60 flex items-center justify-center text-sm">🛡</span>
            Document Verification
          </div>
        </div>

        {/* Mid-right: Eligibility */}
        <div className="absolute top-[30%] right-4 animate-float-slow">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-sky-700 dark:text-sky-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-sky-100/80 dark:bg-sky-900/60 flex items-center justify-center text-sm">📋</span>
            Eligibility
          </div>
        </div>

        {/* Mid-left lower: Gemini AI */}
        <div className="absolute top-[56%] left-4 animate-float-slow">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-amber-700 dark:text-amber-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-amber-100/80 dark:bg-amber-900/60 flex items-center justify-center text-sm">⟡</span>
            Gemini AI
          </div>
        </div>

        {/* Mid-right lower: Google Cloud */}
        <div className="absolute top-[56%] right-4 animate-float-delayed">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-sky-700 dark:text-sky-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-sky-100/80 dark:bg-sky-900/60 flex items-center justify-center text-sm">☁</span>
            Google Cloud
          </div>
        </div>

        {/* Bottom-left: Multilingual */}
        <div className="absolute bottom-20 left-8 animate-float-delayed">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-indigo-700 dark:text-indigo-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/60 flex items-center justify-center text-sm">🌐</span>
            Multilingual
          </div>
        </div>

        {/* Bottom-right: Office Locator */}
        <div className="absolute bottom-20 right-8 animate-float-slow">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
            bg-white/72 dark:bg-slate-900/72
            border border-white/80 dark:border-slate-700/50
            shadow-xl backdrop-blur-xl text-xs font-bold
            text-blue-700 dark:text-blue-300 select-none">
            <span className="w-7 h-7 rounded-lg bg-blue-100/80 dark:bg-blue-900/60 flex items-center justify-center text-sm">📍</span>
            Office Locator
          </div>
        </div>
      </div>
    </>
  );
};
