import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAxiosInstance } from '../utils/axios';
import { setAuthToken } from '../utils/auth';

const useLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error on new login attempt
    setError(null);

    try {
      const axiosInstance = await getAxiosInstance(); 
      const response = await axiosInstance.post('/auth/login', {
        usernameOrEmail,
        password,
      });

      const token = response.data.accessToken;
      setAuthToken(token); 
      alert('Login successful!');
      
      // Redirect after login, defaulting to home page ('/') instead of '/login'
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Login failed. Please check your credentials.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return {
    usernameOrEmail,
    password,
    setUsernameOrEmail,
    setPassword,
    handleLogin,
    error,
  };
};

export default useLogin;
