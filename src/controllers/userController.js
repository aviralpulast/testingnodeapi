const userModal = require("../modals/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { restart } = require("nodemon")
const SECRET_KEY = "notesapi"


const signup = async (req, res) => {
    //check existing
    //hash Password
    //userCreation
    //tokenGeneration

    const {username, email, password} = req.body;
    try {

        const existingUser = await userModal.findOne({email:email});
        if(existingUser)
        {
            return res.status(400).json({msg: "user already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModal.create({
            email:email,
            password: hashPassword,
            username: username
        })

        const token = jwt.sign({email:result.email, id: result._id }, SECRET_KEY)
        res.status(201).json({
            user: result, 
            token: token
        });

    }catch(err){
        console.log("error aagaya signup mein--", err);
        res.status(500).json({msg:"db connection issue"})
    }
}

const signin = async (req, res) =>{

    const {email,password} = req.body;

    try{
        const existingUser = await userModal.findOne({email: email})
        if(!existingUser){
            return res.status(404).json({msg:"user not found"})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({msg:"password not matched"})
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, SECRET_KEY)
        res.status(201).json({
            user: existingUser, 
            token: token
        });

    }catch(err){
        console.log("error aagaya signin mein--", err);
        res.status(500).json({msg:"login issue"})
    }
}

module.exports = { signup, signin}