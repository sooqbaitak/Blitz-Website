// BLITZ GAMING — logo
import { Link } from 'react-router-dom';
import { useApp } from '../lib/AppContext';

export function FlashIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#101016" />
      <rect width="64" height="64" rx="14" fill="none" stroke="#24242c" />
      <path d="M37 8 L18 38 H30.5 L26 56 L46 27 H33.5 Z" fill="url(#lg)" stroke="#00a8ff" strokeWidth="1.4" strokeLinejoin="round" />
      <defs>
        <linearGradient id="lg" x1="18" y1="8" x2="46" y2="56">
          <stop offset="0" stopColor="#00a8ff" />
          <stop offset="0.55" stopColor="#2fd6ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const { db } = useApp();
  return (
    <Link to="/" className="flex select-none items-center gap-2 shrink-0" aria-label="BLITZ GAMING — home">
      {db.store.logoUrl ? <img src={db.store.logoUrl} alt={db.store.nameEn || 'BLITZ GAMING'} className={`${compact ? 'h-[30px] w-[30px]' : 'h-9 w-9'} rounded-lg object-contain`} /> : <FlashIcon size={compact ? 30 : 36} />}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[22px] font-bold tracking-[0.08em] text-white">
            BLITZ<span className="text-electric"> GAMING</span>
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-mute mt-0.5">Blitz Gaming · بلتز قيمنق</span>
        </span>
      )}
    </Link>
  );
}
