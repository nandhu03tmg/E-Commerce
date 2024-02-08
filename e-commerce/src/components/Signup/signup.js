


import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};

    if (!formData.email.trim()) {
      isValid = false;
      validationErrors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = 'Email is not valid';
    }

    if (!formData.password.trim()) {
      isValid = false;
      validationErrors.password = 'Password required';
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = 'Password length must be at least 6 characters';
    }

    setErrors(validationErrors);
    setValid(isValid);

    return isValid;
  };


  const checkExistingUser = async (email) => {
    try {
      // Replace the API endpoint with your actual endpoint
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      return response.data.length > 0; // User already exists if length is greater than 0
    } catch (error) {
      console.error('Error checking existing user:', error.message);
      // Handle error and provide user feedback
      return false;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    const userExists = await checkExistingUser(formData.email);

    if (userExists) {
      setErrors({ email: 'User with this email already exists' });
      return;
    }


    try {
      console.log('form values', formData);

      // Replace the API endpoint with your actual endpoint
      const response = await axios.post('http://localhost:3001/users', formData);
      navigate('/dashboard');

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Handle error and provide user feedback
    }
  };

  return (
    <div className='signupfull'>
      <div className="signupcontent">
        <h1>Signup Account</h1>
        <label>
          <input id='signupbox' type="text" name='email' placeholder='Email' onChange={handleChange} />
        </label>
        <input id='signupbox' type="text" placeholder='Name' name="name" onChange={handleChange} />
        <label>
          <input id='signupbox' type="password" placeholder='Password' onChange={handleChange} name='password' />
        </label>
        <label id='error' htmlFor="">
          <p className="error-message">{errors.email}</p>
          <p className="error-message">{errors.password}</p>
        </label>
        <button onClick={handleSubmit}>SIGNUP</button>

        <div className="loginOption">
          <label>
          <p style={{color:'#5c5c5c'}}>Alreay have an account?</p>
          </label>
          <Link to='/login2page' style={{ textDecoration: 'none' }}>
            <p><b>Login here</b></p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
