import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import baseUrl from './const/baseUrl';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      console.error('Email and password are required');
      alert('Email and password are required');
      return;
    }
  
    try {
      console.log('Attempting login with email:', email);
  
      const response = await axios.post(`${baseUrl}users/login`, { email, password });
  
      if (response.status === 200) {
        console.log('Login successful:', response.data);
  
        const { role, token, userId } = response.data;
  
        // Store token and userId in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
  
        // Navigate based on role
        if (role === 'vendor') {
          navigate('/dashboard');
        } else if (role === 'admin') {
          navigate('/admindashboard');
        } else if (role === 'client') {
          navigate('/');
        } else {
          console.error('Invalid role:', role);
          alert('Invalid login credentials');
        }
      } else {
        console.error('Unexpected response status:', response.status);
        alert('Unexpected response status');
      }
    } catch (error) {
      console.error('Login error:', error);
  
      // Handle different types of errors
      if (error.response) {
        // Server-side errors
        if (error.response.data) {
          console.error('Error response data:', error.response.data);
          alert(error.response.data);
        } else {
          alert('Failed to login. Please try again.');
        }
      } else if (error.request) {
        // Network errors
        console.error('Network error:', error.request);
        alert('Network error. Please check your connection and try again.');
      } else {
        // Other errors
        console.error('Error message:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };
  

  return (
    <>
      <Header />
      <section className='form-c'>
        <div className='f-l'></div>
        <div className='f-r'>
          <h3>Welcome back!</h3>
          <form className='form' onSubmit={login}>
            <div>
              <input
                type="email"
                placeholder='Your Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
            <p className='switch'>Don't have an account? <Link to='/signup'>Create Account</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}

export default LogIn;
