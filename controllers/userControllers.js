const User = require ("../models/user.js")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")
const generateToken = require ("../utils/generateToken.js")

const createUser = async (req , res)=>{
    try {
        const user = new User (req.body);
        const {email, password} = req.body

        // check if the Email is used
        const exist = await User.findOne({email});
        if (exist) res.status(400).json("User with this Email already exist!!")
         const hashPass = await bcrypt.hash(password,10);
         user.password=hashPass;
         const newUser = await user.save();

         return res.status(200).json(newUser)


    } catch (error) {
        console.log(error, "error")
    }
}

// find all users in DB using get method
const getAllUsers = async (req , res)=>{
    try {
       const userList = await User.find();
       res.status(200).json(userList)

    } catch (error) {
        console.log(error, "error")
    }
}

// Get user by Id using get method
const getUser = async (req , res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error, "error")
    }
}


const deleteUser = async (req, res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        if (user) {
            await user.deleteOne();
            res.status(200).json("user deleted successfully")
        }else{
            res.status(400).json("user does not exist")
        }
    } catch (error) {
        console.log(error, "error")
    }
}


const updateUser = async (req, res)=>{
    try {
        const {password} = req.body;
        const hashPass = await bcrypt.hash(password,10);
        req.body.password= hashPass;
        let newData = await User.updateOne(req.params , {$set : req.body});
        if (newData){
            res.status(200).json(newData)
        }else{
            res.status(400).json("User does not exist")
        }
    } catch (error) {
        console.log(error, "error")  
    }
}


const connectUser = async (req, res)=>{
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            console.log(user)
            const validPass = user && (await bcrypt.compare(password, user.password));
            if (user && validPass){
                    res.status(200).json({
                        _id:user._id,
                        name: user.name,
                        email: user.email,
                        token: generateToken(user._id),
                    })
                    
                }else{
                    res.status(401).json("Invalid email or password");
                }
        } catch (error) {
            console.log(error, "error")
        }
};


module.exports = {createUser, getAllUsers, getUser, deleteUser, updateUser, connectUser};