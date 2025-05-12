import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Hire.css";
import Footer from "../Home/Footer";

export default function AllProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/jobseeker/all")
      .then(res => {
        if (res.data.success) {
          setProfiles(res.data.profiles);
        }
      })
      .catch(err => console.error("Failed to fetch profiles:", err));
  }, []);

  return (
    <>
    <div className="container ">
      <h2 className="text-center mb-5 fw-bold text-primary">Jobseeker Profiles</h2>
      <div className="row g-4">
        {profiles.map((profile, i) => (
          <div className="col-md-6 col-lg-4" key={i}>
            <div className="card border-0 shadow-lg h-100 rounded-4">
              {profile.profilePicturePath && (
                <img
                  src={`http://localhost:3001/${profile.profilePicturePath}`}
                  className="card-img-top rounded-top-4"
                  alt={profile.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title fw-semibold">{profile.name}</h5>
                <p className="card-text mb-1"><i className="bi bi-envelope"></i> <strong>Email:</strong> {profile.email}</p>
                <p className="card-text mb-1"><i className="bi bi-geo-alt"></i> <strong>Location:</strong> {profile.location}</p>
                <p className="card-text mb-1"><i className="bi bi-briefcase"></i> <strong>Experience:</strong> {profile.experience} years</p>
                <p className="card-text mb-1"><i className="bi bi-telephone"></i> <strong>Phone:</strong> {profile.phoneNumber}</p>
                <p className="card-text"><strong>Skills:</strong><br />
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="badge bg-secondary me-1 mt-1">{skill}</span>
                  ))}
                </p>
                {profile.resumePath && (
                  <a
                    href={`http://localhost:3001/${profile.resumePath}`}
                    className="btn btn-sm btn-outline-primary mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 View Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}
