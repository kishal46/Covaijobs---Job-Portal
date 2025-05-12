import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactForm.css';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Whether the form has been successfully submitted
  const [lastSubmitted, setLastSubmitted] = useState(null); // Timestamp for last submission

  useEffect(() => {
    // If lastSubmitted is set, start a timeout to reset the form after 10 minutes
    if (lastSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false); // Reset the submission status after 10 minutes
      }, 600000); // 600000 ms = 10 minutes

      // Cleanup the timer when component unmounts or when lastSubmitted changes
      return () => clearTimeout(timer);
    }
  }, [lastSubmitted]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3001/send-email', formData);
      setIsSubmitted(true); // Mark the form as submitted
      setLastSubmitted(Date.now()); // Store the timestamp of the submission
      alert('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to send message.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5 gap-2">
      <div className="row align-items-start">
        {/* Left Section with motion */}
        <motion.div
          className="col-md-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="highlight-title">Essential IT Staff Augmentation Services in Bangalore</h2>
          <p className="desc">
            Staff augmentation is an outsourcing strategy, suitable for organizations who are looking to supplement
            their internal capacity by hiring employees through a staffing agency. This flexible staffing solution
            offers companies access to vast specialized skills and resources without any commitment.
            <a href="#" className="link-text"> Spigot Software’s </a>staff augmentation provides businesses with the
            ability to quickly acquire skilled professionals in response to peak or temporary project demands.
          </p>
          <p className="desc">
            With staff augmentation, companies can acquire talent in a specific niche that aligns with their project
            to enhance the overall project efficiency, speed, and success.
          </p>
          <button className="get-in-touch-btn">
            → Get In Touch
          </button>
        </motion.div>

        {/* Right Section with motion */}
        <motion.div
          className="col-md-6"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <h5>We’d Love to Hear From You</h5>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
            
            {/* Disable button if the form is submitted or submitting */}
            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting || isSubmitted} 
            >
              {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted Successfully!' : 'Submit'}
            </button>

            {isSubmitted && <p className="success-msg">You can submit again after 10 minutes.</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
