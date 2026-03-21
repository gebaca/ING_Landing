const FOOTER_LINKS = {
  Ayuda: [
    'Blog En Naranja',
    'Oficinas y cajeros',
    'Preguntas frecuentes',
    'Contáctanos',
  ],
  'Sobre ING': [
    'Conócenos',
    'Trabaja con nosotros',
    'Sala de prensa',
    'Accesibilidad',
  ],
  Legal: ['Privacidad y cookies', 'Info legal', 'Mapa web', 'Ciberseguridad'],
};

export default function Footer() {
  return (
    <footer style={{ background: '#ff6200' }}>
      <div className='max-w-5xl mx-auto px-6 py-16'>
        {/* CTA centrado */}
        <div className='flex flex-col items-center mb-16 text-center'>
          <h2
            className='text-white text-3xl md:text-4xl font-bold mb-3'
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¿Empezamos?
          </h2>
          <p className='text-white/80 text-base mb-8 max-w-sm'>
            Hazte cliente en minutos desde la app.
          </p>
          <a
            href='/hazte-cliente'
            className={[
              'text-sm font-medium px-7 py-3 rounded-lg',
              'bg-white text-[#ff6200]',
              'transition-all duration-200',
              'hover:bg-[#fff3e8] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]',
              'active:scale-95',
            ].join(' ')}
          >
            Hazte cliente →
          </a>
        </div>

        {/* Links */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-10'>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className='text-white/60 text-xs font-medium uppercase tracking-widest mb-4'>
                {category}
              </h3>
              <ul className='flex flex-col gap-2'>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-white/80 text-sm hover:text-white transition-colors duration-150'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <span className='text-white/50 text-xs'>
            © {new Date().getFullYear()} ING Bank N.V., Sucursal en España
          </span>
          <span className='text-white/50 text-xs text-center'>
            Rediseño con fines de portfolio · No afiliado a ING
          </span>
          <div className='flex gap-4'>
            {['LinkedIn', 'GitHub'].map((social) => (
              <a
                key={social}
                href='#'
                className='text-white/50 text-xs hover:text-white transition-colors duration-150'
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
