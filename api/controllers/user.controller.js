import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const test = (req, res)=>{
    res.json({
        msg : "Api route is working",
    });
}

export const updateUser = async(req, res, next) => {
    console.log(req.user.id)
    console.log(req.params.id)
    if(req.user.id !== req.params.id) return next(errorHandler('401', "Can only update your account"));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            }
        }, {new : true})

        const {password, ...rest} = updatedUser._doc;

        res.status(200).json(rest)
    } catch (error) {
        
    }        
}