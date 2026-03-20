import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';

const NAV_LINKS = [
  { label: 'Cuentas y tarjetas', href: '/cuentas' },
  { label: 'Ahorro', href: '/ahorro' },
  { label: 'Inversión', href: '/inversion' },
  { label: 'Hipotecas y préstamos', href: '/hipotecas' },
];

const ROW_TOP_HEIGHT = 56;
const ROW_BOTTOM_HEIGHT = 40;
const SCROLL_THRESHOLD = 80;

function useActivePath() {
  const [active, setActive] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  useEffect(() => {
    const onPopState = () => setActive(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  return active;
}

function navLinkClasses(isActive: boolean): string {
  return [
    'relative px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap',
    'transition-all duration-200 ease-out',
    'outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200] focus-visible:ring-offset-1',
    'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
    'after:h-[2px] after:rounded-full after:bg-[#ff6200]',
    'after:transition-all after:duration-200 after:ease-out',
    isActive
      ? 'text-[#ff6200] bg-[#fff3e8] after:w-[80%]'
      : [
          'text-[#3d1400] after:w-0',
          'hover:text-[#ff6200] hover:bg-[#fff3e8] hover:after:w-[80%]',
        ].join(' '),
  ].join(' ');
}

export default function Nav() {
  // true = mostrar fila superior (logo + CTAs)
  // false = ocultar fila superior, solo links
  const [showTop, setShowTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const showTopRef = useRef(true);
  const activePath = useActivePath();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = current;

      // Por encima del threshold → siempre mostrar las dos filas
      if (current < SCROLL_THRESHOLD) {
        if (!showTopRef.current) {
          showTopRef.current = true;
          setShowTop(true);
        }
        return;
      }

      const scrollingDown = current > prev;

      // Bajando → ocultar fila superior
      if (scrollingDown && showTopRef.current) {
        showTopRef.current = false;
        setShowTop(false);
      }

      // Subiendo → mostrar fila superior
      if (!scrollingDown && !showTopRef.current) {
        showTopRef.current = true;
        setShowTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalHeight = showTop
    ? ROW_TOP_HEIGHT + ROW_BOTTOM_HEIGHT
    : ROW_BOTTOM_HEIGHT;

  return (
    <header
      className='fixed top-0 left-0 right-0 z-50 bg-white overflow-hidden'
      style={{
        height: totalHeight,
        boxShadow: '0 1px 0 #f0e8e0',
        // Transición suave en la altura
        transition: 'height 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* ── Fila 1 — logo + CTAs ── */}
      <div
        className='max-w-7xl mx-auto px-6 flex items-center justify-between'
        style={{
          height: ROW_TOP_HEIGHT,
          // Cuando se oculta: sube y desaparece
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(-100%)',
          transition:
            'opacity 200ms ease-out, transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href='/'
          className='flex items-center gap-2 shrink-0 group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200] focus-visible:ring-offset-1'
          aria-label='ING — Ir a inicio'
        >
          <img
            src='/icons/ing_leon-01.svg'
            alt='ING Lion'
            className='h-8 w-auto transition-transform duration-200 group-hover:scale-110 group-active:scale-95'
          />
        </a>

        {/* CTAs — desktop */}
        <div className='hidden md:flex items-center gap-3'>
          <Button variant='secondary' size='sm' href='/area-clientes'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </svg>
            Área clientes
          </Button>
          <Button variant='primary' size='sm' href='/hazte-cliente'>
            Hazte cliente
          </Button>
        </div>

        {/* Hamburger — mobile */}
        <button
          className='md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#fff3e8] active:scale-95 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200]'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span
            className={[
              'block w-5 h-0.5 bg-[#3d1400] transition-transform duration-200 origin-center',
              menuOpen ? 'rotate-45 translate-y-2' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-5 h-0.5 bg-[#3d1400] transition-opacity duration-200',
              menuOpen ? 'opacity-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-5 h-0.5 bg-[#3d1400] transition-transform duration-200 origin-center',
              menuOpen ? '-rotate-45 -translate-y-2' : '',
            ].join(' ')}
          />
        </button>
      </div>

      {/* ── Fila 2 — links de navegación ── */}
      <div
        style={{
          height: ROW_BOTTOM_HEIGHT,
          // Cuando la fila superior se oculta, esta sube para ocupar su lugar
          transform: showTop
            ? 'translateY(0)'
            : `translateY(-${ROW_TOP_HEIGHT}px)`,
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <nav
          className='max-w-7xl mx-auto px-6 h-full flex items-center gap-1'
          aria-label='Navegación principal'
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={navLinkClasses(activePath === link.href)}
              aria-current={activePath === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={[
          'md:hidden bg-white border-t border-[#f0e8e0] overflow-hidden',
          'transition-all duration-200',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <ul className='px-6 py-4 flex flex-col gap-1'>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={navLinkClasses(activePath === link.href)}
                onClick={() => setMenuOpen(false)}
                aria-current={activePath === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className='pt-3 border-t border-[#f0e8e0] mt-2 flex flex-col gap-2'>
            <Button variant='secondary' size='sm' href='/area-clientes'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                <circle cx='12' cy='7' r='4' />
              </svg>
              Área clientes
            </Button>
            <Button
              variant='primary'
              size='sm'
              href='/hazte-cliente'
              className='w-full justify-center'
            >
              Hazte cliente
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
