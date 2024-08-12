import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1jAH823OScJni4RV4Jic-A&ust=1722611066856000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjR9beI1IcDFQAAAAAdAAAAABAE"
    },
}, {timestamps : true})

const User = mongoose.model('User', userSchema);

export default User;