const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.createAuthToken = (user) => {
    const token = jwt.sign({id: user.id, name: user.name, email: user.email, type: user.type}, process.env.APP_SECRET_TOKEN);
    return token;
}

exports.createAdminAuthToken = (admin) => {
    const token = jwt.sign({id: admin.id, email: admin.email}, process.env.APP_SECRET_TOKEN);
    return token;
}

exports.checkAuthToken = (req, res, next) => {
    let token 
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];   
    }
    if (!token) return res.json({type: 0, isAuth: false, data: null});
    
    const user = jwt.verify(token, process.env.APP_SECRET_TOKEN);

    req.user = user;
    
    return next();
}
