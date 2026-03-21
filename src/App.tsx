import Nav from './components/nav/Nav';
import Hero from './components/Hero/Hero';
import WhatDoYouNeed from './components/NeedSelector/Whatdoyouneed';
import Products from './components/Products/Products';
import AppSection from './components/AppSection/AppSection';
import SocialProof from './components/SocialProof/Socialproof';
import Footer from './components/Footer/Footer';
import { Logo } from './components/Logo';
import ScrollLion from './components/Scrolllion ';

function App() {
  return (
    <div className='min-h-screen bg-white'>
      <ScrollLion />
      <Nav />
      <div className='fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm'>
        <Logo />
      </div>
      <main>
        <Hero />
        <WhatDoYouNeed />
        <Products />
        <AppSection />
        <SocialProof />
      </main>

      <Footer />
    </div>
  );
}

export default App;
