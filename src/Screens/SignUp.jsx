import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import baseUrl from './const/baseUrl';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cacnumber, setCacNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  // const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
  
    const data = {
      name,
      email,
      cacnumber,
      phone,
      address,
      password,
      role: 'client', // Ensure this matches the backend default value
    };
  
    try {
      const response = await axios.post(`${baseUrl}users/register`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Signup successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error here
    }
  };
  

  return (
    <>
      <Header />
      <section className='form-c'>
        <div className='f-l'>
          {/* <img src={man} alt="" /> */}
        </div>
        <div className='f-r'>
          <h3>Hello There!</h3>
          <p>Fill the form to create an account with us</p>
          <form className='form' onSubmit={signup}>
            <div>
              <input 
                type="text" 
                placeholder='Business Name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder='Email Address' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder='CAC Number' 
                value={cacnumber}
                onChange={(e) => setCacNumber(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder='Phone Number' 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder='Address' 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder='Set a password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <p>Logo image*</p>
            <div>
              <input 
                type="file" 
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div> */}
            <button type="submit">Submit</button>
            <p className='switch'>Already have an account? <Link to='/login'>Login</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
