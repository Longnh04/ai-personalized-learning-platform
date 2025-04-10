import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx"; // Import Header

import Home from "./Pages/Home";
import Roadmap from "./Pages/Roadmap";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
import Notifications from "./Pages/Notifications";
  
import "./App.css";
import RoadmapTesting from "./Pages/RoadmapTesting.jsx";
// import VideoFrame from "./Pages/VideoFrame.jsx";

import VideoWatching from "./Pages/VideoWatching.jsx"

import SignUp from "./components/auth/SignUp.jsx";
import SignIn from "./components/auth/SignIn.jsx";

import {AuthProvider} from '../src/context/AuthContext.jsx';

import UserProfile from "./Pages/UserProfile.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Render loader while loading
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
            <Header /> 
          </div> 
          <div className="main">
            <div className="sidebar">   
              <Sidebar />
            </div>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/roadmaptesting" element={<RoadmapTesting/>}/>

                {/* <Route path="/videoframe/:id" element={<VideoFrame />} /> */}
                {/* Video watching route */}
                <Route path="/watch/:courseId" element={<VideoWatching />} />
                
                {/* Authentication routes */}
                
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