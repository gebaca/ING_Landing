import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function SocialProof() {
  const statRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sourceRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stat = statRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const source = sourceRef.current;
    const buttons = buttonsRef.current;
    if (!stat || !title || !subtitle || !source || !buttons) return;

    const titleWords = splitWords(title);
    const subtitleWords = splitWords(subtitle);

    gsap.set(stat, { opacity: 0, y: 24, scale: 0.92 });
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
    gsap.set([source, buttons], { opacity: 0, y: 16 });

    const wordTo = { opacity: 1, rotation: 0, y: 0, ease: 'power4.out' };

    const tl = gsap.timeline({
      scrollTrigger: { trigger: stat, start: 'top 80%', once: true },
    });

    // Stat grande primero — impacto visual inmediato
    tl.to(stat, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
    })
      .to(
        titleWords,
        { ...wordTo, duration: 0.8, stagger: { each: 0.06, ease: 'none' } },
        '-=0.3'
      )
      .to(
        subtitleWords,
        { ...wordTo, duration: 0.65, stagger: { each: 0.05, ease: 'none' } },
        '-=0.3'
      )
      .to(
        source,
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      )
      .to(
        buttons,
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className='bg-[#fff3e8] py-16 px-6'>
      <div className='max-w-2xl mx-auto text-center'>
        {/* Stat grande */}
        <div ref={statRef} className='mb-6'>
          <span
            className='font-bold leading-none'
            style={{
              fontSize: 'clamp(80px, 15vw, 140px)',
              color: '#ff6200',
              fontFamily: 'Georgia, serif',
              display: 'block',
              lineHeight: 1,
            }}
          >
            16
          </span>
          <span
            className='text-sm font-medium tracking-widest uppercase'
            style={{ color: '#c45200' }}
          >
            años seguidos
          </span>
        </div>

        {/* Título */}
        <h2
          ref={titleRef}
          className='text-2xl md:text-3xl font-bold leading-snug mb-4'
          style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
        >
          El banco más recomendado por sus clientes
        </h2>

        {/* Subtítulo */}
        <p
          ref={subtitleRef}
          className='text-sm leading-relaxed mb-2'
          style={{ color: '#7a3a00' }}
        >
          Gracias a nuestros clientes por hacernos (¡desde 2008!) el banco más
          recomendado de España.
        </p>

        {/* Fuente */}
        <span
          ref={sourceRef}
          className='text-xs block mb-8'
          style={{ color: '#c45200' }}
        >
          MetrixLab Global Brand Health Tracking 2023
        </span>

        {/* Botones */}
        <div
          ref={buttonsRef}
          className='flex items-center justify-center gap-3 flex-wrap'
        >
          <a
            href='/opiniones'
            className={[
              'text-sm font-medium px-5 py-2.5 rounded-lg',
              'border border-[#d0c0b0] text-[#3d1400]',
              'transition-all duration-200',
              'hover:border-[#ff6200] hover:text-[#ff6200] hover:bg-white',
              'active:scale-95',
            ].join(' ')}
          >
            Opiniones sobre ING
          </a>
          <a
            href='/hazte-cliente'
            className={[
              'text-sm font-medium text-white px-5 py-2.5 rounded-lg',
              'bg-[#ff6200]',
              'transition-all duration-200',
              'hover:bg-[#e55500] hover:shadow-[0_4px_14px_rgba(255,98,0,0.4)]',
              'active:scale-95',
            ].join(' ')}
          >
            Hazte cliente
          </a>
        </div>
      </div>
    </section>
  );
}
