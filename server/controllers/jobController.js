const Job = require ('../models/Job');
const getJobById = async (req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({msg: 'Job not found'});
        res.json(job);
    }catch(err){
        res.status(500).json({msg: 'server error'});
    }
};

module.exports={
    getJobById
};