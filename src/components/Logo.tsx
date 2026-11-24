import React, { useEffect, useState } from 'react';

export const OFFICIAL_LOGO_SRC = '/assets/aistudio/capital61-___ea07a700.jpg';

// Exact bounding box of the logo inside the 3840x2160 master asset (with subtle breathing room)
const LOGO_CROP = {
  sx: 548,
  sy: 750,
  sw: 2757,
  sh: 624,
  outW: 1378,
  outH: 312,
};

const EMBLEM_CROP = {
  sx: 548,
  sy: 750,
  sw: 465,
  sh: 624,
  outW: 232,
  outH: 312,
};

let cachedFullLogoPromise: Promise<string> | null = null;
let cachedEmblemPromise: Promise<string> | null = null;

function extractTransparentAsset(crop: typeof LOGO_CROP): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('No window'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = crop.outW;
        canvas.height = crop.outH;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('2D context unavailable'));
          return;
        }

        ctx.drawImage(
          img,
          crop.sx,
          crop.sy,
          crop.sw,
          crop.sh,
          0,
          0,
          crop.outW,
          crop.outH
        );

        const imageData = ctx.getImageData(0, 0, crop.outW, crop.outH);
        const data = imageData.data;

        const bgCutoff = 16;
        const rampEnd = 185;
        const rampSpan = rampEnd - bgCutoff;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxC = r > g ? (r > b ? r : b) : (g > b ? g : b);

          if (maxC <= bgCutoff) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 0;
          } else if (maxC < rampEnd) {
            const alphaNorm = (maxC - bgCutoff) / rampSpan;
            const alpha = Math.round(alphaNorm * 255);
            const invAlpha = 1 / Math.max(alphaNorm, 0.08);
            data[i] = Math.min(255, Math.round(r * invAlpha));
            data[i + 1] = Math.min(255, Math.round(g * invAlpha));
            data[i + 2] = Math.min(255, Math.round(b * invAlpha));
            data[i + 3] = alpha;
          } else {
            data[i + 3] = 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
    img.src = OFFICIAL_LOGO_SRC;
  });
}

function getTransparentFullLogo(): Promise<string> {
  if (!cachedFullLogoPromise) {
    cachedFullLogoPromise = extractTransparentAsset(LOGO_CROP);
  }
  return cachedFullLogoPromise;
}

function getTransparentEmblem(): Promise<string> {
  if (!cachedEmblemPromise) {
    cachedEmblemPromise = extractTransparentAsset(EMBLEM_CROP);
  }
  return cachedEmblemPromise;
}

interface LogoProps {
  variant?: 'primary' | 'black' | 'white' | 'gold-all';
  showTagline?: boolean;
  taglineText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
  className?: string;
}

export const Capital61Icon: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className = '', size = 44 }) => {
  const [transparentSrc, setTransparentSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    getTransparentEmblem()
      .then((url) => {
        if (active) setTransparentSrc(url);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (transparentSrc) {
    return (
      <img
        src={transparentSrc}
        alt="Capital 61 Emblem"
        draggable={false}
        style={{ height: size, width: 'auto' }}
        className={`shrink-0 select-none object-contain ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden select-none shrink-0 transition-opacity duration-150 ${
        failed ? 'opacity-100 mix-blend-lighten' : 'opacity-0'
      } ${className}`}
      style={{ width: Math.round(size * (465 / 624)), height: size }}
      aria-label="Capital 61 Emblem"
    >
      <img
        src={OFFICIAL_LOGO_SRC}
        alt="Capital 61 Emblem"
        draggable={false}
        className="absolute max-w-none pointer-events-none brightness-[1.04] contrast-[1.16]"
        style={{
          width: '826%',
          height: 'auto',
          left: '258%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  iconOnly = false,
  className = '',
}) => {
  const [transparentSrc, setTransparentSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (iconOnly) return;
    let active = true;
    getTransparentFullLogo()
      .then((url) => {
        if (active) setTransparentSrc(url);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [iconOnly]);

  const sizeClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-14 sm:h-16',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-32 md:h-36',
  };

  if (iconOnly) {
    const iconSizes = {
      sm: 28,
      md: 40,
      lg: 54,
      xl: 72,
    };
    return <Capital61Icon size={iconSizes[size]} className={className} />;
  }

  if (transparentSrc) {
    return (
      <img
        src={transparentSrc}
        alt="CAPITAL 61 — Your Finance Partner"
        draggable={false}
        className={`block w-auto max-w-full object-contain select-none ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative inline-block aspect-[2757/624] max-w-full overflow-hidden select-none transition-opacity duration-150 ${
        failed ? 'opacity-100 mix-blend-lighten' : 'opacity-0'
      } ${sizeClasses[size]} ${className}`}
      aria-label="Capital 61 — Your Finance Partner"
    >
      <img
        src={OFFICIAL_LOGO_SRC}
        alt="CAPITAL 61 — Your Finance Partner"
        draggable={false}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[139%] max-w-none h-auto pointer-events-none brightness-[1.04] contrast-[1.16]"
      />
    </div>
  );
};
