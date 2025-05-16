import React, { useState } from "react";
import axios from 'axios';  // Make sure to install axios if not installed
import "../CSS/DeveloperHiringForm.css";

const DeveloperHiringForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    companyName: "",
    email: "",
    phone: "",
    hearAbout: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/send-email', formData);
      console.log(response.data.message);
      alert("Your form has been submitted successfully!");
      setFormData({
        name: "",
        jobTitle: "",
        companyName: "",
        email: "",
        phone: "",
        hearAbout: ""
      });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-grid">
        <h2 className="form-title">
          Hire the best dedicated developers
        </h2>
        <p className="form-subtitle">
          Hire pre-vetted developers with strong technical and communication skills at unbeatable prices. <br />
          If you decide to stop within one week, you pay nothing.
        </p>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name *"
          className="form-input"
          required
        />
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title *"
          className="form-input"
          required
        />
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name *"
          className="form-input"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Work Email *"
          className="form-input"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone *"
          className="form-input"
          required
        />
        <select
          name="hearAbout"
          value={formData.hearAbout}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="" disabled>
            How did you hear about us? *
          </option>
          <option value="email">Email</option>
          <option value="search">Search engine</option>
          <option value="social">Social media</option>
          <option value="others">Others</option>
        </select>

        <div className="form-button-container">
          <button type="submit" className="form-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeveloperHiringForm;
