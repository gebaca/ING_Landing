import Nav from './components/nav/Nav';
import Hero from './components/Hero/Hero';
import WhatDoYouNeed from './components/NeedSelector/Whatdoyouneed';
import Products from './components/Products/Products';
import AppSection from './components/AppSection/AppSection';
import SocialProof from './components/SocialProof/Socialproof';
import Footer from './components/Footer/Footer';
import { Logo } from './components/Logo';

function App() {
  return (
    <div className='min-h-screen bg-white pr-10 pl-10'>
      <Nav />

      <main>
        <Hero />
        <WhatDoYouNeed />
        <Products />
        <AppSection />
        <SocialProof />
      </main>

      <Footer />

      {/* Firma — fixed esquina inferior derecha, sin contenedor */}
      <div className='fixed bottom-6 right-6 z-50'>
        <Logo />
      </div>
    </div>
  );
}

export default App;
