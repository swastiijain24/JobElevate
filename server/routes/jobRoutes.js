const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');
const { getJobById} = require('../controllers/jobController');
router.get('/:id', getJobById);
// POST /api/jobs - Add new job (recruiter only)
router.post('/', authMiddleware, async (req, res) => { //middleware ensures only loggedin users can access it
    try {
        const { title, company, location, type, description, skills } = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            type,
            description,
            skills,
            postedBy: req.user.id // from jwt token
        });

        res.status(201).json({msg: 'job created successfully', job});
    } catch(err) {
        res.status(500).json({msg: 'server error', error:err.message});
    }
});

router.get('/', async (req,res)=>{
    try{
        const jobs = await Job.find().sort({ createdAt : -1}); // sorts the jobs in dec order so newest first
        res.json(jobs);
    }catch (err){
        res.status(500).json({msg: 'server error'});
    }
});


module.exports = router;