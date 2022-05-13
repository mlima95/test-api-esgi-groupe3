const {User} = require("../models");

const jwt = require("jsonwebtoken");
/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}


exports.checkJWT = async (req, res, next) => {
    let token = extractBearerToken(req.headers['authorization']);

    if(token){

        jwt.verify(token, process.env.SECRET_KEY, async (err, user)=>{
            console.log({token, user, err})
            if(err){
                return res.status(401).send({message: "token not valid"});
            } else{
                req.user = await User.findOne({where: {username: user.username}});
                next();
            }

        });
    }else{
        return res.status(401).send({message: "token required"});
    }
}