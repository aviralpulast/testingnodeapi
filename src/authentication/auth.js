const jwt = require("jsonwebtoken")
const SECRET_KEY = "notesapi"



const auth = (req,res,next) => {

    try {
        let token = req.headers.authorization;
        if(token)
        {
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.id;
        }else
        {
            res.status(401).json({msg:"unauthorized user"})
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({msg:"unauthorized user"})
    }

}

module.exports = auth;