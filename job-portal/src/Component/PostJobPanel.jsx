// JobForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/JobForm.css';

const JobForm = () => {
  // Simulate getting username from localStorage after login
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

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

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setError('You must be logged in to post a job.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg('');

    try {
      const jobData = {
        ...formData,
        postedBy: username,
      };

      const response = await axios.post('http://localhost:3001/jobs/add', jobData);
      setSuccessMsg('Job posted successfully! Redirecting...');
      setFormData({
        title: '',
        company: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        experience: '',
      });
      setTimeout(() => navigate('/currentjobs'), 1500);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Server error occurred.');
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Unexpected error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form-container">
      <h2>Post New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
        <input name="experience" placeholder="Experience Required" value={formData.experience} onChange={handleChange} required />
        <textarea
          name="description"
          placeholder="Job Description (300 words)"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />
        {loading && <p>Posting job...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        <button type="submit" disabled={loading}>Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;
