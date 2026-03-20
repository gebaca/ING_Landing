import Nav from './components/nav/Nav';
import Hero from './components/Hero/Hero';
import WhatDoYouNeed from './components/NeedSelector/Whatdoyouneed';
import Products from './components/Products/Products';
import AppSection from './components/AppSection/AppSection';
import SocialProof from './components/SocialProof/Socialproof';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='min-h-screen bg-white pr-10 pl-10'>
      {/* El Nav suele ser fixed o sticky, por eso va fuera del main */}
      <Nav />

      <main>
        {/* Cada sección es un componente independiente */}
        <Hero />
        <WhatDoYouNeed />
        <Products />
        <AppSection />
        <SocialProof />
        <Footer />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
