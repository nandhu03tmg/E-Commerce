import React, {useState,useEffect} from 'react';
import './admin.css';
import {useNavigate,} from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {           
            navigate('/admindashboard'); 
        }
    });

   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


  const handleLogin = () => {

    if (!email && !password) {
        setError('Please provide both email and password.');
        return;
    } else if (!email) {
        setError('Please provide email.');
        return;
    } else if ( !password) {
        setError('Please provide password.');
        return;
    } else if ( email === "nantha" && password === "kumar") {
        setError('');
        localStorage.setItem('token',email);
        navigate('/admindashboard');
        return
    } else {
        setError('Invalid user!')
    }
};
  return (
    <div className='admintotal'>
      <div className="full">
        <div className="login">
          <h1>Admin login</h1>
        </div>

        <div className="inputs">
          <label htmlFor="">ID</label>
          <input type="text" value={email}
                onChange={handleEmailChange} />

          <label htmlFor="">PASSWORD</label>
          <input type="password" value={password}
                onChange={handlePasswordChange}/>

        </div>
        <p>{error}</p>
        <div className="buttons">
          <button onClick={handleLogin}><b>Login</b></button>
        </div>
      </div>
    </div>
  )
}

export default Admin