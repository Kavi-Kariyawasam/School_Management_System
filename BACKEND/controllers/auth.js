//JWT authentication goes here
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
//const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//when we use asynchronus function we need try catch block
exports.register = async(req, res, next)=>{
    
    const {username, email, password} = req.body;

    try{
        const user = await User.create({
            username, email, password//this.password filed of user.js in models
        })

        sendToken(user, 200, res);
    } catch (error){
        next(error);
    }
}


exports.login = async (req, res, next) =>{
    const{email, password} = req.body;

    if(!email || !password) { //backend validation
        return next(new ErrorResponse("please provide an email and password", 400));
    }


try {
    
    const user = await User.findOne({email}).select("+password");

    if(!user){ //user
        return next(new ErrorResponse("Invalid crendentials", 401));
    }

    sendToken(user, 200, res);

} catch (error) {
    res.status(500).json({// 500 internal server error
        success:false,
        error:error.message
    })
}
}

const sendToken = (user , statusCode , res)=>{ //JWT get
    const token = user.getSignedToken();
    res.status(200).json({success:true , token});
}

