import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import Home from "./Pages/Home";
import Roadmap from "./Pages/Roadmap";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
import Notifications from "./Pages/Notifications";
import "./App.css";
import RoadmapTesting from "./Pages/RoadmapTesting.jsx";
import VideoWatching from "./Pages/VideoWatching.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import UserProfile from "./Pages/UserProfile.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="app_wrapper">
          <div className="Header">
            <Header toggleMobileMenu={toggleMobileMenu} />
          </div>
          <div className="main">
            <div className={`sidebar ${isMobileMenuOpen ? 'show' : ''}`}>
              <Sidebar />
            </div>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/roadmaptesting" element={<RoadmapTesting />} />
                <Route path="/watch/:courseId" element={<VideoWatching />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<UserProfile />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
