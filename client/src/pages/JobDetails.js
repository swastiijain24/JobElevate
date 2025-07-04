import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = ()=>{
    const {id} = useParams();
    const [job, setJob]= useState(null);

    useEffect(()=>{
        const fetchJob = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                console.log("fetched:job", res.data);
                setJob(res.data);
            }catch(err){
                console.error('error fetching jobs ', err);
            }
        };
        fetchJob();
    },[id]);
    if(!job) return <p> loading job details...</p>
    return(
         <div style={{ padding: '20px' }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Job Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Skills Required:</strong></p>
      <ul>
        {job.skills.map((skill, idx) => (
         <li key={idx}> {skill}</li>
        ))}
      </ul>
    </div>
  );
};
export default JobDetails;