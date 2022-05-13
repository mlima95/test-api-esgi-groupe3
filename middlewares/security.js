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

exports.checkRoleAdmin = async (req, res, next) => {
    if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE" || req.method === "PATCH") {
    if(req.user.roles !== "ADMIN"){
        return res.status(401).send({message: "unauthorized"});
    }
    next();
    } else {
        return res.status(401).send({message: "unauthorized"});
    }
}

exports.checkRoleUser = async (req, res, next) => {
    if (req.method === "GET"){
    if(req.user.roles !== "USER"){
        return res.status(401).send({message: "unauthorized"});
    }
    next();
    } else {
        return res.status(401).send({message: "unauthorized"});
    }
}

exports.checkRole = async (role) => {
    return async (req, res, next) => {
        if(role === req.user.roles){
            next();
        } else{
            return res.status(401).send({message: "unauthorized"});
        }
    }
}