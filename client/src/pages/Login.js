import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [formData, setFormData] = useState({email: '', password:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');

        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            
            //when logged in successfully backend returns the data which also has token we store the token into localstorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/');
        } catch(err){
            setError(err.response?.data?.msg || 'login failed');
        }
    };

    return (
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;