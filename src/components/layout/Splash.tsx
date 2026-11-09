/**
 * Atelier One intro splash. Pure server markup + CSS/SVG animation
 * (styles/splash.css). It is hidden by default; the inline script in the
 * root layout reveals it once per browser session (never with reduced
 * motion) and removes it after ~2.6 s, on click, or on Escape.
 *
 * Choreography: ring draws → the brass "A" is drawn → the running-stitch
 * crossbar is stitched left to right → the needle eye opens → the thread
 * sweeps out to its knot → the wordmark rises with a gold shimmer.
 */
export function Splash() {
  return (
    <div className="ao-splash" data-splash role="status" aria-live="polite" aria-label="Loading Atelier One">
      <div className="ao-splash__pattern" aria-hidden="true" />
      <div className="ao-splash__light" aria-hidden="true" />

      <div className="ao-splash__inner">
        <div className="ao-splash__stage">
          <div className="ao-splash__glow" aria-hidden="true" />

          <svg className="ao-splash__art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="aoRing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--sp-ring-strong)" }} />
                <stop offset="0.5" style={{ stopColor: "var(--sp-ring-soft)" }} />
                <stop offset="1" style={{ stopColor: "var(--sp-ring-strong)" }} />
              </linearGradient>
              {/* Polished brass, banded like the logo's gradient. */}
              <linearGradient id="aoGold" gradientUnits="userSpaceOnUse" x1="8" y1="6" x2="40" y2="42">
                <stop offset="0" style={{ stopColor: "var(--sp-metal-1)" }} />
                <stop offset="0.35" style={{ stopColor: "var(--sp-metal-2)" }} />
                <stop offset="0.6" style={{ stopColor: "var(--sp-metal-4)" }} />
                <stop offset="1" style={{ stopColor: "var(--sp-metal-3)" }} />
              </linearGradient>
              {/* Light sweep that glides across the mark once it is drawn. */}
              <linearGradient id="aoSheen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="48" y2="0">
                <stop offset="0.38" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
                <stop offset="0.62" stopColor="#fff" stopOpacity="0" />
                <animateTransform attributeName="gradientTransform" type="translate" values="-48 0; 48 0; 48 0" keyTimes="0; 0.55; 1" dur="2.8s" begin="2s" repeatCount="indefinite" />
              </linearGradient>
            </defs>

            <g className="ao-splash__lattice">
              <rect x="125" y="125" width="150" height="150" />
              <rect x="125" y="125" width="150" height="150" transform="rotate(45 200 200)" />
              <circle cx="200" cy="200" r="118" />
            </g>

            <circle className="ao-splash__ring" cx="200" cy="200" r="150" stroke="url(#aoRing)" pathLength={1} />

            {/* The mark: logo geometry (48-unit grid) scaled ×3.8 around the centre. */}
            <g transform="translate(103 118) scale(3.8)" strokeLinecap="round" strokeLinejoin="round">
              <g className="ao-splash__mark">
                <path className="ao-splash__legs" d="M14.5 36 L24 11.5 L33.5 36" stroke="url(#aoGold)" strokeWidth="4.2" pathLength={1} />
                {/* Running-stitch crossbar: three stitches appear left to right. */}
                <path className="ao-splash__stitch" d="M18.4 27.6 H21" stroke="url(#aoGold)" strokeWidth="2.8" />
                <path className="ao-splash__stitch" d="M23.2 27.6 H25.8" stroke="url(#aoGold)" strokeWidth="2.8" />
                <path className="ao-splash__stitch" d="M28 27.6 H29.6" stroke="url(#aoGold)" strokeWidth="2.8" />
                <ellipse className="ao-splash__eye" cx="24" cy="16.2" rx="1.05" ry="2.3" />
                <path className="ao-splash__thread" d="M24 11.5 C27.5 6.2 34.5 5.8 36.4 10.6" stroke="url(#aoGold)" strokeWidth="1.6" pathLength={1} />
                <circle className="ao-splash__knot" cx="36.6" cy="11.6" r="1.5" fill="url(#aoGold)" />
              </g>
              {/* Sheen pass over the same strokes. */}
              <g className="ao-splash__sheen" stroke="url(#aoSheen)">
                <path d="M14.5 36 L24 11.5 L33.5 36" strokeWidth="4.2" />
                <path d="M24 11.5 C27.5 6.2 34.5 5.8 36.4 10.6" strokeWidth="1.6" />
              </g>
            </g>
          </svg>

          <div className="ao-splash__comet" aria-hidden="true" />
          <span className="ao-splash__flare ao-splash__flare--top" aria-hidden="true" />
          <span className="ao-splash__flare ao-splash__flare--bottom" aria-hidden="true" />
        </div>

        <p className="ao-splash__word">
          Atelier <span className="ao-splash__metal">One</span>
        </p>
        <p className="ao-splash__caption">Tailoring Business Suite</p>
        <div className="ao-splash__progress" aria-hidden="true"><span /></div>
        <span className="ao-splash__skip">Click or press Esc to skip</span>
      </div>
    </div>
  );
}
