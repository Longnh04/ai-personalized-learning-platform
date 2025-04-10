import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Layout/Header.css";
import logoImage from "../../assets/imgs/bitc-logo.png";
import SignUp from "../../components/auth/SignUp";
import SignIn from "../../components/auth/SignIn";

import Link from "../../data/Link";
const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const navigate = useNavigate(); // Thêm hook useNavigate

  const [isLearningMenuVisible, setIsLearningMenuVisible] = useState(false);

   // Add demo courses
   const demoCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 65,
      lastAccessed: "2024-04-08"
    },
    {
      id: 2,
      title: "JavaScript Advanced Concepts",
      progress: 30,
      lastAccessed: "2024-04-07"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      progress: 85,
      lastAccessed: "2024-04-06"
    }
  ];

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  const handleSignIn = () => {
    setShowSignIn(true);
  };

  const handleSignUp = () => {
    setShowSignUp(true);
  };

  const handleSignOut = () => {
    // Xóa token và thông tin user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Đặt lại trạng thái
    setIsLoggedIn(false);
    setUser(null);
    setMenuVisible(false);
  };

  const handleSignInSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleViewProfile = () => {
    setMenuVisible(false); // Đóng menu
    navigate('/profile'); // Điều hướng đến trang profile
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder="Search for a course"
          className="search-input"
        />
      </div>

      {/* Phần còn lại của header giữ nguyên */}
      {isLoggedIn ? (
         <div className="user_infor flex gap-3 items-center">
         <div className="relative">
              <span
                className="text-gray-800 dark:text-gray-200 hover:bg-slate-300 px-4 py-3 rounded-lg duration-100 cursor-pointer"
                onMouseEnter={() => setIsLearningMenuVisible(true)}
                onMouseLeave={() => setIsLearningMenuVisible(false)}
              >
                My Learning
                {isLearningMenuVisible && (
                  <div className="absolute   top-full right-0 w-80 bg-white shadow-lg rounded-lg mt-1 py-2 z-50">
                    {demoCourses.map(course => (
                      <div key={course.id} className="px-4 py-3 hover:bg-gray-100">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-800">{course.title}</h4>
                          <span className="text-sm text-gray-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                    <div className="border-t mt-2 pt-2">
                      <a
                        href="/my-learning"
                        className="block px-4 py-2 text-blue-600 hover:bg-gray-100 text-center"
                      >
                        Go to My Learning
                      </a>
                    </div>
                  </div>
                )}
              </span>
          </div>

          <div className="avatar border-none" onClick={toggleMenu}>
            <span className="text-gray-800 dark:text-gray-200">{user?.username}</span>
            <img
              src={user?.avatar || "https://fap.fpi.edu.vn/images/NewPage/TopBar/username.svg"}
              alt="User Avatar"
              className="avatar-icon"
            />
            
          </div>
         </div>
      ) : (
        <div className="auth-buttons">
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="sign-up-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      )}
       {/* SignIn Component */}
       <SignIn
        isVisible={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignInSuccess={(avatar) => handleSignInSuccess(avatar)} // Callback nhận avatar
      />

      {/* SignUp Component */}
      <SignUp isVisible={showSignUp} onClose={() => setShowSignUp(false)} />

      {/* Menu toggle */}
      {isLoggedIn && (
        <div
          id="card-action"
          className={`account-card ${isMenuVisible ? "" : "hide"}`}
        >
          <ul>
            <li onClick={handleViewProfile}>
              <a href={Link} onClick={(e) => e.preventDefault()}>
                <i className="fa-solid fa-street-view"></i> View Profile
              </a>
            </li>
            <li>
              <a href="#settings">
                <i className="fa-solid fa-gear"></i> Setting
              </a>
            </li>
            <li>
              <a href="#help">
                <i className="fa-solid fa-circle-info"></i> Help
              </a>
            </li>
            <li onClick={handleSignOut}>
              <a href="#logout">
                <i className="fa-solid fa-right-from-bracket"></i> Log out
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
    
  );
};

export default Header;