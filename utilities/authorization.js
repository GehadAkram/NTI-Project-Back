const jwt = require('jsonwebtoken');
const secretKey = '8!M{EvRp$!:nO{/6qhO"$Sqpp,v$`HCTgh5c8|vkHsXQ(vj07~mjf88?hi&sdmH';

exports.createToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: '1h' });
}

exports.authorized = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ error: 'Access Denied (Missing Token)' });
        }
        req.user = jwt.verify(token,secretKey);
        next();
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}