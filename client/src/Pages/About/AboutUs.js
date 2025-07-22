import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      <h2>About DOCCU</h2>
      <div className="about-content">
        <p>
          DOCCU is your smart AI-powered document assistant. Whether it's a legal contract,
          business policy, or technical report, we simplify complex text into clear insights.
        </p>
        <p>
          Our goal is to make document understanding faster, safer, and accessible to everyone —
          no legal background required.
        </p>
        <p>
          Built for professionals, individuals, and teams who value time, clarity, and security.
        </p>
        <p>
          DOCCU highlights key terms, answers your questions, flags risks, and suggests actionable
          steps — all within seconds.
        </p>
        <p>
          With strong privacy protocols and no data retention, your documents stay confidential
          and secure.
        </p>
        <p>
          No setup, no jargon — just drag, drop, and understand.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
