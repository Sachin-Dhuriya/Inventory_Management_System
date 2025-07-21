import jwt from 'jsonwebtoken';

const authenticate = (req,res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Access denied login first!!!"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (err) {
        res.status(400).json({message: "Invalid token"})
    }

}

export default authenticate;