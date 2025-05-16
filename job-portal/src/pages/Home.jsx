import React from 'react';
import { motion } from 'framer-motion';
import '../CSS/HeroSection.css';
import developerImage from '../Images/Home.png';
import AboutUs from '../Home/AboutUs';
import LogoSlider from '../Home/Logo';

const HeroSection = () => {
  return (
    <div>
    <div className="hero container-fluid ">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 hero-content text-center text-lg-start">
          <h1>
            Hire Developers and<br />
            manage them<br />
            with <span className="highlight">ease</span>
          </h1>

          <a
          
            href="/hiredev"
            className="hire-link d-inline-flex align-items-center justify-content-center "
          >
            Hire Developer <span className="arrow">→</span>
          </a>
        </div>

        <div className="col-lg-6 col-md-12 text-center">
          <motion.img
            src={developerImage}
            alt="Developer Illustration"
            className="img-fluid developer-image"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
    <AboutUs/>
     <LogoSlider />
      
    </div>
  );
};

export default HeroSection;
