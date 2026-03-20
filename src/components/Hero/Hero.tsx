import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Button } from '../button/Button';

// Altura total de cada columna
const COL_HEIGHTS = [380, 300, 220, 300, 380];
// Altura de la tarjeta pequeña en los extremos
const SMALL_CARD_HEIGHT = 60;
const GAP = 8;

// ─── Split por palabras (no letras) ──────────────────────────────────────────

function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.innerText;
  el.innerHTML = '';
  const words = text.split(/(\s+)/);
  const spans: HTMLSpanElement[] = [];
  words.forEach((chunk) => {
    const span = document.createElement('span');
    span.textContent = chunk;
    // Solo las palabras reales se animan, los espacios se mantienen inline
    span.style.display = /\S/.test(chunk) ? 'inline-block' : 'inline';
    el.appendChild(span);
    if (/\S/.test(chunk)) spans.push(span);
  });
  return spans;
}

// ─── Tarjetas ─────────────────────────────────────────────────────────────────

function StatCard({ height }: { height: number }) {
  return (
    <div
      className='bg-[#ff6200] rounded-2xl p-6 flex flex-col justify-between'
      style={{
        height,
        clipPath:
          'polygon(0% 0%, 85% 0%, 87% 15%, 100% 15%, 100% 100%, 0% 100%)',
      }}
    >
      <div>
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
      <div className='text-white/50 text-xs'>
        MetrixLab Global Brand Health Tracking
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
      <span className='text-[#ff6200] text-lg'>→</span>
    </div>
  );
}

function ProductCard({
  label,
  title,
  bg = '#fff3e8',
  height,
}: {
  label: string;
  title: string;
  bg?: string;
  height: number;
}) {
  return (
    <div
      className='rounded-2xl p-5 flex flex-col justify-between'
      style={{
        background: bg,
        height,
        clipPath:
          'polygon(0% 0%, 85% 0%, 87% 15%, 100% 15%, 100% 100%, 0% 100%)',
      }}
    >
      <span
        className='text-xs font-medium tracking-widest uppercase'
        style={{ color: '#c45200' }}
      >
        {label}
      </span>
      <div>
        <div className='text-[#3d1400] font-bold text-xl leading-snug mb-4'>
          {title}
        </div>
        <button className='flex items-center gap-2 text-sm font-medium text-[#ff6200] hover:gap-3 transition-all duration-200'>
          Saber más
          <span className='w-6 h-6 rounded-full bg-[#ff6200] text-white flex items-center justify-center text-xs'>
            →
          </span>
        </button>
      </div>
    </div>
  );
}

function ProductCardInverted({
  label,
  title,
  bg = '#fff3e8',
  height,
}: {
  label: string;
  title: string;
  bg?: string;
  height: number;
}) {
  return (
    <div
      className='rounded-2xl p-5 flex flex-col justify-between'
      style={{
        background: bg,
        height,
        clipPath:
          'polygon(0% 15%, 13% 15%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <span
        className='text-xs font-medium tracking-widest uppercase'
        style={{ color: '#c45200' }}
      >
        {label}
      </span>
      <div>
        <div className='text-[#3d1400] font-bold text-xl leading-snug mb-4'>
          {title}
        </div>
        <button className='flex items-center gap-2 text-sm font-medium text-[#ff6200] hover:gap-3 transition-all duration-200'>
          Saber más
          <span className='w-6 h-6 rounded-full bg-[#ff6200] text-white flex items-center justify-center text-xs'>
            →
          </span>
        </button>
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
      <div>
        <span className='text-sm text-[#7a3a00] leading-tight block mb-2'>
          cajeros y comercios gratis en España
        </span>
        <button className='flex items-center gap-1 text-xs font-medium text-[#ff6200] hover:gap-2 transition-all duration-200'>
          Busca el más cercano →
        </button>
      </div>
    </div>
  );
}

function DorficCard({ height }: { height: number }) {
  return (
    <div
      className='rounded-2xl overflow-hidden bg-[#ff6200]'
      style={{
        height,
        clipPath:
          'polygon(0% 15%, 13% 15%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <img
        src='/images/dorfic-hero.jpg'
        alt='Fluido DORFic'
        className='w-full h-full object-cover'
      />
    </div>
  );
}

function AppSmallCard({ height }: { height: number }) {
  return (
    <div
      className='bg-[#fff3e8] border border-[#f0d0b0] rounded-2xl px-5 flex items-center justify-between'
      style={{ height }}
    >
      <span className='text-sm font-medium text-[#3d1400]'>App con IA</span>
      <span className='text-xs text-[#ff6200]'>amor incondicional →</span>
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const maxHeight = Math.max(...COL_HEIGHTS);

  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eyebrow = eyebrowRef.current;
    const titleLine1 = titleLine1Ref.current;
    const titleLine2 = titleLine2Ref.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const cards = cardsRef.current;

    if (
      !eyebrow ||
      !titleLine1 ||
      !titleLine2 ||
      !subtitle ||
      !buttons ||
      !cards
    )
      return;

    // Split por palabras — no letras
    const eyebrowWords = splitWords(eyebrow);
    const line1Words = splitWords(titleLine1);
    const line2Words = splitWords(titleLine2);
    const subtitleWords = splitWords(subtitle);

    // Estado inicial — cada palabra inclinada, invisible, ligeramente abajo
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

    const cardEls = Array.from(cards.children) as HTMLElement[];
    gsap.set(cardEls, { opacity: 0, y: 36 });

    // Propiedades comunes de entrada — suave y orgánico
    const wordTo = {
      opacity: 1,
      rotation: 0,
      y: 0,
      ease: 'power4.out',
    };

    const tl = gsap.timeline({ delay: 0.15 });

    // 1. Eyebrow — palabras fluidas, cada una con duración larga y solapadas
    tl.to(eyebrowWords, {
      ...wordTo,
      duration: 0.8,
      stagger: { each: 0.07, ease: 'none' },
    });

    // 2. "Tu dinero," — titular, más pausado y dramático
    tl.to(
      line1Words,
      {
        ...wordTo,
        duration: 0.9,
        stagger: { each: 0.12, ease: 'none' },
      },
      '-=0.4'
    );

    // 3. "sin dramas." — fluye inmediatamente tras "Tu dinero,"
    tl.to(
      line2Words,
      {
        ...wordTo,
        duration: 0.9,
        stagger: { each: 0.12, ease: 'none' },
      },
      '-=0.3'
    );

    // 4. Subtítulo — más rápido, muchas palabras
    tl.to(
      subtitleWords,
      {
        ...wordTo,
        duration: 0.65,
        stagger: { each: 0.05, ease: 'none' },
      },
      '-=0.2'
    );

    // 5. Botones — fade suave, empieza mientras termina el subtítulo
    tl.to(
      buttons,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // 6. Cards — simultáneo con botones, stagger izq→der
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className='min-h-screen bg-white pt-[56px] flex flex-col'
      aria-label='Hero'
    >
      <div className='flex flex-col items-center text-center px-6 pt-16 pb-10'>
        <span
          ref={eyebrowRef}
          className='text-xs font-medium tracking-[0.2em] uppercase mb-4'
          style={{ color: '#c45200' }}
        >
          Banco online · Sin comisiones · Do your thing
        </span>

        <h1
          className='text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 max-w-3xl'
          style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
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
          className='text-lg md:text-xl max-w-lg leading-relaxed mb-8'
          style={{ color: '#7a3a00' }}
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

      <div className='px-4 md:px-8 pb-8'>
        <div
          ref={cardsRef}
          className='grid gap-3'
          style={{
            gridTemplateColumns: '1fr 1.3fr 1fr 1.3fr 1fr',
            height: maxHeight,
            alignItems: 'end',
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
            bg='#fff3e8'
            height={COL_HEIGHTS[1]}
          />

          <CajerosCard height={COL_HEIGHTS[2]} />

          <ProductCardInverted
            label='Hipoteca NARANJA'
            title='Elige cuántos años quieres de fijo y de variable.'
            bg='#fdf0e6'
            height={COL_HEIGHTS[3]}
          />

          <ExtremeCol
            totalHeight={COL_HEIGHTS[4]}
            bigCard={
              <DorficCard height={COL_HEIGHTS[4] - SMALL_CARD_HEIGHT - GAP} />
            }
            smallCard={<AppSmallCard height={SMALL_CARD_HEIGHT} />}
          />
        </div>
      </div>
    </section>
  );
}
