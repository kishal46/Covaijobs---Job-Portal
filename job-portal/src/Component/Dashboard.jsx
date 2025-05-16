import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CompleteProfile.css";
import Footer from "../Home/Footer";

const CompleteProfile = () => {
  const [user, setUser] = useState(null);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [discription, setDiscription] = useState(""); // Description state
  const [resume, setResume] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRaw = localStorage.getItem("user");
    if (!storedRaw) return navigate("/login");
    const stored = JSON.parse(storedRaw);
    setUser(stored);

    const storedDetails = JSON.parse(localStorage.getItem("jobSeekerDetails"));
    if (storedDetails) {
      setExperience(storedDetails.experience || "");
      setSkills(storedDetails.skills || []);
      setLocation(storedDetails.location || "");
      setPhoneNumber(storedDetails.phoneNumber || "");
      setDiscription(storedDetails.discription || ""); // Load description if available
    }
  }, [navigate]);

  const handleSkillInput = (e) => {
    if ((e.key === "Enter" || e.key === " ") && inputSkill.trim() && !isSubmitted) {
      e.preventDefault();
      const s = inputSkill.trim();
      if (!skills.includes(s)) setSkills([...skills, s]);
      else toast.warning("Skill already added");
      setInputSkill("");
    }
  };

  const handleSkillDelete = (skillToRemove) => {
    if (!isSubmitted) {
      setSkills(skills.filter(skill => skill !== skillToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const userId = user.email;
    if (!userId) {
      toast.error("Invalid user data—please log out and log back in.");
      setIsSubmitted(false);
      return;
    }

    const fd = new FormData();
    fd.append("userId", userId);
    fd.append("name", user.userName || "");
    fd.append("email", user.email || "");
    fd.append("experience", experience);
    fd.append("skills", JSON.stringify(skills));
    fd.append("location", location);
    fd.append("phoneNumber", phoneNumber);
    fd.append("discription", discription); // append description here
    if (resume) fd.append("resume", resume);
    if (profilePicture) fd.append("profilePicture", profilePicture);

    try {
      const { data } = await axios.post(
        "http://localhost:3001/jobseeker/profile/details",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data.success) {
        toast.success("Profile saved!", { autoClose: 2000 });
        localStorage.setItem("jobSeekerDetails", JSON.stringify(data.jobSeeker));
        setTimeout(() => navigate("/finddev"), 2500);
      } else {
        toast.error(data.message || "Failed to save profile");
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error saving profile");
      setIsSubmitted(false);
    }
  };

  if (!user) return null;

  return (
    <div className="main-container">
      <ToastContainer position="top-right" />
      <div className="container py-5">
        <div className="card p-4 profile-card mx-auto shadow-lg">
          <h3 className="text-center mb-4 text-primary fw-bold">Complete Your Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* Name */}
              <div className="col-md-6">
                <div className="input-group input-group-lg">
                  <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={user.userName || ""}
                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    disabled={isSubmitted}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <div className="input-group input-group-lg">
                  <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={user.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled={isSubmitted}
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="col-md-6">
                <div className="input-group input-group-lg">
                  <span className="input-group-text"><i className="bi bi-briefcase-fill"></i></span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Experience (in years)"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="col-md-6">
                <div className="input-group input-group-lg">
                  <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <div className="input-group input-group-lg">
                  <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>

              {/* Description textarea */}
              <div className="col-12">
                <label className="form-label fw-bold">Profile Description</label>
                <textarea
                  className="form-control"
                  placeholder="Write a short description about yourself"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  rows={4}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Skills input */}
              <div className="col-md-6">
                <div className="input-group input-group-lg">
                  <span className="input-group-text"><i className="bi bi-lightning-charge-fill"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    value={inputSkill}
                    onChange={(e) => setInputSkill(e.target.value)}
                    onKeyDown={handleSkillInput}
                    placeholder="Type skill and press Enter/Space"
                    disabled={isSubmitted}
                  />
                </div>
                <div className="mt-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-1 skill-badge">
                      {skill}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleSkillDelete(skill)}
                        disabled={isSubmitted}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Upload */}
              <div className="col-md-6">
                <label className="form-label">Upload Resume (PDF)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept=".pdf"
                  disabled={isSubmitted}
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="col-md-6">
                <label className="form-label">Upload Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  accept="image/*"
                  disabled={isSubmitted}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-success btn-lg px-4 py-2 rounded-pill"
                disabled={isSubmitted}
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteProfile;
