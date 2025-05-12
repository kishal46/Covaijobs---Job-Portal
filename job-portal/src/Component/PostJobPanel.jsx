import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation
import '../CSS/JobForm.css';

const JobForm = ({ username }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    experience: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate(); // react-router-dom navigation

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg('');

    // Job description exact word count validation
    // const descriptionWordCount = formData.description.trim().split(/\s+/).length;
    // if (descriptionWordCount !== 300) {
    //   setError('Please provide a job description with exactly 300 words.');
    //   setLoading(false);
    //   return;
    // }

    try {
      const jobData = {
        ...formData,
        postedBy: username,
      };

      const response = await axios.post('http://localhost:3001/jobs/add', jobData);
      console.log('Job posted successfully:', response.data);

      setFormData({
        title: '',
        company: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        experience: '',
      });

      setSuccessMsg('Job posted successfully! Redirecting...');

      // Wait 1.5 seconds then navigate
      setTimeout(() => {
        navigate('/currentjobs');
      }, 1500);

    } catch (error) {
      console.error('Error posting job:', error.response || error);

      if (error.response) {
        setError(`Server Error: ${error.response.data.message || 'There was an issue posting the job.'}`);
      } else if (error.request) {
        setError('Network Error: Please check your connection or the server status.');
      } else {
        setError(`Unexpected Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form-container">
      <h2 className="form-title">Post New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-grid">
          {/* All input fields same as before */}
          <div className="form-group">
            <label>Job Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input name="salary" value={formData.salary} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Experience Required</label>
            <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Please enter experience" required />
          </div>
          <div className="form-group full-width">
            <label>Job Description (300 words)</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="4" 
              placeholder="Provide a detailed job description. Please ensure it is exactly 300 words."
              required
            ></textarea>
          </div>
        </div>

        {loading && <p className="loading-text">Posting Job...</p>}
        {error && <p className="error-text">{error}</p>}
        {successMsg && <p className="success-text">{successMsg}</p>}

        <div className="form-submit">
          <button type="submit" disabled={loading}>Post Job</button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
