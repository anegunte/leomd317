type LoaderVariant = 'cards' | 'gallery' | 'rows' | 'wide';

interface PageDataLoaderProps {
  label?: string;
  variant?: LoaderVariant;
  className?: string;
}

/** Consistent gold-accented placeholder shown while client-side API data arrives. */
export default function PageDataLoader({
  label = 'Synchronizing leadership network',
  variant = 'cards',
  className = '',
}: PageDataLoaderProps) {
  const cardCount = variant === 'gallery' ? 3 : variant === 'wide' ? 2 : 4;
  const gridClass = variant === 'wide'
    ? 'grid-cols-1 lg:grid-cols-2'
    : variant === 'gallery'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  if (variant === 'rows') {
    return (
      <div className={`animate-pulse space-y-6 ${className}`} role="status" aria-live="polite" aria-label={label}>
        <LoaderLabel label={label} />
        {[0, 1, 2].map((item) => (
          <div key={item} className="glass-panel rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gold-primary/15" />
                <div className="h-5 w-52 rounded bg-white/10" />
              </div>
              <div className="h-5 w-5 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`animate-pulse ${className}`} role="status" aria-live="polite" aria-label={label}>
      <LoaderLabel label={label} />
      <div className={`grid ${gridClass} gap-6 sm:gap-8`}>
        {Array.from({ length: cardCount }).map((_, item) => (
          <div key={item} className={`glass-panel overflow-hidden border border-white/5 ${variant === 'wide' ? 'min-h-[300px] rounded-3xl p-8' : 'min-h-[300px] rounded-3xl'}`}>
            {variant === 'gallery' ? (
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-bg-deep-space" />
            ) : (
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-bg-deep-space" />
            )}
            <div className={variant === 'wide' ? 'space-y-4' : 'space-y-3 p-6'}>
              <div className="h-4 w-24 rounded bg-gold-primary/15" />
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-full rounded bg-white/[0.07]" />
              <div className="h-3 w-4/5 rounded bg-white/[0.07]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoaderLabel({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light/80">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-primary shadow-[0_0_10px_rgba(226,188,45,0.95)]" />
      {label}
    </div>
  );
}
