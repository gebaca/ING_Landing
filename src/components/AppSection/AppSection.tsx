import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const APP_FEATURES = [
  {
    text: 'Te avisa de ese recibo que viene de camino',
    textSub: '(y que igual no tenías controlado).',
    mockup: '/images/app_1.png',
  },
  {
    text: 'Te chiva dónde tienes dadas de alta tus tarjetas.',
    textSub: 'Así evitamos sustos.',
    mockup: '/images/app_2.png',
  },
  {
    text: 'Si existe una forma de reducir facturas, te la cuenta.',
    textSub: '¡Y gratis!',
    mockup: '/images/app_3.png',
  },
];

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

export default function AppSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    if (!title || !subtitle || !grid || !cta) return;

    const titleWords = splitWords(title);
    const subtitleWords = splitWords(subtitle);
    const cols = Array.from(grid.children) as HTMLElement[];

    gsap.set(titleWords, {
      opacity: 0,
      rotation: 6,
      y: 16,
      transformOrigin: 'left bottom',
    });
    gsap.set(subtitleWords, {
      opacity: 0,
      rotation: 6,
      y: 16,
      transformOrigin: 'left bottom',
    });
    gsap.set(cols, { opacity: 0, y: 36 });
    gsap.set(cta, { opacity: 0, y: 20 });

    const wordTo = { opacity: 1, rotation: 0, y: 0, ease: 'power4.out' };

    const tl = gsap.timeline({
      scrollTrigger: { trigger: title, start: 'top 80%', once: true },
    });

    tl.to(titleWords, {
      ...wordTo,
      duration: 0.8,
      stagger: { each: 0.06, ease: 'none' },
    })
      .to(
        subtitleWords,
        { ...wordTo, duration: 0.7, stagger: { each: 0.08, ease: 'none' } },
        '-=0.3'
      )
      .to(
        cols,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: { each: 0.12, ease: 'none' },
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .to(
        cta,
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className='bg-[#fff8f3] py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Título */}
        <div className='text-center mb-12'>
          <h2
            ref={titleRef}
            className='text-2xl md:text-3xl font-bold mb-2'
            style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
          >
            Y una app que funciona con{' '}
            <s className='decoration-2'>inteligencia artificial</s>
          </h2>
          <span
            ref={subtitleRef}
            className='text-2xl md:text-3xl font-bold mb-2 italic'
            style={{ color: '#ff6200' }}
          >
            amor incondicional
          </span>
        </div>

        {/* 3 columnas — cada una es una card */}
        <div
          ref={gridRef}
          className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'
        >
          {APP_FEATURES.map((feature, i) => (
            <div
              key={i}
              className='group flex flex-col items-center rounded-3xl overflow-hidden pt-8 px-6 pb-0 cursor-default'
              style={{ background: '#ece9f0' }}
            >
              {/* Texto arriba */}
              <p
                className='text-center mb-6 leading-snug'
                style={{ color: '#3d1400' }}
              >
                <strong className='font-bold text-base'>{feature.text}</strong>{' '}
                <span
                  className='text-sm font-normal'
                  style={{ color: '#7a3a00' }}
                >
                  {feature.textSub}
                </span>
              </p>

              {/* Imagen — overflow hidden en la card la recorta por abajo */}
              {/* group-hover escala la imagen suavemente */}
              <div className='w-full flex justify-center overflow-hidden'>
                <img
                  src={feature.mockup}
                  alt={`App feature ${i + 1}`}
                  className={[
                    'w-full max-w-50 rounded-t-2xl mt-auto',
                    'shadow-[0_-4px_24px_rgba(0,0,0,0.08)]',
                    'transition-transform duration-500 ease-out',
                  ].join(' ')}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className='flex justify-center'>
          <a
            href=''
            target='_blank'
            rel='noopener noreferrer'
            className={[
              'inline-flex items-center gap-2',
              'text-sm font-medium text-white',
              'bg-[#ff6200] px-6 py-3 rounded-lg',
              'transition-all duration-200',
              'hover:bg-[#e55500] hover:shadow-[0_4px_14px_rgba(255,98,0,0.4)]',
              'active:scale-95',
            ].join(' ')}
          >
            Descubre la app →
          </a>
        </div>
      </div>
    </section>
  );
}
