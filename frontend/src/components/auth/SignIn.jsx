import React, { useState} from 'react';
import '../../styles/auth/signIn.css'; // Đảm bảo bạn đã cài đặt styled-components
import Form_Logo from '../../assets/imgs/bitc-form-logo.png';
import "../../google-login/setup.js";
 

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
      <div onClick={(e) => e.stopPropagation()}>
        <form className="form" onSubmit={handleSignIn}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-circle-xmark"></i> 
          </button>
          <div className="flex flex-col items-center">
          <img
            className="w-[120px]  "
            src={Form_Logo}
            alt="form-logo"
          />
          <h2 className="text-2xl font-semibold text-[#24c476] mb-1">Welcome Back!</h2>
        </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-center">
              {error}
            </div>
          )}

          <div className="flex-column">
            <label
              className='font-rubik font-[200] text-[15px] mt-[20px]' 
            >Email</label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              className="input"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex-column">
            <label 
              className='font-rubik font-[200] text-[15px] mt-[20px]' 
            >Password</label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              className="input"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          </div>
          <div className="flex-row">
            <div className='flex-row gap-2'> 
              <input type="checkbox" />
              
              <label>Remember me</label>
            </div>
            <span className="span">Forgot password?</span>
          </div>
          <button className="button-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="p">
            Don't have an account? <span className="span">Sign Up</span>
          </p>
    
          <div className="flex-row ">
            <button 
              id="btn-google-login"
              className="btn google"
            >
              <img 
                className='w-[30px]'
                src={"https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"} 
                alt="google-logo" 
              />
            
            Google
            </button>

            <button className="btn apple">
              <svg version="1.1" height={20} width={20} id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773" style={{ enableBackground: 'new 0 0 22.773 22.773' }} xmlSpace="preserve"> <g> <g> <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" /> <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" /> </g></g></svg>
              Apple
            </button>
          </div>
        </form>
  
    </div>
    </div>
  );
};
 
export default SignIn;
