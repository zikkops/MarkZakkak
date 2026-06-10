export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 text-white backdrop-blur-2xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] px-10 py-8 shadow-[0_0_80px_rgba(77,163,255,0.2)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(77,163,255,0.18),transparent)] animate-pulse" />

        <div className="relative z-10 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
            Loading
          </p>

          <h2 className="font-heading text-4xl font-black">
            MZ<span className="text-[#4DA3FF]">.</span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-[loadingBar_1s_ease-in-out_infinite] rounded-full bg-[#4DA3FF]" />
          </div>
        </div>
      </div>
    </div>
  );
}