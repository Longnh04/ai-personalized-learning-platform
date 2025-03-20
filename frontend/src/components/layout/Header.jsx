import React, { useState, useEffect } from "react";
import "../../styles/Layout/Header.css";
import logoImage from "../../assets/imgs/bitc-logo.png";
import SignUp from "../../components/auth/SignUp";
import SignIn from "../../components/auth/SignIn";

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

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
        <div className="avatar border-none" onClick={toggleMenu}>
          <span>{user?.username}</span>
          
          <img
            src={user?.avatar || "https://fap.fpi.edu.vn/images/NewPage/TopBar/username.svg"}
            alt="User Avatar"
            className="avatar-icon"
          />
          
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
            <li>
              <a href="#profile">
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