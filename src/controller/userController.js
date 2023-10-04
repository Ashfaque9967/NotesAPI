const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = processs.env.SECRET_KEY;

const signup = async (req, res) =>{

    // Exixting user
    // hashed password
    // user creation
    // token generation

    const {username, email, password} = req.body;
    try {
        
        const existinguser = await userModel.findOne({ email : email});
        if(existinguser){
            return res.status(400).json({message: "user already exists"});
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email, 
            password: hashedpassword, 
            username: username
        });

        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
        res.status(201).json({user: result, token: token});

    } catch (error) {

        console.log(error);
        res.status(500).json({message: "somthing went wrong"});
        
    }
}

const signin = async (req, res) =>{

    const {email, password} = req.body;

    try {
        
        const existinguser = await userModel.findOne({email: email});
        if(!existinguser){
            return res.status(400).json({message: "user not found"});
        }

        const matchpassword = await bcrypt.compare(password, existinguser.password);

        if(!matchpassword){
            return res.status(400).json({message: "Invaild credential"});
        }

        const token = jwt.sign({email: existinguser.email, id: existinguser._id}, SECRET_KEY);
        res.status(200).json({user: existinguser, token: token});


    } catch (error) {
        
        console.log(error);
        res.status(500).json({message: "somthing went wrong"});

    }

}

module.exports = {signup, signin, SECRET_KEY};