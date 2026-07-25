export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-[#03030c]/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-400 flex items-center justify-center text-xs font-bold text-white">
            E
          </div>
          <span className="font-semibold tracking-tight text-white">EveReach</span>
          <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">v1.0</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </div>
          <a
            href="#contact"
            className="text-xs font-medium bg-white text-slate-950 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
}
