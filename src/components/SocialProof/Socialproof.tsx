export default function SocialProof() {
  return (
    <section className='bg-[#fff3e8] py-16 px-6'>
      <div className='max-w-2xl mx-auto text-center'>
        {/* Emoji + título */}
        <div className='text-4xl mb-4'>😊</div>
        <h2
          className='text-2xl md:text-3xl font-bold leading-snug mb-4'
          style={{ color: '#3d1400', fontFamily: 'Georgia, serif' }}
        >
          Vente al banco más recomendado por sus clientes
          <br />
          <span style={{ color: '#ff6200' }}>(ya van 16 años seguidos)</span>
        </h2>

        <p
          className='text-sm leading-relaxed mb-2'
          style={{ color: '#7a3a00' }}
        >
          Gracias a nuestros clientes por hacernos (¡desde 2008!) el banco más
          recomendado de España.
        </p>

        <p className='text-xs mb-8' style={{ color: '#c45200' }}>
          MetrixLab Global Brand Health Tracking 2023
        </p>

        {/* Botones */}
        <div className='flex items-center justify-center gap-3 flex-wrap'>
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
