import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { label: 'Una cuenta', icon: '/icons/cuenta.svg', href: '/cuentas' },
  { label: 'Una tarjeta', icon: '/icons/tarjeta.svg', href: '/tarjetas' },
  { label: 'Ahorrar', icon: '/icons/savings.svg', href: '/ahorro' },
  { label: 'Invertir', icon: '/icons/investment.svg', href: '/inversion' },
  { label: 'Una hipoteca', icon: '/icons/mortgage.svg', href: '/hipotecas' },
];

// Split por palabras — igual que en Hero
function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.innerText;
  el.innerHTML = '';
  const words = text.split(/(\s+)/);
  const spans: HTMLSpanElement[] = [];
  words.forEach((chunk) => {
    const span = document.createElement('span');
    span.textContent = chunk;
    span.style.display = /\S/.test(chunk) ? 'inline-block' : 'inline';
    el.appendChild(span);
    if (/\S/.test(chunk)) spans.push(span);
  });
  return spans;
}

export default function WhatDoYouNeed() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const grid = gridRef.current;
    if (!title || !grid) return;

    // Split título por palabras
    const titleWords = splitWords(title);
    const items = Array.from(grid.children) as HTMLElement[];

    // Estado inicial
    gsap.set(titleWords, {
      opacity: 0,
      rotation: 6,
      y: 16,
      transformOrigin: 'left bottom',
    });
    gsap.set(items, { opacity: 0, y: 36 });

    const wordTo = { opacity: 1, rotation: 0, y: 0, ease: 'power4.out' };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: 'top 80%', // empieza cuando el título entra en el viewport
        once: true, // solo se ejecuta una vez
      },
    });

    // 1. Título — igual que en Hero
    tl.to(titleWords, {
      ...wordTo,
      duration: 0.8,
      stagger: { each: 0.08, ease: 'none' },
    });

    // 2. Items — stagger izq→der, simultáneo mientras termina el título
    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: { each: 0.1, ease: 'none' },
        ease: 'power3.out',
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className='bg-[#fafaf8] py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Título */}
        <h2
          ref={titleRef}
          className='text-center text-2xl md:text-3xl font-bold mb-12'
          style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
        >
          Cuéntanos, ¿qué necesitas?
        </h2>

        {/* Grid de items */}
        <div ref={gridRef} className='grid grid-cols-3 md:grid-cols-5 gap-4'>
          {ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                'group flex flex-col items-center gap-3 p-4 rounded-2xl',
                'bg-white border border-transparent',
                'transition-all duration-200 ease-out',
                'hover:border-[#ff6200] hover:shadow-[0_4px_16px_rgba(255,98,0,0.12)]',
                'hover:-translate-y-0.5',
                'outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200] focus-visible:ring-offset-2',
              ].join(' ')}
            >
              {/* Icono */}
              <div
                className={[
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  'bg-[#3d1400]',
                  'transition-all duration-200',
                  'group-hover:bg-[#ff6200]',
                ].join(' ')}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className='w-6 h-6 transition-all duration-200 group-hover:brightness-0 group-hover:invert'
                />
              </div>

              {/* Label */}
              <span
                className={[
                  'text-sm font-medium text-center leading-tight',
                  'text-[#3d1400]',
                  'transition-colors duration-200',
                  'group-hover:text-[#ff6200]',
                ].join(' ')}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
