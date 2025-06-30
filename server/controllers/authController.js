const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// sign up - register controller
exports.register = async (req, res)=>{
    try{
        //took this data from frontend
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({msg: "user already exists"});
        
        //will not store pass directly instead will store hashed pass where it converts it into some other complex string and is irreversible means you cannot get the password from the hashed one
        const hashedPassword = await bcrypt.hash(password, 10);

        const  user = await User.create({
            name, 
            email,
            password : hashedPassword,
            role
        });
        res.status(201).json({msg: "user registered successfully"});
    }catch (err){
        res.status(500).json({msg:"server error", err});
    }
    };

    exports.login = async (req, res)=>{
        try{
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if(!user) return res.status(404).json({msg: "user not found"});

            //coompare the pass entered by the user and the hashed pass
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(401).json({ msg: "Invalid credentials" }); 

            //creating a jwt token which contains user id and role and the secret key which comes from env 
            const token = jwt.sign({ id : user._id, role : user.role}, process.env.JWT_SECRET, {expiresIn : "7d"});

            //return the token and some basic user info excluding the pass
            res.status(200).json({token, user:{ id:user._id, name: user.name, role: user.role}});
        }catch(err){
            res.status(500).json({msg: "server error", err});
        }
        };
    