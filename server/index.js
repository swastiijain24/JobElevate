const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('job portal api is running');
});

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('mongodb connected');
    app.listen (5000, ()=>{
        console.log('server started on port 5000')
    });
}).catch(err=>{
    console.error(err);
});

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
