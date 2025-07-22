import React, { useState } from "react";
import Home from "./Pages/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Feature from ".//Pages/features/Feature";
import AboutUs from "./Pages/About/AboutUs";

export default function App() {
  return (
    <>
      <Router>
        <nav className="site-nav">
          <div className="nav-left">DOCCU</div>
          <div className="nav-right">
            <Link to="/home">Home</Link>
            <Link to="/feature">Features</Link>
            <Link to="/aboutus">About Us</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
      {/* ---------- Footer ---------- */}
      <footer className="site-footer">
        &copy; {new Date().getFullYear()} DOCCU&nbsp;&middot; Made By Rushikesh Mahadev Raval
      </footer>
    </>
  );
}
