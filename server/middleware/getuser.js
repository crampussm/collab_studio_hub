var jwt = require('jsonwebtoken');
const JWT_SECRET = "secrettosign"

// Writing the middleware function
const getUser = (req, res, next)=>{
    // Taking the authentication token through req.header
    const authToken = req.header('auth-token')
    // Checking if there is a token or not
    if(!authToken){
        // if token is not valid then send this response
        res.status(401).send({error: "please enter a valid authentication token"});
    }
    try {
        // Decoding the authentication token using the secret
        const data = jwt.verify(authToken, JWT_SECRET);
        // console.log(data) --> { user: { id: '659d785717ffd48b47aa6334' }, iat: 1704822114 }
        // Setting req.id to the id we get after decoding
        req.id = data.user.id;
        // Calling the next function at the end of a middleware is necessory
        next();
    } catch (err) {
        // If some err occured
        console.error(err);
        res.status(500).json({"err": "please enter a valid authentication token"});
    }
}

// Exporting the getUser middleware
module.exports = getUser;