import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Button } from '../button/Button';

const COL_HEIGHTS = [380, 300, 220, 300, 380];
const SMALL_CARD_HEIGHT = 60;
const GAP = 8;

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

function CardBackground({ src }: { src?: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt=''
      className='absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none'
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}

function StatCard({ height }: { height: number }) {
  return (
    <div
      className='bg-[#ff6200] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden'
      style={{
        height,
        clipPath:
          'polygon(0% 0%, 85% 0%, 87% 15%, 100% 15%, 100% 100%, 0% 100%)',
      }}
    >
      <div className='relative z-10'>
        <span className='text-white/60 text-xs font-medium tracking-widest uppercase'>
          Desde 2008
        </span>
        <div className='mt-3 text-white font-bold text-6xl leading-none'>
          16
        </div>
        <div className='text-white/80 text-lg font-medium leading-tight mt-1'>
          años siendo el más recomendado
        </div>
      </div>
    </div>
  );
}

function TaglineSmallCard({ height }: { height: number }) {
  return (
    <div
      className='bg-[#3d1400] rounded-2xl px-5 flex items-center justify-between'
      style={{ height }}
    >
      <span
        className='text-white font-bold text-sm'
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Do your <span className='text-[#ff6200]'>thing.</span>
      </span>
    </div>
  );
}

function ProductCard({
  label,
  title,
  bg = '#fff3e8',
  height,
  bgImage,
}: {
  label: string;
  title: string;
  bg?: string;
  height: number;
  bgImage?: string;
}) {
  return (
    <div
      className='rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden'
      style={{
        background: bg,
        height,
        clipPath:
          'polygon(0% 0%, 85% 0%, 87% 15%, 100% 15%, 100% 100%, 0% 100%)',
      }}
    >
      <CardBackground src={bgImage} />
      <span
        className='text-xs font-medium tracking-widest uppercase relative z-10'
        style={{ color: '#c45200' }}
      >
        {label}
      </span>
      <div className='text-[#3d1400] font-bold text-xl leading-snug mb-4 relative z-10'>
        {title}
      </div>
    </div>
  );
}

function ProductCardInverted({
  label,
  title,
  bg = '#fff3e8',
  height,
  bgImage,
}: {
  label: string;
  title: string;
  bg?: string;
  height: number;
  bgImage?: string;
}) {
  return (
    <div
      className='rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden'
      style={{
        background: bg,
        height,
        clipPath:
          'polygon(0% 15%, 13% 15%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <CardBackground src={bgImage} />
      <span
        className='text-xs font-medium tracking-widest uppercase relative z-10 pl-6'
        style={{ color: '#c45200' }}
      >
        {label}
      </span>
      <div className='text-[#3d1400] font-bold text-xl leading-snug mb-4 relative z-10'>
        {title}
      </div>
    </div>
  );
}

function CajerosCard({ height }: { height: number }) {
  return (
    <div
      className='bg-[#fff8f3] border border-[#f0e0d0] rounded-2xl p-5 flex flex-col justify-between'
      style={{ height }}
    >
      <span className='text-3xl font-bold text-[#ff6200]'>30.000+</span>
      <span className='text-sm text-[#7a3a00] leading-tight block'>
        cajeros y comercios gratis en España
      </span>
    </div>
  );
}

function DorficCard({ height, bgImage }: { height: number; bgImage?: string }) {
  return (
    <div
      className='rounded-2xl overflow-hidden bg-[#ff6200] relative'
      style={{
        height,
        clipPath:
          'polygon(0% 15%, 13% 15%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <img
        src={bgImage || '/images/dorfic.png'}
        alt='Fluido DORFic'
        className='w-full h-full object-cover'
      />
    </div>
  );
}

function AppSmallCard({ height }: { height: number }) {
  return (
    <div
      className='bg-[#fff3e8] border border-[#f0d0b0] rounded-2xl px-5 flex items-center'
      style={{ height }}
    >
      <span className='text-sm font-medium text-[#3d1400]'>App con IA</span>
    </div>
  );
}

function ExtremeCol({
  totalHeight,
  bigCard,
  smallCard,
}: {
  totalHeight: number;
  bigCard: React.ReactNode;
  smallCard: React.ReactNode;
}) {
  const bigHeight = totalHeight - SMALL_CARD_HEIGHT - GAP;
  return (
    <div className='flex flex-col' style={{ height: totalHeight, gap: GAP }}>
      <div style={{ height: bigHeight, flexShrink: 0 }}>{bigCard}</div>
      <div style={{ height: SMALL_CARD_HEIGHT, flexShrink: 0 }}>
        {smallCard}
      </div>
    </div>
  );
}

// Grid mobile — 2 columnas simétricas con altura fija
function MobileGrid() {
  const MOBILE_H = 180;
  return (
    <div className='grid grid-cols-2 gap-3 md:hidden'>
      <div
        className='bg-[#ff6200] rounded-2xl p-4 flex flex-col justify-between'
        style={{ height: MOBILE_H }}
      >
        <span className='text-white/60 text-xs font-medium tracking-widest uppercase'>
          Desde 2008
        </span>
        <div>
          <div className='text-white font-bold text-5xl leading-none'>16</div>
          <div className='text-white/80 text-sm font-medium leading-tight mt-1'>
            años más recomendado
          </div>
        </div>
      </div>
      <div
        className='bg-[#fff3e8] rounded-2xl p-4 flex flex-col justify-between'
        style={{ height: MOBILE_H }}
      >
        <span
          className='text-xs font-medium tracking-widest uppercase'
          style={{ color: '#c45200' }}
        >
          Cuenta NÓMINA
        </span>
        <div className='text-[#3d1400] font-bold text-base leading-snug'>
          Sin comisiones. Hasta 250€ de bienvenida.
        </div>
      </div>
      <div
        className='bg-[#fff8f3] border border-[#f0e0d0] rounded-2xl p-4 flex flex-col justify-between'
        style={{ height: MOBILE_H }}
      >
        <span className='text-3xl font-bold text-[#ff6200]'>30.000+</span>
        <span className='text-sm text-[#7a3a00] leading-tight'>
          cajeros gratis en España
        </span>
      </div>
      <div
        className='bg-[#fdf0e6] rounded-2xl p-4 flex flex-col justify-between'
        style={{ height: MOBILE_H }}
      >
        <span
          className='text-xs font-medium tracking-widest uppercase'
          style={{ color: '#c45200' }}
        >
          Hipoteca NARANJA
        </span>
        <div className='text-[#3d1400] font-bold text-base leading-snug'>
          Elige fijo o variable.
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const maxHeight = Math.max(...COL_HEIGHTS);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eyebrow = eyebrowRef.current;
    const titleLine1 = titleLine1Ref.current;
    const titleLine2 = titleLine2Ref.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const cards = cardsRef.current;
    const mobileGrid = mobileGridRef.current;

    if (!eyebrow || !titleLine1 || !titleLine2 || !subtitle || !buttons) return;

    const eyebrowWords = splitWords(eyebrow);
    const line1Words = splitWords(titleLine1);
    const line2Words = splitWords(titleLine2);
    const subtitleWords = splitWords(subtitle);

    gsap.set(
      [...eyebrowWords, ...line1Words, ...line2Words, ...subtitleWords],
      {
        opacity: 0,
        rotation: 6,
        y: 16,
        transformOrigin: 'left bottom',
      }
    );
    gsap.set(buttons, { opacity: 0, y: 20 });

    const cardEls = cards ? (Array.from(cards.children) as HTMLElement[]) : [];
    const mobileEls = mobileGrid
      ? (Array.from(mobileGrid.children) as HTMLElement[])
      : [];
    if (cardEls.length) gsap.set(cardEls, { opacity: 0, y: 36 });
    if (mobileEls.length) gsap.set(mobileEls, { opacity: 0, y: 36 });

    const wordTo = { opacity: 1, rotation: 0, y: 0, ease: 'power4.out' };
    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(eyebrowWords, {
      ...wordTo,
      duration: 0.8,
      stagger: { each: 0.07, ease: 'none' },
    })
      .to(
        line1Words,
        { ...wordTo, duration: 0.9, stagger: { each: 0.12, ease: 'none' } },
        '-=0.4'
      )
      .to(
        line2Words,
        { ...wordTo, duration: 0.9, stagger: { each: 0.12, ease: 'none' } },
        '-=0.3'
      )
      .to(
        subtitleWords,
        { ...wordTo, duration: 0.65, stagger: { each: 0.05, ease: 'none' } },
        '-=0.2'
      )
      .to(
        buttons,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      );

    // Anima cards desktop o mobile según cuál exista
    if (cardEls.length) {
      tl.to(
        cardEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: { each: 0.1, ease: 'none' },
          ease: 'power3.out',
        },
        '<'
      );
    }
    if (mobileEls.length) {
      tl.to(
        mobileEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: { each: 0.1, ease: 'none' },
          ease: 'power3.out',
        },
        '<'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className='min-h-screen bg-white pt-14 flex flex-col items-center'
      aria-label='Hero'
    >
      {/* Texto centrado */}
      <div className='flex flex-col items-center text-center px-6 pt-12 md:pt-16 pb-8 md:pb-10'>
        <span
          ref={eyebrowRef}
          className='text-xs font-medium tracking-[0.2em] uppercase mb-4 text-[#c45200]'
        >
          Banco online · Sin comisiones · Do your thing
        </span>
        <h1
          className='text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] mb-5 md:mb-6 max-w-3xl text-[#3d1400]'
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <span ref={titleLine1Ref} style={{ display: 'block' }}>
            Tu dinero,
          </span>
          <span
            ref={titleLine2Ref}
            style={{ color: '#ff6200', display: 'block' }}
          >
            sin dramas.
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className='text-base md:text-lg lg:text-xl max-w-lg leading-relaxed mb-6 md:mb-8 text-[#7a3a00]'
        >
          16 años siendo el banco más recomendado de España. Sin comisiones. Sin
          letra pequeña.
        </p>
        <div
          ref={buttonsRef}
          className='flex items-center gap-3 flex-wrap justify-center'
        >
          <Button variant='primary' size='lg' href='/hazte-cliente'>
            Hazte cliente
          </Button>
          <Button variant='secondary' size='lg' href='/cuentas'>
            Ver cuentas
          </Button>
        </div>
      </div>

      {/* Grid mobile — 2x2 simplificado */}
      <div ref={mobileGridRef} className='w-full px-4 pb-10 md:hidden'>
        <MobileGrid />
      </div>

      {/* Grid desktop — 5 columnas asimétricas */}
      <div className='hidden md:block w-full px-4 pb-12'>
        <div
          ref={cardsRef}
          className='grid gap-3 mx-auto'
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            height: maxHeight,
            alignItems: 'end',
            maxWidth: '1300px',
          }}
        >
          <ExtremeCol
            totalHeight={COL_HEIGHTS[0]}
            bigCard={
              <StatCard height={COL_HEIGHTS[0] - SMALL_CARD_HEIGHT - GAP} />
            }
            smallCard={<TaglineSmallCard height={SMALL_CARD_HEIGHT} />}
          />
          <ProductCard
            label='Cuenta NÓMINA'
            title='Sin comisiones. Con hasta 250€ de bienvenida.'
            height={COL_HEIGHTS[1]}
            bgImage='https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071'
          />
          <CajerosCard height={COL_HEIGHTS[2]} />
          <ProductCardInverted
            label='Hipoteca NARANJA'
            title='Elige cuántos años quieres de fijo y de variable.'
            height={COL_HEIGHTS[3]}
            bgImage='https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073'
          />
          <ExtremeCol
            totalHeight={COL_HEIGHTS[4]}
            bigCard={
              <DorficCard
                height={COL_HEIGHTS[4] - SMALL_CARD_HEIGHT - GAP}
                bgImage='/images/dorfic.png'
              />
            }
            smallCard={<AppSmallCard height={SMALL_CARD_HEIGHT} />}
          />
        </div>
      </div>
    </section>
  );
}
