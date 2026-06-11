"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const slides = [
  {
    title: "Motion Portfolio",
    desc: "A cinematic developer portfolio built with Next.js and GSAP.",
    tags: ["Next.js", "GSAP", "UI"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    bg: "#07111f",
    glow: "#4DA3FF",
    genre: "Ambient Electronic",
    artist: "Kai Engel",
    audio: "/audio/nastelbom-electronic-electronic-bass-435079.mp3",
  },
  {
    title: "Creative Studio",
    desc: "A bold landing page concept for a digital creative agency.",
    tags: ["Branding", "Motion", "Frontend"],
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop",
    bg: "#1c0f03",
    glow: "#F97316",
    genre: "Indie Folk",
    artist: "Podington Bear",
    audio: "/audio/alexgrohl-indie-folk-15044.mp3",
  },
  {
    title: "E-Commerce Flow",
    desc: "A polished shopping experience with smooth interactions.",
    tags: ["Shop", "UX", "React"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    bg: "#052e16",
    glow: "#22C55E",
    genre: "Lo-Fi Chill",
    artist: "Broke For Free",
    audio: "/audio/fassounds-good-night-lofi-cozy-chill-music-160166.mp3",
  },
  {
    title: "D&D Encounter",
    desc: "A scroll-driven cinematic scene with video and character UI.",
    tags: ["GSAP", "Video", "Scroll"],
    image: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?q=80&w=800&auto=format&fit=crop",
    bg: "#450a0a",
    glow: "#EF4444",
    genre: "Epic Cinematic",
    artist: "Kai Engel",
    audio: "/audio/paulyudin-epic-cinematic-epic-482367.mp3",
  },
  {
    title: "Airport Experience",
    desc: "A premium landing page with refined interface motion.",
    tags: ["Landing", "GSAP", "Design"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    bg: "#2e1065",
    glow: "#A855F7",
    genre: "Smooth Jazz",
    artist: "Rolemusic",
    audio: "/audio/atlasaudio-jazz-519632.mp3",
  },
  {
    title: "Interactive Lab",
    desc: "Experimental frontend interactions and scroll-based animations.",
    tags: ["Lab", "Motion", "Creative"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    bg: "#083344",
    glow: "#00E5FF",
    genre: "Synthwave",
    artist: "Broke For Free",
    audio: "/audio/the_mountain-midnight-synthwave-317752.mp3",
  },
];

const VINYL_BG = `radial-gradient(circle at center,#1a1a1a 0 20%,transparent 21%),
  repeating-radial-gradient(circle at center,transparent 0,transparent 4px,rgba(255,255,255,0.025) 4px,rgba(255,255,255,0.025) 5px),
  #0d0d0d`;

const MINI_VINYL_BG = `radial-gradient(circle at center,#222 0 25%,transparent 26%),
  repeating-radial-gradient(circle at center,transparent 0,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px),
  #111`;

export default function Text3DCarousel() {
  const sectionRef    = useRef<HTMLElement | null>(null);
  const glowRef       = useRef<HTMLDivElement | null>(null);
  const recordRef     = useRef<HTMLDivElement | null>(null);
  const infoRef       = useRef<HTMLDivElement | null>(null);
  const imgCurrentRef = useRef<HTMLDivElement | null>(null);
  const imgNextRef    = useRef<HTMLDivElement | null>(null);
  const needleRef     = useRef<HTMLDivElement | null>(null);
  const progressRef   = useRef<HTMLDivElement | null>(null);
  const timeRef       = useRef<HTMLSpanElement | null>(null);
  const dropZoneRef   = useRef<HTMLDivElement | null>(null);

  const audioRef      = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying]           = useState(false);
  const [volume, setVolume]             = useState(0.7);
  const [muted, setMuted]               = useState(false);
  const [idx, setIdx]                   = useState(0);
  const [dragOverMain, setDragOverMain] = useState(false);

  const idxRef  = useRef(0);
  const busyRef = useRef(false);
  const rotRef  = useRef(0);
  const rafRef  = useRef<number>(0);

  const miniRotsRef = useRef<number[]>(slides.map((_, i) => i * 22));
  const miniRefsArr = useRef<(HTMLDivElement | null)[]>([]);

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const loadAudio = useCallback((slideIndex: number, autoplay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = slides[slideIndex].audio;
    audio.volume = volume;
    audio.muted = muted;
    audio.load();
    if (autoplay) {
      const p = audio.play();
      if (p) p.catch(() => {});
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [volume, muted]);

  useEffect(() => {
    const tick = () => {
      const audio = audioRef.current;
      const isPlaying = audio && !audio.paused && audio.readyState >= 2;

      if (isPlaying) {
        rotRef.current += 1.8;
        if (recordRef.current) gsap.set(recordRef.current, { rotation: rotRef.current });
        if (progressRef.current && audio.duration)
          progressRef.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        if (timeRef.current && audio.duration)
          timeRef.current.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      }

      miniRefsArr.current.forEach((el, i) => {
        if (!el) return;
        miniRotsRef.current[i] += i === idxRef.current && isPlaying ? 1.8 : 0.3;
        gsap.set(el, { rotation: miniRotsRef.current[i] });
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const glow    = glowRef.current;
    const imgC    = imgCurrentRef.current;
    const imgN    = imgNextRef.current;
    if (!section || !glow || !imgC || !imgN) return;

    gsap.set(section, { background: slides[0].bg });
    gsap.set(glow,    { backgroundColor: slides[0].glow });
    gsap.set(imgC,    { backgroundImage: `url(${slides[0].image})`, x: 0, opacity: 1 });
    gsap.set(imgN,    { backgroundImage: `url(${slides[1].image})`, x: 110, opacity: 0 });

    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const goTo = useCallback((to: number, dir: 1 | -1, autoplay = true) => {
    if (busyRef.current || to === idxRef.current) return;

    const section = sectionRef.current;
    const glow    = glowRef.current;
    const info    = infoRef.current;
    const imgC    = imgCurrentRef.current;
    const imgN    = imgNextRef.current;
    const needle  = needleRef.current;
    if (!section || !glow || !info || !imgC || !imgN) return;

    busyRef.current = true;
    const next = slides[to];
    loadAudio(to, autoplay);

    if (needle) {
      gsap.to(needle, { rotation: -22, duration: 0.28, ease: "power2.out", transformOrigin: "top right" });
      setTimeout(() => gsap.to(needle, { rotation: 0, duration: 0.4, ease: "power2.inOut", transformOrigin: "top right" }), 650);
    }

    gsap.set(imgN, { backgroundImage: `url(${next.image})`, x: dir === 1 ? 110 : -110, opacity: 1 });

    const burst = gsap.to({}, {
      duration: 0.65, ease: "power3.inOut",
      onUpdate() { rotRef.current += 7; if (recordRef.current) gsap.set(recordRef.current, { rotation: rotRef.current }); },
    });

    const tl = gsap.timeline({
      onComplete() {
        gsap.set(imgC, { backgroundImage: `url(${next.image})`, x: 0, opacity: 1 });
        gsap.set(imgN, { x: dir === 1 ? 110 : -110, opacity: 0 });
        busyRef.current = false;
        burst.kill();
      },
    });

    tl.to(info, { opacity: 0, y: -8, duration: 0.22, ease: "power2.inOut" })
      .add(() => { idxRef.current = to; setIdx(to); })
      .to(section, { background: next.bg, duration: 0.75, ease: "power2.inOut" }, 0)
      .to(glow,    { backgroundColor: next.glow, duration: 0.75, ease: "power2.inOut" }, 0)
      .to(imgC,    { x: dir === 1 ? -110 : 110, duration: 0.38, ease: "power2.inOut" }, 0)
      .to(imgN,    { x: 0, duration: 0.38, ease: "power2.inOut" }, 0)
      .fromTo(info, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
  }, [loadAudio]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src || audio.src === window.location.href) { loadAudio(idxRef.current, true); return; }
    if (audio.paused) { audio.play().catch(() => {}); setPlaying(true); }
    else              { audio.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleMiniDragStart = (e: React.DragEvent, slideIndex: number) => {
    e.dataTransfer.setData("slideIndex", String(slideIndex));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleMainDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverMain(true);
  };

  const handleMainDragLeave = () => setDragOverMain(false);

  const handleMainDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverMain(false);
    const to = parseInt(e.dataTransfer.getData("slideIndex"), 10);
    if (isNaN(to) || to === idxRef.current) return;
    goTo(to, to > idxRef.current ? 1 : -1, true);
  };

  const slide = slides[idx];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-4 py-8 text-white md:h-screen md:px-12 md:py-10"
    >
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-[110px]"
      />

      {/* ── DESKTOP layout (md+) ── */}
      <div className="relative z-10 hidden h-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">

        {/* LEFT: slide info */}
        <div ref={infoRef} className="max-w-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/35">
            {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h2 className="font-heading text-4xl font-black leading-tight md:text-5xl">{slide.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">{slide.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {slide.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/65">{tag}</span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/25">Now playing</span>
            <span className="rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{ background: `${slide.glow}22`, color: slide.glow, border: `1px solid ${slide.glow}44` }}>
              {slide.genre}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-white/30">{slide.artist}</p>
        </div>

        {/* CENTER: vinyl + controls */}
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div ref={needleRef} className="absolute -right-5 -top-3 z-20 origin-top-right"
              style={{ width:"5px", height:"72px", background:"linear-gradient(to bottom,rgba(255,255,255,0.45),rgba(255,255,255,0.08))", borderRadius:"3px", boxShadow:"0 0 6px rgba(255,255,255,0.1)" }} />
            <div ref={dropZoneRef} className="absolute inset-0 rounded-full transition-all duration-200"
              style={{ boxShadow: dragOverMain ? `0 0 0 4px ${slide.glow}, 0 0 40px ${slide.glow}66` : "none", pointerEvents:"none" }} />
            <div ref={recordRef} className="relative select-none"
              style={{ width:"260px", height:"260px", borderRadius:"50%", background:VINYL_BG, boxShadow:"0 0 60px rgba(0,0,0,0.85), inset 0 0 24px rgba(0,0,0,0.6)", cursor:"default" }}
              onDragOver={handleMainDragOver} onDragLeave={handleMainDragLeave} onDrop={handleMainDrop}>
              {[38,58,78,98,110].map((r) => (
                <div key={r} className="pointer-events-none absolute rounded-full border border-white/[0.04]" style={{ inset:`${r}px` }} />
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full" style={{ width:"100px", height:"100px" }}>
                <div ref={imgCurrentRef} className="absolute inset-0 rounded-full bg-cover bg-center" />
                <div ref={imgNextRef}    className="absolute inset-0 rounded-full bg-cover bg-center" />
                <div className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
              </div>
              {dragOverMain && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full">
                  <span className="text-[11px] uppercase tracking-widest" style={{ color:slide.glow }}>drop to play</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-[260px] space-y-2">
            <div className="relative h-[3px] w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
              onClick={(e) => {
                const audio = audioRef.current;
                if (!audio?.duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
              }}>
              <div ref={progressRef} className="h-full rounded-full" style={{ width:"0%", background:slide.glow, transition:"none" }} />
            </div>
            <div className="flex justify-between text-[10px] text-white/25">
              <span ref={timeRef}>0:00 / 0:00</span>
              <span>{slide.genre}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <button onClick={() => goTo((idxRef.current - 1 + slides.length) % slides.length, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/50 transition hover:text-white">⏮</button>
              <button onClick={togglePlay}
                className="flex h-11 w-11 items-center justify-center rounded-full border text-base font-bold text-white transition"
                style={{ background:`${slide.glow}2a`, borderColor:`${slide.glow}55` }}>
                {playing ? "⏸" : "▶"}
              </button>
              <button onClick={() => goTo((idxRef.current + 1) % slides.length, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/50 transition hover:text-white">⏭</button>
              <button onClick={toggleMute}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/50 transition hover:text-white">
                {muted ? "🔇" : "🔊"}
              </button>
              <input type="range" min={0} max={1} step={0.05} value={volume} onChange={handleVolume} className="h-1 w-14 cursor-pointer accent-white" />
            </div>
          </div>
        </div>

        {/* RIGHT: queue */}
        <div className="flex h-full w-[260px] flex-col justify-center gap-1 overflow-y-auto py-4 justify-self-end">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/25">Queue — drag to play</p>
          {slides.map((s, i) => {
            const isActive = i === idx;
            return (
              <div key={i} draggable={!isActive}
                onDragStart={(e) => handleMiniDragStart(e, i)}
                className="group flex cursor-grab items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-200 active:cursor-grabbing"
                style={{ border: isActive ? `1px solid ${s.glow}55` : "1px solid rgba(255,255,255,0.06)", background: isActive ? `${s.glow}12` : "rgba(255,255,255,0.03)", opacity: isActive ? 1 : 0.7 }}
                onClick={() => { if (!isActive) goTo(i, i > idxRef.current ? 1 : -1, true); }}>
                <div ref={(el) => { miniRefsArr.current[i] = el; }} className="relative flex-shrink-0"
                  style={{ width:"40px", height:"40px", borderRadius:"50%", background:MINI_VINYL_BG, boxShadow: isActive ? `0 0 12px ${s.glow}66` : "none" }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-cover bg-center"
                    style={{ width:"18px", height:"18px", backgroundImage:`url(${s.image})` }} />
                  <div className="absolute left-1/2 top-1/2 z-10 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  {isActive && <div className="absolute inset-0 rounded-full" style={{ boxShadow:`0 0 0 2px ${s.glow}` }} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold leading-tight" style={{ color: isActive ? s.glow : "rgba(255,255,255,0.8)" }}>{s.title}</p>
                  <p className="truncate text-[10px] text-white/35">{s.genre}</p>
                </div>
                {!isActive && <div className="flex-shrink-0 text-[10px] text-white/20 opacity-0 transition-opacity group-hover:opacity-100">⠿</div>}
                {isActive && playing && (
                  <div className="flex flex-shrink-0 items-end gap-[2px]" style={{ height:"14px" }}>
                    {[1,2,3].map((b) => (
                      <div key={b} className="w-[3px] rounded-full"
                        style={{ background:s.glow, animation:`bounce${b} 0.6s ease-in-out infinite alternate`, height:`${6+b*3}px` }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE layout (below md) ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 md:hidden">

        {/* Slide info */}
        <div ref={infoRef} className="w-full text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/35">
            {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h2 className="font-heading text-3xl font-black leading-tight">{slide.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{slide.desc}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {slide.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/65">{tag}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/25">Now playing</span>
            <span className="rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{ background:`${slide.glow}22`, color:slide.glow, border:`1px solid ${slide.glow}44` }}>
              {slide.genre}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-white/30">{slide.artist}</p>
        </div>

        {/* Vinyl */}
        <div className="relative">
          <div ref={needleRef} className="absolute -right-5 -top-3 z-20 origin-top-right"
            style={{ width:"5px", height:"60px", background:"linear-gradient(to bottom,rgba(255,255,255,0.45),rgba(255,255,255,0.08))", borderRadius:"3px" }} />
          <div ref={recordRef} className="relative select-none"
            style={{ width:"200px", height:"200px", borderRadius:"50%", background:VINYL_BG, boxShadow:"0 0 60px rgba(0,0,0,0.85), inset 0 0 24px rgba(0,0,0,0.6)" }}>
            {[28,44,60,76,86].map((r) => (
              <div key={r} className="pointer-events-none absolute rounded-full border border-white/[0.04]" style={{ inset:`${r}px` }} />
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full" style={{ width:"78px", height:"78px" }}>
              <div ref={imgCurrentRef} className="absolute inset-0 rounded-full bg-cover bg-center" />
              <div ref={imgNextRef}    className="absolute inset-0 rounded-full bg-cover bg-center" />
              <div className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-[300px] space-y-2">
          <div className="relative h-[3px] w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio?.duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
            }}>
            <div ref={progressRef} className="h-full rounded-full" style={{ width:"0%", background:slide.glow, transition:"none" }} />
          </div>
          <div className="flex justify-between text-[10px] text-white/25">
            <span ref={timeRef}>0:00 / 0:00</span>
            <span>{slide.genre}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <button onClick={() => goTo((idxRef.current - 1 + slides.length) % slides.length, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/50">⏮</button>
            <button onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full border text-base font-bold text-white"
              style={{ background:`${slide.glow}2a`, borderColor:`${slide.glow}55` }}>
              {playing ? "⏸" : "▶"}
            </button>
            <button onClick={() => goTo((idxRef.current + 1) % slides.length, 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/50">⏭</button>
            <button onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/50">
              {muted ? "🔇" : "🔊"}
            </button>
            <input type="range" min={0} max={1} step={0.05} value={volume} onChange={handleVolume} className="h-1 w-14 cursor-pointer accent-white" />
          </div>
        </div>

        {/* Queue — horizontal scroll strip on mobile */}
        <div className="w-full">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/25">Queue</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {slides.map((s, i) => {
              const isActive = i === idx;
              return (
                <button key={i}
                  className="flex flex-shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-3 py-2.5 transition-all duration-200"
                  style={{ border: isActive ? `1px solid ${s.glow}55` : "1px solid rgba(255,255,255,0.06)", background: isActive ? `${s.glow}12` : "rgba(255,255,255,0.03)", opacity: isActive ? 1 : 0.65 }}
                  onClick={() => { if (!isActive) goTo(i, i > idxRef.current ? 1 : -1, true); }}>
                  <div ref={(el) => { miniRefsArr.current[i] = el; }} className="relative"
                    style={{ width:"38px", height:"38px", borderRadius:"50%", background:MINI_VINYL_BG, boxShadow: isActive ? `0 0 12px ${s.glow}66` : "none" }}>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-cover bg-center"
                      style={{ width:"16px", height:"16px", backgroundImage:`url(${s.image})` }} />
                    <div className="absolute left-1/2 top-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                    {isActive && <div className="absolute inset-0 rounded-full" style={{ boxShadow:`0 0 0 2px ${s.glow}` }} />}
                  </div>
                  <p className="w-[60px] truncate text-center text-[10px] font-semibold" style={{ color: isActive ? s.glow : "rgba(255,255,255,0.7)" }}>
                    {s.title}
                  </p>
                  {isActive && playing && (
                    <div className="flex items-end gap-[2px]" style={{ height:"10px" }}>
                      {[1,2,3].map((b) => (
                        <div key={b} className="w-[3px] rounded-full"
                          style={{ background:s.glow, animation:`bounce${b} 0.6s ease-in-out infinite alternate`, height:`${4+b*2}px` }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce1 { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
        @keyframes bounce2 { from { transform: scaleY(0.7); } to { transform: scaleY(0.3); } }
        @keyframes bounce3 { from { transform: scaleY(0.3); } to { transform: scaleY(0.9); } }
      `}</style>
    </section>
  );
}
