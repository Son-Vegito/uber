const jwt = require('jsonwebtoken');

function authUser(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userID = decoded.id;
        next();
        
    }
    catch(err){
        console.error(err);

        return res.status(401).json({
            message: 'Unauthorized'
        })

    }

}

module.exports = authUser