import React from 'react';
import Navbar from './Navbar'; 
import Hero from './Hero';
import About from './About';
import Timeline from './Timeline';
import Tracks from './Tracks';
import Prizes from './Prizes';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
    
      <Navbar />
      
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="timeline">
        <Timeline />
      </section>

      <section id="tracks">
        <Tracks />
      </section>

      <section id="prizes">
        <Prizes />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Home;