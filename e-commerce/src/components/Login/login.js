import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const handleLogin = () => {
    console.log(formData);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

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

    if (isValid) {
      axios.get('http://localhost:3001/users').then((result) => {
        const user = result.data.find((user) => user.email === formData.email);

        if (user) {
          if (user.password === formData.password) {
            console.log('Success');
            alert('successfully log in');
            navigate('/dashboard');
          } else {
            isValid = false;
            validationErrors.password = 'Wrong password';
          }
        } else {
          isValid = false;
          validationErrors.email = 'User not found';
        }

        setErrors(validationErrors);
        setValid(isValid);
      });
    } else {
      setErrors(validationErrors);
      setValid(isValid);
    }
  };

  return (
    <div className="loginfull">
      
      <div className="logincontent">
        <h1>Login Account</h1>
        <label htmlFor="">
          <input
            id="loginbox"
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          />
        </label>
        <p className="error-message">{errors.email}</p>
        <label htmlFor="">
          <input
            id="loginbox"
            type="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          />
        </label>
        <p className="error-message">{errors.password}</p>
        <button onClick={handleSubmit}>LOGIN</button>

        <div className="signupOption">
          <label htmlFor="">
            <p style={{color:'#5c5c5c'}}>Don't have an account?</p>
          </label>
          <Link style={{ textDecoration: 'none' }} to="/signuppage">
            <p><b>New member</b></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
