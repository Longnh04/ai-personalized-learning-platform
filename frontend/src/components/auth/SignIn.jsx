import React, { useState } from 'react';
import Form_Logo from '../../assets/imgs/bitc-form-logo.png';

const SignIn = ({ isVisible, onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Lưu token và thông tin user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Gọi callback để thông báo đăng nhập thành công
      onSignInSuccess(data.user);

      // Đóng form
      onClose();
    } catch (error) {
      setError(error.message || 'Failed to sign in');
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
        className={`bg-white px-8 py-[40px] rounded-2xl shadow-xl w-full max-w-md transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>

        <form onSubmit={handleSignIn}>
          <h1 className="text-[#24c476] text-center font-medium text-lg">SIGN IN HERE</h1>
          <div className="image_cover">
            <img 
              className="w-[150px] mx-auto"
              src={Form_Logo} 
              alt="form-logo" 
            />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-center">
              {error}
            </div>
          )}

          <input
            className="block w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#24c476]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="block w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#24c476]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="block w-full p-2 bg-[#24c476] text-white rounded-[30px] hover:bg-[#1ea663] transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;