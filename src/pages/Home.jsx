import React from 'react';
import Hero from './Hero';
import About from './About';
import Timeline from './Timeline';
import Tracks from './Tracks';
import Prizes from './Prizes';
import Footer from './Footer';

const Home = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen">
     <Hero setCurrentPage={setCurrentPage} /> 
     <About />
    <Timeline />
    <Tracks />
    <Prizes />
    <Footer />
    </div>
  );
};

export default Home;