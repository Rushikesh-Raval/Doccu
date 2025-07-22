import React from "react";
import "./Feature.css";
const Feature = () => {
  return (
    <div>
      <section id="features" className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>AI PDF Analysis</h3>
            <p>
              Instantly understand contracts, reports, or policies without
              reading them line by line.
            </p>
          </div>
          <div className="feature-box">
            <h3>Risk Detection</h3>
            <p>
              Highlights hidden risks, clauses, or red flags that could affect
              you legally or financially.
            </p>
          </div>
          <div className="feature-box">
            <h3>Ask Your Document</h3>
            <p>
              Type a question. Get an answer straight from the document, powered
              by AI.
            </p>
          </div>
          <div className="feature-box">
            <h3>Simple Explanations</h3>
            <p>
              Turns legal or technical jargon into everyday language anyone can
              understand.
            </p>
          </div>
          <div className="feature-box">
            <h3>Smart Suggestions</h3>
            <p>
              Get next-step actions to stay safe, compliant, or make better
              decisions.
            </p>
          </div>
          <div className="feature-box">
            <h3>Privacy First</h3>
            <p>
              We never share your personal info. It is always safe with us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
