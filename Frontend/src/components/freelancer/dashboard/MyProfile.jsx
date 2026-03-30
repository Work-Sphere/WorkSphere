import React, { useEffect, useState, useCallback } from "react";
import "./MyProfile.css";
import { getMyProfile, updateMyProfile, getStates, getCities } from "../api/FreelancerApi";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

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
        stateId: res.data.stateId || "",
      });
      if (res.data.stateId) {
        loadCities(res.data.stateId);
      }
    } catch {
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
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "stateId") {
      loadCities(value);
      setForm((prev) => ({ ...prev, city: "" })); // reset city when state changes
    }

    if (name === "city") {
      // Find the city object to get its state (if our API returned full city objects)
      // Since we fetch cities BY state, selecting a city from the current list 
      // already means it's in the selected state.
      // But if we had a global city list, we'd do:
      // const selectedCity = cities.find(c => c.cityId === parseInt(value));
      // if (selectedCity && selectedCity.state) {
      //   setForm(prev => ({ ...prev, stateId: selectedCity.state.stateId }));
      // }
    }
  };

  const validate = () => {
    if (!form.email.toLowerCase().endsWith("@gmail.com")) {
      setError("Only @gmail.com emails are allowed");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be exactly 10 digits");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    if (!validate()) return;

    setSaving(true);
    try {
      await updateMyProfile(form);
      setEditMode(false);
      setSuccess("Profile updated successfully!");
      await loadProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="myprofile-scope">
        <div className="profile-container">
          <div className="loading-spinner">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="myprofile-scope">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="page-title">My Profile</h1>
          {error && <div className="error-toast">{error}</div>}
          {success && <div className="success-toast" style={{ background: "#10b981", padding: "10px", borderRadius: "8px", marginBottom: "15px", textAlign: "center" }}>{success}</div>}
        </div>

        <div className="profile-card">
          <div className="profile-header-section">
            <div className="profile-avatar"></div>
            <div className="profile-info">
              <h2 className="profile-name">
                {profile?.fname} {profile?.lname}
              </h2>
              <div className="profile-id">
                User ID: <strong>{profile?.uid}</strong>
              </div>
            </div>
          </div>

          <div className="profile-content">
            {!editMode ? (
              <>
                <ProfileRow label="First Name" value={profile?.fname || "-"} />
                <ProfileRow label="Last Name" value={profile?.lname || "-"} />
                <ProfileRow label="Email" value={profile?.email || "-"} />
                <ProfileRow label="Mobile" value={profile?.phone || "-"} />
                <ProfileRow label="Address" value={profile?.addr || "-"} />
                <ProfileRow label="City" value={profile?.cityName || "-"} />
                <ProfileRow label="State" value={profile?.stateName || "-"} />

                <div className="profile-actions">
                  <button
                    className="btn btn-primary edit-btn"
                    onClick={() => setEditMode(true)}
                  >
                    <span className="btn-icon">✏️</span>
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <>
                <InputRow
                  label="First Name"
                  name="fname"
                  value={form.fname}
                  onChange={handleChange}
                />
                <InputRow
                  label="Last Name"
                  name="lname"
                  value={form.lname}
                  onChange={handleChange}
                />
                <InputRow
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                />
                <InputRow
                  label="Mobile"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10 digit number"
                />
                <InputRow
                  label="Address"
                  name="addr"
                  value={form.addr}
                  onChange={handleChange}
                />

                <div className="profile-row">
                  <label className="profile-label">State</label>
                  <select
                    className="profile-input"
                    name="stateId"
                    value={form.stateId}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map(s => (
                      <option key={s.stateId} value={s.stateId}>{s.stateName}</option>
                    ))}
                  </select>
                </div>

                <div className="profile-row">
                  <label className="profile-label">City</label>
                  <select
                    className="profile-input"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!form.stateId}
                  >
                    <option value="">Select City</option>
                    {cities.map(c => (
                      <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
                    ))}
                  </select>
                </div>

                <div className="profile-actions">
                  <button
                    className="btn btn-primary save-btn"
                    onClick={handleUpdate}
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="spinner"></span>
                    ) : (
                      <span className="btn-icon">💾</span>
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    className="btn btn-secondary cancel-btn"
                    onClick={() => setEditMode(false)}
                    disabled={saving}
                  >
                    <span className="btn-icon">❌</span>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== SMALL COMPONENTS ===== */
const ProfileRow = ({ label, value }) => (
  <div className="profile-row">
    <span className="profile-label">{label}</span>
    <span className="profile-value">{value}</span>
  </div>
);

const InputRow = ({ label, name, value, onChange, placeholder }) => (
  <div className="profile-row">
    <label className="profile-label">{label}</label>
    <input
      className="profile-input"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

export default MyProfile;
