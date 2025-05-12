import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import the hook
import "./AboutUs.css";
import aboutImage from "../Images/why.webp"; 
import LogoSlider from "./Logo";
import Footer from "./Footer";

const AboutUs = () => {
  const points = [
    "Our foundation is built on the values of modern companies, making diversity and representation our driving force.",
    "Covajobs is a freelance Recruitment partner established in 2017. Leading by example, we're breaking barriers and forging a new path.",
    "We've got the talent, the passion, and the certification to prove it. When you partner with us, you're choosing a trailblazing team that embraces the future of inclusivity.",
  ];

  const { ref: aboutSectionRef, inView: aboutSectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.2, 
  });

  const { ref: aboutImageRef, inView: aboutImageInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: bulletRef, inView: bulletInView } = useInView({
    triggerOnce: true,
    threshold: 0.3, 
  });

  return (
    <div>
    <section className="about-us-section" ref={aboutSectionRef}>
      <motion.div 
        className="about-us-container"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: aboutSectionInView ? 1 : 0, x: aboutSectionInView ? 0 : -100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="about-us-left">
          <motion.img 
            ref={aboutImageRef}
            src={aboutImage} 
            alt="Team Discussion" 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: aboutImageInView ? 1 : 0, x: aboutImageInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        <motion.div 
          className="about-us-right"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: aboutSectionInView ? 1 : 0, x: aboutSectionInView ? 0 : -100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="about-title">
            <span className="gradient-dot" />
            About Us
          </h2>
          <div className="custom-bullets">
            {points.map((point, index) => (
              <motion.div 
                key={index} 
                ref={bulletRef}
                className="bullet-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: bulletInView ? 1 : 0, x: bulletInView ? 0 : -30 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              >
                <span className="bullet-icon" />
                <p>{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
    </div>
  );
};

export default AboutUs;
