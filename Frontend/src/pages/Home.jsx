import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ IMPORT NAVBAR
import "./Home.css";

function Home() {
  const services = [
    { title: "Web Developer", desc: "Modern websites & apps", icon: "💻" },
    { title: "Electrician", desc: "Wiring & electrical repairs", icon: "⚡" },
    { title: "Plumber", desc: "Pipes & leak fixing", icon: "🚰" },
    { title: "Graphic Designer", desc: "Logos & UI designs", icon: "🎨" },
    { title: "AC Technician", desc: "Repair & maintenance", icon: "❄️" },
    { title: "Digital Marketer", desc: "SEO & social media", icon: "📈" },
    { title: "Carpenter", desc: "Furniture & woodwork", icon: "🪚" },
  ];

  return (
    <div className="home-container">
      {/* ✅ NAVBAR COMPONENT */}
      <Navbar />

      {/* MAIN */}
      <main className="home-main">
        {/* HERO */}
        <section className="hero-section">
          <h1>
            Find <span>trusted professionals</span>
            <br />
            for every job you need,
            <br />
            done <em>right</em>.
          </h1>

          <p className="hero-subtext">
            Tired of searching multiple places for different services?
            WorkSphere brings verified professionals together in one platform —
            from tech experts to home service providers, all quality-checked and
            ready to work.
          </p>
        </section>

        {/* SERVICES SCROLL */}
        <section className="services-section">
          <h3>Popular Services</h3>

          <div className="services-scroll">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2026 WorkSphere. All rights reserved.</p>
        <div className="footer-links">
          
        </div>
      </footer>
    </div>
  );
}

export default Home;
