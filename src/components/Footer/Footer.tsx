import { useEffect, useRef, useState } from 'react';

// ─── León SVG trazándose con scroll ──────────────────────────────────────────

const LION_PATH = `m 933.23081,621.00952 c -40.76965,-2.56381 -74.76454,-31.8928 -83.18329,-71.76608 -2.05613,-9.73837 -1.89427,2.31859 -2.01922,-150.41795 -0.11518,-140.80777 -0.0754,-146.63485 1.051,-154.02337 4.46603,-29.29394 22.63914,-54.33072 49.04072,-67.56256 8.89804,-4.45948 17.34804,-7.14855 27.16741,-8.64557 7.38852,-1.12642 13.2156,-1.16618 154.02337,-1.051 152.7365,0.12495 140.6796,-0.0369 150.418,2.01922 27.0925,5.72025 50.0127,23.47034 62.5136,48.41255 1.6425,3.27705 4.6064,11.4194 4.6064,11.4194 l -36.87428,-0.1583 z`;

function LionSVG({ progress }: { progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    path.style.strokeDasharray = `${total}`;
    path.style.strokeDashoffset = `${total * (1 - progress)}`;
  }, [progress]);

  return (
    <svg
      viewBox='0 0 453.7261 453.73807'
      className='w-48 h-48 md:w-64 md:h-64'
      aria-label='ING León'
    >
      <path
        ref={pathRef}
        transform='translate(-847.98469,-167.49938)'
        d={LION_PATH}
        fill='none'
        stroke='white'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ transition: 'stroke-dashoffset 0.08s linear' }}
      />
    </svg>
  );
}

// ─── Links del footer ─────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  Ayuda: [
    'Blog En Naranja',
    'Oficinas y cajeros',
    'Preguntas frecuentes',
    'Contáctanos',
  ],
  'Sobre ING': [
    'Conócenos',
    'Trabaja con nosotros',
    'Sala de prensa',
    'Accesibilidad',
  ],
  Legal: ['Privacidad y cookies', 'Info legal', 'Mapa web', 'Ciberseguridad'],
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const raw = (windowH - rect.top) / (windowH * 0.7);
      const clamped = Math.min(1, Math.max(0, raw));
      if (Math.abs(clamped - progress) > 0.01) setProgress(clamped);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  return (
    <footer ref={sectionRef} className='relative overflow-hidden'>
      {/* Imagen DORFic estática como fondo */}
      {/* Sustituye /images/dorfic-footer.jpg por tu captura del fluido */}
      <div className='absolute inset-0'>
        <img
          src='/images/dorfic-footer.jpg'
          alt=''
          aria-hidden='true'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Overlay oscuro para legibilidad */}
      <div className='absolute inset-0 bg-[#3d1400]/50' />

      {/* Contenido */}
      <div className='relative z-10 max-w-5xl mx-auto px-6 py-16'>
        {/* León + CTA centrados */}
        <div className='flex flex-col items-center mb-16'>
          <LionSVG progress={progress} />
          <h2
            className='text-white text-2xl md:text-3xl font-bold text-center mt-6 mb-2'
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¿Empezamos?
          </h2>
          <p className='text-white/70 text-sm mb-6 text-center'>
            Hazte cliente en minutos desde la app.
          </p>
          <a
            href='/hazte-cliente'
            className={[
              'text-sm font-medium text-[#3d1400] px-6 py-3 rounded-lg',
              'bg-white',
              'transition-all duration-200',
              'hover:bg-[#fff3e8] hover:shadow-[0_4px_14px_rgba(255,255,255,0.3)]',
              'active:scale-95',
            ].join(' ')}
          >
            Hazte cliente →
          </a>
        </div>

        {/* Links */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-10'>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className='text-white/50 text-xs font-medium uppercase tracking-widest mb-4'>
                {category}
              </h3>
              <ul className='flex flex-col gap-2'>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-white/80 text-sm hover:text-white transition-colors duration-150'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <span className='text-white/40 text-xs'>
            © {new Date().getFullYear()} ING Bank N.V., Sucursal en España
          </span>
          <span className='text-white/40 text-xs text-center'>
            Rediseño con fines de portfolio · No afiliado a ING
          </span>
          <div className='flex gap-4'>
            {['LinkedIn', 'GitHub'].map((social) => (
              <a
                key={social}
                href='#'
                className='text-white/40 text-xs hover:text-white transition-colors duration-150'
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
