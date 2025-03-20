import React, { useState } from 'react';
import Form_Logo from '../../assets/imgs/bitc-form-logo.png';

const SignUp = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Lưu token và thông tin user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Đóng form và có thể redirect
      onClose(); 
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white py-[40px] px-[30px] rounded-2xl shadow-xl w-full max-w-md transition-transform duration-300 ${
          isVisible ? 'scale-[1]' : 'scale-[0]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>

        <form onSubmit={handleSignUp}>
          <h1 className="text-[#24c476] text-center font-medium text-lg">SIGN UP HERE</h1>
          <div className="image_cover">
            <img className="w-[150px] mx-auto" src={Form_Logo} alt="form-logo" />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-center">
              {error}
            </div>
          )}

          <input
            className="block w-full py-2 px-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#24c476]"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="block w-full py-2 px-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#24c476]"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="block w-full py-2 px-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#24c476]"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            type="submit"
            className="block w-full p-2 bg-[#24c476] text-white rounded-[30px] hover:bg-[#1ea663] transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;