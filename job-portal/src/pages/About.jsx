import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../Home/Footer';
import '../CSS/ContactForm.css';
import { motion } from 'framer-motion';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/send-email', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' }); 
    } catch (error) {
      alert('Failed to send message.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="contact-container">
        <motion.form 
          className="contact-form" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ opacity: { duration: 0.5 }, y: { type: 'spring', stiffness: 100, damping: 25 } }} 
        >
          <h5>Contact Form</h5>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone No"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="^[0-9]{10}$" 
            title="Please enter a valid 10-digit phone number."
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address."
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          />
          <button type="submit" className="submit-btn">Submit</button>
        </motion.form>
      </div>
      <Footer />
    </>
  );
}

export default About;
