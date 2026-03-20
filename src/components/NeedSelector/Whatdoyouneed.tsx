const ITEMS = [
  { label: 'Una cuenta', icon: '/icons/cuenta.svg', href: '/cuentas' },
  { label: 'Una tarjeta', icon: '/icons/tarjeta.svg', href: '/tarjetas' },
  { label: 'Ahorrar', icon: '/icons/savings.svg', href: '/ahorro' },
  { label: 'Invertir', icon: '/icons/investment.svg', href: '/inversion' },
  { label: 'Una hipoteca', icon: '/icons/mortgage.svg', href: '/hipotecas' },
];

export default function WhatDoYouNeed() {
  return (
    <section className='bg-[#fafaf8] py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Título */}
        <h2
          className='text-center text-2xl md:text-3xl font-bold mb-12'
          style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
        >
          Cuéntanos, ¿qué necesitas?
        </h2>

        {/* Grid de items */}
        <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
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
