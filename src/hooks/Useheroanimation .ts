import { useEffect } from 'react';
import gsap from 'gsap';

// ─── Utilidad: split text en spans ───────────────────────────────────────────
// Sustituye el contenido de texto de un elemento por spans individuales por letra.
// Devuelve los spans para poder animarlos.

function splitTextToSpans(el: HTMLElement): HTMLSpanElement[] {
  const text = el.innerText;
  el.innerHTML = '';

  const spans: HTMLSpanElement[] = [];

  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    // Necesario para que la rotación funcione correctamente
    span.style.display = 'inline-block';
    // Los espacios colapsan sin esto
    if (char === ' ') span.style.whiteSpace = 'pre';
    el.appendChild(span);
    spans.push(span);
  }

  return spans;
}

// ─── Hook principal ───────────────────────────────────────────────────────────

export function useHeroAnimation({
  eyebrowRef,
  titleLine1Ref,
  titleLine2Ref,
  subtitleRef,
  buttonsRef,
  cardsRef,
}: {
  eyebrowRef: React.RefObject<HTMLElement>;
  titleLine1Ref: React.RefObject<HTMLElement>;
  titleLine2Ref: React.RefObject<HTMLElement>;
  subtitleRef: React.RefObject<HTMLElement>;
  buttonsRef: React.RefObject<HTMLElement>;
  cardsRef: React.RefObject<HTMLElement>;
}) {
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

    // Split text en todos los elementos de texto
    const eyebrowSpans = splitTextToSpans(eyebrow);
    const line1Spans = splitTextToSpans(titleLine1);
    const line2Spans = splitTextToSpans(titleLine2);
    const subtitleSpans = splitTextToSpans(subtitle);

    // Estado inicial — todo invisible y rotado
    const textFromState = {
      opacity: 0,
      rotateZ: 8, // rotación inicial en grados
      y: 12, // pequeño desplazamiento vertical
      transformOrigin: 'left bottom',
    };

    gsap.set(
      [...eyebrowSpans, ...line1Spans, ...line2Spans, ...subtitleSpans],
      textFromState
    );
    gsap.set(buttons, { opacity: 0, y: 16 });

    // Cards — ocultas inicialmente
    const cardEls = Array.from(cards.children) as HTMLElement[];
    gsap.set(cardEls, { opacity: 0, y: 40 });

    // ── Timeline principal ────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.5 });

    // 1. Eyebrow — letra a letra
    tl.to(eyebrowSpans, {
      opacity: 1,
      rotateZ: 0,
      y: 0,
      duration: 0.04,
      stagger: 0.03,
      ease: 'power2.out',
    });

    // 2. "Tu dinero," — letra a letra
    tl.to(
      line1Spans,
      {
        opacity: 1,
        rotateZ: 0,
        y: 0,
        duration: 0.05,
        stagger: 0.035,
        ease: 'power2.out',
      },
      '+=0.1'
    );

    // 3. "sin dramas." — letra a letra
    tl.to(
      line2Spans,
      {
        opacity: 1,
        rotateZ: 0,
        y: 0,
        duration: 0.05,
        stagger: 0.035,
        ease: 'power2.out',
      },
      '+=0.05'
    );

    // 4. Subtítulo — letra a letra (más rápido, es largo)
    tl.to(
      subtitleSpans,
      {
        opacity: 1,
        rotateZ: 0,
        y: 0,
        duration: 0.03,
        stagger: 0.015,
        ease: 'power2.out',
      },
      '+=0.1'
    );

    // 5. Botones — fade in mientras termina el subtítulo
    tl.to(
      buttons,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.3'
    ); // empieza 0.3s antes de que termine el subtítulo

    // 6. Cards — stagger de izquierda a derecha, simultáneo con botones
    tl.to(
      cardEls,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.out',
      },
      '<'
    ); // empieza al mismo tiempo que los botones

    // Cleanup — restaurar texto original si el componente se desmonta
    return () => {
      tl.kill();
    };
  }, []);
}
