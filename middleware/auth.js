const verifyToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader
        next()
    } else {
        res.sendStatus(403);
    }
}

exports.verifyToken = verifyToken;