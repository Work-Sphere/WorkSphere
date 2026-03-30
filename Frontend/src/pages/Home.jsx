import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useSearch } from "../context/SearchContext";
import "./Home.css";

function Home() {
  const { searchQuery } = useSearch();

  const services = [
    { title: "Web Developer", desc: "Modern websites & apps", icon: "💻" },
    { title: "Electrician", desc: "Wiring & electrical repairs", icon: "⚡" },
    { title: "Plumber", desc: "Pipes & leak fixing", icon: "🚰" },
    { title: "Graphic Designer", desc: "Logos & UI designs", icon: "🎨" },
    { title: "AC Technician", desc: "Repair & maintenance", icon: "❄️" },
    { title: "Digital Marketer", desc: "SEO & social media", icon: "📈" },
    { title: "Carpenter", desc: "Furniture & woodwork", icon: "🪚" },
  ];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <section className={`services-section ${searchQuery ? "is-searching" : ""}`}>
          <h3>{searchQuery ? `Search Results for "${searchQuery}"` : "Popular Services"}</h3>

          <div className="services-scroll">
            {filteredServices.length > 0 ? (
              <div className="services-track">
                {filteredServices.map((service, index) => (
                  <div className="service-card" key={index}>
                    <div className="service-icon">{service.icon}</div>
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                  </div>
                ))}
                {/* Duplicate cards for seamless loop when not searching */}
                {!searchQuery && services.map((service, index) => (
                  <div className="service-card" key={`dup-${index}`}>
                    <div className="service-icon">{service.icon}</div>
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No services found matching your search. Try another keyword!</p>
              </div>
            )}
          </div>
        </section>

        {/* STATS */}
        
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-links">
          
        </div>
      </footer>
    </div>
  );
}

export default Home;
