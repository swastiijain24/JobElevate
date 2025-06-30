import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'jobseeker'
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            //api bascically sends the data to the backend (here thats why it is post)
            //and we will get a response from the backend

            // 1 User fills form in React
            // 2 On submit, axios.post() sends the data
            // 3 Express receives it at /api/auth/register
            //4 Backend validates + saves the user to MongoDB
            //Backend replies → React shows success and navigates

            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(res.data.msg);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'resgistration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                    <label>Email:</label><br />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                    <label>Password:</label><br />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div>
                    <label>Role:</label><br />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="jobseeker">Jobseeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>Register</button>
            </form>
        </div>
    );
};

export default Register;