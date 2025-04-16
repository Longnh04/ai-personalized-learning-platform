import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../styles/Layout/Sidebar.css";

const Sidebar = ({ isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className={`sidebar ${isMobileMenuOpen ? "show" : ""}`}>
      <nav>   
        <ul>
          <li 
            onClick={() => navigate("/")} 
            className={location.pathname === "/" ? "active-li" : ""}
          >
            <NavLink to="/">
              <i className="fa-solid fa-house"></i> Home
            </NavLink>
          </li>
          <li 
            
            onClick={() => navigate("/roadmap")}
            className={location.pathname === "/roadmap" ? "active-li" : ""}
          >
            <NavLink to="/roadmap">
              <i className="fa-solid fa-road"></i> Roadmap
            </NavLink>
          </li>
          <li 
            onClick={() => navigate("/courses")}
            className={location.pathname === "/courses" ? "active-li" : ""}
          >
            <NavLink to="/courses">
              <i className="fa-regular fa-folder-open"></i> Courses
            </NavLink>
          </li>
          <li 
            onClick={() => navigate("/blog")}
            className={location.pathname === "/blog" ? "active-li" : ""}
          >
            <NavLink to="/blog">
              <i className="fa-solid fa-book-open"></i> Blog
            </NavLink>
          </li>
          <li 
            className={`Notifi ${location.pathname === "/notifications" ? "active-li" : ""}`}
            onClick={() => navigate("/notifications")}
          >
            <NavLink to="/notifications">
              <i className="fa-solid fa-bell"></i> Notification
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
