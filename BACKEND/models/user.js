const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new Schema({
    username :{
        type:String,
        required : [true, "please enter a username"]
    },

    email:{
        type:String,
        required:[true, "please provide a email"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please provide a valid mail"]

    },

    password:{
        type: String,
        required:[true, "Please enter a password"],
        select:false,
        minlength: 6
    },

    reserPasswordToken :String,
    resetPasswordExpire: Date
})

//this is for register route
UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

//this is for login route
UserSchema.methods.matchPasswords = async function() {
    return await bcrypt.compare(password, this.password); //check the entered password and password which is received from the db
}

//for register json web token (JWT)
UserSchema.methods.getSignedToken = function() {
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});

}

//for rest json web token
UserSchema.methods.getResetPassword

const User = mongoose.model("User", UserSchema)
module.exports = User;