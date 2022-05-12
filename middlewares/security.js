const jwt = require("jsonwebtoken");

exports.checkJWT = async (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                return res.status(401).send({message: "token not valid"});
            } else{
                req.decoded = decoded;
                const expireIn = 24 * 60 * 60;
                const newToken = jwt.sign({user: decoded.user}, process.env.SECRET_KEY, {expireIn:expireIn});
                res.header('Authorisation', 'Bearer ' + token);
            }
        });
    }else{
        return res.status(401).send({message: "token required"});
    }
}