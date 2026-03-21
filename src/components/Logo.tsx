import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT: React.CSSProperties = {
  fontFamily: 'Pencil-Regular, cursive',
  fontStyle: 'italic',
  fontSize: '28px',
  lineHeight: 1,
  color: '#111',
};

const EXPAND_MS = 1380;
const LEAVE_DELAY = 100;

export const Logo = () => {
  const [hovered, setHovered] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { contextSafe } = useGSAP({ scope: container });

  const startWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.gb-char');
    if (!chars) return;
    gsap.killTweensOf(chars);
    chars.forEach((el, i) => {
      gsap.to(el, {
        x: 'random(-1.3, 1.3)',
        y: 'random(-1.3, 1.3)',
        rotation: 'random(-2.8, 2.8)',
        duration: 0.11,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        delay: i * 0.018,
      });
    });
  });

  const stopWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.gb-char');
    if (!chars) return;
    gsap.killTweensOf(chars);
    gsap.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.45,
      ease: 'power3.out',
    });
  });

  useEffect(() => {
    if (hovered) startWiggle();
    else stopWiggle();
  }, [hovered]);

  const handlePointerEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setHovered(true);
  };

  const handlePointerLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setHovered(false);
      leaveTimeout.current = null;
    }, LEAVE_DELAY);
  };

  const letters = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className='gb-char'
        style={{ display: 'inline-block', willChange: 'transform' }}
      >
        {char}
      </span>
    ));

  return (
    <a
      href='https://tuweb.com' // ← sustituye por tu URL
      target='_blank'
      rel='noopener noreferrer'
      ref={container as unknown as React.RefObject<HTMLAnchorElement>}
      className='flex items-baseline cursor-pointer select-none'
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      aria-label='Tu portfolio — abre en nueva pestaña'
    >
      {/* GERARD */}
      <div className='flex items-baseline overflow-hidden'>
        <span
          className='gb-char'
          style={{
            ...FONT,
            display: 'inline-block',
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          G
        </span>
        <span
          style={{
            ...FONT,
            display: 'flex',
            overflow: 'hidden',
            paddingLeft: '3px',
            paddingRight: '3px',
            maxWidth: hovered ? '160px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: `max-width ${EXPAND_MS}ms cubic-bezier(0.22,1,0.36,1), opacity ${hovered ? 300 : 200}ms ease ${hovered ? '80ms' : '0ms'}`,
          }}
        >
          {letters('erard')}
        </span>
      </div>

      {/* Espacio entre nombre y apellido */}
      <span
        style={{
          display: 'inline-block',
          width: hovered ? '12px' : '0px',
          transition: `width ${EXPAND_MS}ms cubic-bezier(0.22,1,0.36,1)`,
          flexShrink: 0,
        }}
      />

      {/* BATALLER */}
      <div className='flex items-baseline overflow-hidden'>
        <span
          className='gb-char'
          style={{
            ...FONT,
            display: 'inline-block',
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          B
        </span>
        <span
          style={{
            ...FONT,
            display: 'flex',
            overflow: 'hidden',
            paddingLeft: '3px',
            paddingRight: '3px',
            maxWidth: hovered ? '200px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: `max-width ${EXPAND_MS}ms cubic-bezier(0.22,1,0.36,1), opacity ${hovered ? 260 : 200}ms ease ${hovered ? '80ms' : '0ms'}`,
          }}
        >
          {letters('ataller')}
        </span>
      </div>
    </a>
  );
};
