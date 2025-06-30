import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        skills: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/jobs', {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()) // if formData.skills = "JavaScript, React , Node , MongoDB" then the split splits at every comma and makes into an array like ["javascript", " react "] like this and .map runs a func here it is s.trim which remove whitespaces if any before and after like in " react " -> "react"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSuccess('Job posted successfully');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to post job');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto' }}>
            <h2>Post a Job</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Title:</label><br />
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div>
                    <label>Company:</label><br />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required />
                </div>

                <div>
                    <label>Location:</label><br />
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div>
                    <label>Type:</label><br />
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <div>
                    <label>Description:</label><br />
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div>
                    <label>Skills (comma separated):</label><br />
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;