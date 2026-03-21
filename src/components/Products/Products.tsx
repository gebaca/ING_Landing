import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    image: '/images/1.png',
    label: 'Hipoteca NARANJA',
    title: 'Elige cuántos años quieres de fijo y de variable.',
    description: 'Más opciones para que estés justo donde quieres estar.',
    cta: 'Conoce tu precio',
    href: '/hipotecas',
  },
  {
    image: '/images/2.png',
    label: 'Cuenta NARANJA',
    title: 'Tu Cuenta NARANJA ahora con Depósito Bienvenida 3% TAE a 3 meses.',
    description: 'Hazte de ING y gana más por tus ahorros.',
    cta: 'Lo quiero',
    href: '/ahorro',
  },
  {
    image: '/images/3.png',
    label: 'Cuenta NoCuenta',
    title: 'La cuenta que no te pide nada, ni nómina ni ingresos mínimos.',
    description: 'Una cuenta online para que lo hagas todo desde tu móvil.',
    cta: 'Saber más',
    href: '/cuentas',
  },
  {
    image: '/images/4.png',
    label: 'Inversión',
    title: 'Los ETFs enamoran a los españoles.',
    description:
      'Invierte en ETFs sin comisión de compra. Elige entre más de 400 ETFs.',
    cta: 'Lo quiero',
    href: '/inversion',
  },
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

export default function Products() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const grid = gridRef.current;
    if (!title || !grid) return;

    const titleWords = splitWords(title);
    const cards = Array.from(grid.children) as HTMLElement[];

    // Estado inicial
    gsap.set(titleWords, {
      opacity: 0,
      rotation: 6,
      y: 16,
      transformOrigin: 'left bottom',
    });
    gsap.set(cards, { opacity: 0, y: 36 });

    const wordTo = { opacity: 1, rotation: 0, y: 0, ease: 'power4.out' };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        once: true,
      },
    });

    // 1. Título palabra a palabra
    tl.to(titleWords, {
      ...wordTo,
      duration: 0.8,
      stagger: { each: 0.06, ease: 'none' },
    });

    // 2. Cards — stagger izq->der, las 4 en orden
    // En desktop el orden visual es: col1-row1, col2-row1, col1-row2, col2-row2
    // que coincide con el orden del DOM — perfecto para izq->der
    tl.to(
      cards,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: { each: 0.12, ease: 'none' },
        ease: 'power3.out',
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className='bg-white py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Título */}
        <h2
          ref={titleRef}
          className='text-center text-2xl md:text-3xl font-bold mb-10 max-w-2xl mx-auto leading-snug'
          style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
        >
          Cada día más productos para que saques el máximo provecho a tu dinero
        </h2>

        {/* Grid 2x2 */}
        <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {PRODUCTS.map((product) => (
            <div
              key={product.href}
              className={[
                'group rounded-2xl overflow-hidden',
                'bg-[#fafaf8] border border-[#f0e8e0]',
                'transition-all duration-300 ease-out',
                'hover:border-[#ff6200] hover:shadow-[0_8px_24px_rgba(255,98,0,0.1)]',
                'hover:-translate-y-0.5',
              ].join(' ')}
            >
              {/* Imagen */}
              <div className='relative overflow-hidden h-52'>
                <img
                  src={product.image}
                  alt={product.label}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <span className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#ff6200] text-xs font-medium px-3 py-1 rounded-full'>
                  {product.label}
                </span>
              </div>

              {/* Contenido */}
              <div className='p-6 flex flex-col gap-3'>
                <h3
                  className='text-lg font-bold leading-snug'
                  style={{ color: '#3d1400' }}
                >
                  {product.title}
                </h3>
                <p
                  className='text-sm leading-relaxed'
                  style={{ color: '#7a3a00' }}
                >
                  {product.description}
                </p>
                <div className='pt-2'>
                  <a
                    href={product.href}
                    className={[
                      'inline-flex items-center gap-2',
                      'text-sm font-medium text-white',
                      'bg-[#ff6200] px-5 py-2.5 rounded-lg',
                      'transition-all duration-200',
                      'hover:bg-[#e55500] hover:shadow-[0_4px_12px_rgba(255,98,0,0.35)]',
                      'active:scale-95',
                    ].join(' ')}
                  >
                    {product.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
