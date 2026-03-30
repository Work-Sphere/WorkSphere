import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import {
  getMyProfile,
  updateMyProfile,
  getStates,
  getCities
} from "../api/FreelancerApi";
import { useNavigate } from "react-router-dom";

const UpdateMyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadProfile();
    loadStates();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getMyProfile();
      setProfile(res.data);
      setForm({
        fname: res.data.fname || "",
        lname: res.data.lname || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        addr: res.data.addr || "",
        city: res.data.city || "",
        stateId: res.data.stateId || ""
      });
      if (res.data.stateId) {
        loadCities(res.data.stateId);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadStates = async () => {
    try {
      const res = await getStates();
      setStates(res.data);
    } catch (err) {
      console.error("Failed to load states", err);
    }
  };

  const loadCities = async (stateId) => {
    try {
      const res = await getCities(stateId);
      setCities(res.data);
    } catch (err) {
      console.error("Failed to load cities", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "stateId") {
      loadCities(value);
      setForm((prev) => ({ ...prev, city: "" }));
    }
  };

  const validate = () => {
    if (!form.email.toLowerCase().endsWith("@gmail.com")) {
      alert("Only @gmail.com emails are allowed");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setSaving(true);
      await updateMyProfile(form);
      alert("Profile updated successfully");
      navigate("/freelancer/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-container" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 className="page-title" style={{ color: "white", marginBottom: "25px" }}>Edit Profile</h2>

      <div className="profile-card" style={{ background: "rgba(2, 6, 23, 0.9)", padding: "30px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.1)" }}>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>
          <span style={{ color: "#9ca3af" }}>User ID</span>
          <strong style={{ color: "white" }}>{profile.uid}</strong>
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px" }}>
          <span style={{ color: "#9ca3af" }}>First Name</span>
          <input className="profile-input" name="fname" value={form.fname} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px" }}>
          <span style={{ color: "#9ca3af" }}>Last Name</span>
          <input className="profile-input" name="lname" value={form.lname} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px" }}>
          <span style={{ color: "#9ca3af" }}>Email</span>
          <input className="profile-input" name="email" value={form.email} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px" }}>
          <span style={{ color: "#9ca3af" }}>Mobile</span>
          <input className="profile-input" name="phone" value={form.phone} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px" }}>
          <span style={{ color: "#9ca3af" }}>Address</span>
          <textarea className="profile-input" name="addr" value={form.addr} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "white", minHeight: "80px" }} />
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "15px" }}>
          <span style={{ color: "#9ca3af" }}>State</span>
          <select className="profile-input" name="stateId" value={form.stateId} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", background: "rgba(2, 6, 23, 0.9)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
            <option value="">Select State</option>
            {states.map(s => <option key={s.stateId} value={s.stateId}>{s.stateName}</option>)}
          </select>
        </div>

        <div className="profile-row" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "15px", marginBottom: "25px" }}>
          <span style={{ color: "#9ca3af" }}>City</span>
          <select className="profile-input" name="city" value={form.city} onChange={handleChange} disabled={!form.stateId} style={{ padding: "8px", borderRadius: "5px", background: "rgba(2, 6, 23, 0.9)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
            <option value="">Select City</option>
            {cities.map(c => <option key={c.cityId} value={c.cityId}>{c.cityName}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            className="btn btn-primary"
            disabled={saving}
            onClick={handleSubmit}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg, #2ee6a6, #1abc9c)", border: "none", fontWeight: "bold", cursor: "pointer" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/freelancer/profile")}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontWeight: "bold", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateMyProfile;
