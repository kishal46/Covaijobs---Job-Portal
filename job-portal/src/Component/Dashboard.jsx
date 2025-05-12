import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CompleteProfile.css";
import Footer from "../Home/Footer";

const CompleteProfile = () => {
  const [user, setUser] = useState(null);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRaw = localStorage.getItem("user");
    if (!storedRaw) return navigate("/login");
    const stored = JSON.parse(storedRaw);
    setUser(stored);
  }, [navigate]);

  const handleSkillInput = (e) => {
    if ((e.key === "Enter" || e.key === " ") && inputSkill.trim()) {
      e.preventDefault();
      const s = inputSkill.trim();
      if (!skills.includes(s)) setSkills([...skills, s]);
      else toast.warning("Skill already added");
      setInputSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.email;
    if (!userId) return toast.error("Invalid user data—please log out and log back in.");

    const fd = new FormData();
    fd.append("userId", userId);
    fd.append("name", user.userName || "");
    fd.append("email", user.email || "");
    fd.append("experience", experience);
    fd.append("skills", JSON.stringify(skills));
    fd.append("location", location);
    fd.append("phoneNumber", phoneNumber);
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
        setTimeout(() => navigate("/dashboard"), 2500);
      } else {
        toast.error(data.message || "Failed to save profile");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error saving profile");
    }
  };

  if (!user) return null;

  return (
    <div>
      <div className="container mt-5">
        <ToastContainer position="top-right" />
        <div className="card p-4 profile-card mx-auto">
          <h4 className="text-center mb-4">Complete Your Profile</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Name"
                  value={user.userName || ""}
                  onChange={(e) => setUser({ ...user, userName: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Email"
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Experience (in years)"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={inputSkill}
                  onChange={(e) => setInputSkill(e.target.value)}
                  onKeyDown={handleSkillInput}
                  placeholder="Type skill and press Enter or Space"
                />
                <div className="mt-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control form-control-sm"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept=".pdf"
                />
                <small className="text-muted">Upload Resume (PDF)</small>
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control form-control-sm"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  accept="image/*"
                />
                <small className="text-muted">Upload Profile Picture</small>
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2">
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
