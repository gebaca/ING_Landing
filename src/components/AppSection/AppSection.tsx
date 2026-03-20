const APP_FEATURES = [
  {
    text: 'Te avisa de ese recibo que viene de camino (y que igual no tenías controlado).',
    mockup: '/images/app-recibos.jpg',
  },
  {
    text: 'Te chiva dónde tienes dadas de alta tus tarjetas. Así evitamos sustos.',
    mockup: '/images/app-tarjetas.jpg',
  },
  {
    text: 'Si existe una forma de reducir facturas, te la cuenta. ¡Y gratis!',
    mockup: '/images/app-facturas.jpg',
  },
];

export default function AppSection() {
  return (
    <section className='bg-[#fff8f3] py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Título */}
        <div className='text-center mb-12'>
          <h2
            className='text-2xl md:text-3xl font-bold mb-2'
            style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
          >
            Y una app que funciona con inteligencia artificial
          </h2>
          <span
            className='text-lg font-medium italic'
            style={{ color: '#ff6200' }}
          >
            amor incondicional
          </span>
        </div>

        {/* 3 columnas */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          {APP_FEATURES.map((feature, i) => (
            <div key={i} className='flex flex-col gap-4'>
              {/* Texto */}
              <p
                className='text-sm leading-relaxed text-center px-2'
                style={{ color: '#7a3a00' }}
              >
                {feature.text}
              </p>

              {/* Mockup móvil */}
              <div
                className={[
                  'relative mx-auto',
                  'w-44 rounded-[2rem] overflow-hidden',
                  'border-4 border-[#3d1400]',
                  'shadow-[0_8px_24px_rgba(61,20,0,0.15)]',
                  'transition-transform duration-300 hover:-translate-y-1',
                ].join(' ')}
              >
                {/* Notch */}
                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#3d1400] rounded-b-xl z-10' />
                <img
                  src={feature.mockup}
                  alt={`App feature ${i + 1}`}
                  className='w-full aspect-[9/19] object-cover'
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='flex justify-center'>
          <a
            href='https://www.ing.es/app'
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
