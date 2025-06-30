// Verifies that the user is logged in (has a valid token)
// Extracts the user's ID and role from the token
// Allows only authorized users to access protected routes
// Centralizes authentication logic (DRY code)


const jwt = require ('jsonwebtoken');
const authMiddleware = (req, res, next)=>{

    //A "pass" you give to the server to prove who you are
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg: 'no token, authorization failed!'});
    }

    //it is like  Bearer <JWT_TOKEN> we only want the [1] part that is the token
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //if verified we get the decoded toekn back which includes user id and role which we created using the login time 
        req.user = decoded; //any route using middleware can access req.user.id or role
        next();
    } catch (err){
        return res.status(401).json({msg: 'Token is not valid'});
    }
};

module.exports = authMiddleware;