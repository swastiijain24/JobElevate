import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchJobs = async()=>{
        try{
            //sends a get req to get all jobs
            const res = await axios.get('http://localhost:5000/api/jobs');
            setJobs(res.data);
        } catch(err){
            setError('failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    //when page loads calls fetch jobs
    useEffect(()=>{
        fetchJobs();
    },[]);

    if(loading) return <p>Loading Jobs...</p>;
    if(error) return <p style={{color:'red'}}>{error}</p>;
    
    return (
        <div style={{ padding: '20px' }}>
      <h2>Job Listings</h2>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <Link key={job._id} to={`/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
    </div>
  </Link>
        ))
      )}
    </div>
  );
};

export default JobList;