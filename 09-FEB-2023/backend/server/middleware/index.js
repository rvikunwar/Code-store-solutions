const multer  = require('multer')
const { buildResponse } = require("../utils/common")
const jwt = require('jsonwebtoken');


//jwt authentication
function tokenAuthentication(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) return buildResponse(res, "Token is not provided", 401); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return buildResponse(res, "Token is invalid", 403);
        req.user = user;
        next();
    })
}


//for storing files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './server/images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const uploadMiddleware = multer({ storage: fileStorageEngine })


module.exports = {
    tokenAuthentication,
    uploadMiddleware
}