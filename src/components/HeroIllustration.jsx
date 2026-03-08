export default function HeroIllustration() {
  return (
    <svg
      viewBox="-18 -8 532 394"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-illustration"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hChartLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="hChartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hBtnGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <filter id="hMainShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1e3a8a" floodOpacity="0.1" />
        </filter>
        <filter id="hCardShadow" x="-15%" y="-15%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#1e3a8a" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="248" cy="190" rx="220" ry="175" fill="#eff6ff" opacity="0.5" />

      {/* ── Main browser window ── */}
      <rect x="60" y="60" width="272" height="206" rx="14" fill="white" stroke="#dbeafe" strokeWidth="1.5" filter="url(#hMainShadow)" />

      {/* Browser header bar */}
      <rect x="60" y="60" width="272" height="34" rx="14" fill="#eff6ff" />
      <rect x="60" y="80" width="272" height="14" fill="#eff6ff" />

      {/* Traffic-light dots */}
      <circle cx="80"  cy="77" r="4.5" fill="#bfdbfe" />
      <circle cx="95"  cy="77" r="4.5" fill="#93c5fd" />
      <circle cx="110" cy="77" r="4.5" fill="#60a5fa" />

      {/* URL bar */}
      <rect x="130" y="68" width="140" height="15" rx="7.5" fill="white" stroke="#dbeafe" strokeWidth="1" />

      {/* ── Metric tiles ── */}
      <rect x="78"  y="104" width="74" height="42" rx="8" fill="#f0f7ff" stroke="#dbeafe" strokeWidth="1" />
      <text x="87"  y="119" fontSize="7"  fill="#475569" fontFamily="system-ui, sans-serif">Traffic</text>
      <text x="87"  y="136" fontSize="13" fontWeight="700" fill="#2563eb" fontFamily="Outfit, system-ui, sans-serif">+218%</text>

      <rect x="163" y="104" width="70" height="42" rx="8" fill="#f0f7ff" stroke="#dbeafe" strokeWidth="1" />
      <text x="172" y="119" fontSize="7"  fill="#475569" fontFamily="system-ui, sans-serif">Leads</text>
      <text x="172" y="136" fontSize="13" fontWeight="700" fill="#2563eb" fontFamily="Outfit, system-ui, sans-serif">3.8×</text>

      <rect x="244" y="104" width="70" height="42" rx="8" fill="#f0f7ff" stroke="#dbeafe" strokeWidth="1" />
      <text x="253" y="119" fontSize="7"  fill="#475569" fontFamily="system-ui, sans-serif">Rating</text>
      <text x="253" y="136" fontSize="13" fontWeight="700" fill="#f59e0b" fontFamily="Outfit, system-ui, sans-serif">4.9★</text>

      {/* ── Line chart ── */}
      <rect x="78" y="158" width="234" height="82" rx="8" fill="#f8faff" stroke="#dbeafe" strokeWidth="1" />

      {/* Grid lines */}
      <line x1="84" y1="197" x2="306" y2="197" stroke="#e0ecff" strokeWidth="0.75" />
      <line x1="84" y1="178" x2="306" y2="178" stroke="#e0ecff" strokeWidth="0.75" />

      {/* Fill area */}
      <path
        d="M84 228 L118 218 L152 207 L186 193 L220 179 L254 168 L288 160 L288 236 L84 236 Z"
        fill="url(#hChartArea)"
      />

      {/* Line */}
      <path
        d="M84 228 L118 218 L152 207 L186 193 L220 179 L254 168 L288 160"
        stroke="url(#hChartLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      <circle cx="84"  cy="228" r="3"   fill="#2563eb" />
      <circle cx="152" cy="207" r="3"   fill="#2563eb" />
      <circle cx="220" cy="179" r="3"   fill="#0ea5e9" />
      <circle cx="288" cy="160" r="4.5" fill="white" stroke="#2563eb" strokeWidth="2" />

      {/* ── Review card — top right, floating ── */}
      <rect x="328" y="22" width="154" height="90" rx="12" fill="white" stroke="#dbeafe" strokeWidth="1.5" filter="url(#hCardShadow)" />
      <rect x="328" y="22" width="154" height="30" rx="12" fill="url(#hBtnGrad)" />
      <rect x="328" y="40"  width="154" height="12" fill="url(#hBtnGrad)" />
      <text x="342" y="41" fontSize="9" fontWeight="600" fill="white" fontFamily="system-ui, sans-serif">New Reviews</text>
      <text x="342" y="70" fontSize="22" fontWeight="700" fill="#0f172a" fontFamily="Outfit, system-ui, sans-serif">+47</text>
      <text x="380" y="70" fontSize="13" fill="#fbbf24">★★★★★</text>
      <text x="342" y="86" fontSize="7.5" fill="#64748b" fontFamily="system-ui, sans-serif">this month · all 5-star</text>

      {/* ── Map / Local SEO card — bottom left, floating ── */}
      <rect x="4" y="214" width="136" height="82" rx="12" fill="white" stroke="#dbeafe" strokeWidth="1.5" filter="url(#hCardShadow)" />
      {/* Location pin */}
      <path d="M24 242c0-8.3 6.7-15 15-15s15 6.7 15 15c0 10-15 23-15 23s-15-13-15-23z" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
      <path d="M30 242c0-5 4-9 9-9s9 4 9 9c0 6.2-9 14.5-9 14.5s-9-8.3-9-14.5z" fill="#2563eb" />
      <circle cx="39" cy="242" r="3" fill="white" />
      <text x="57" y="238" fontSize="9"   fontWeight="600" fill="#0f172a" fontFamily="system-ui, sans-serif">#1 on Google</text>
      <text x="57" y="251" fontSize="8"   fill="#64748b" fontFamily="system-ui, sans-serif">Maps · Local Pack</text>
      <text x="16" y="281" fontSize="7.5" fill="#64748b" fontFamily="system-ui, sans-serif">50+ local citations built</text>

      {/* ── PageSpeed card — bottom right, floating ── */}
      <rect x="328" y="252" width="152" height="82" rx="12" fill="white" stroke="#dbeafe" strokeWidth="1.5" filter="url(#hCardShadow)" />
      <text x="344" y="273" fontSize="8.5" fill="#64748b" fontFamily="system-ui, sans-serif">PageSpeed Score</text>
      <text x="344" y="304" fontSize="30"  fontWeight="700" fill="#2563eb" fontFamily="Outfit, system-ui, sans-serif">94</text>
      <text x="392" y="298" fontSize="9"   fontWeight="600" fill="#22c55e" fontFamily="system-ui, sans-serif">↑ A+</text>
      <rect x="344" y="312" width="118" height="5" rx="2.5" fill="#dbeafe" />
      <rect x="344" y="312" width="111" height="5" rx="2.5" fill="url(#hChartLine)" />
    </svg>
  )
}
