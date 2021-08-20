const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({

    name : {
        type: String,   //data type
        required: true,  //backend validation
        trim: true
    },
    
    age : {
        type: Number,
        required: true,
        trim: true
    },

    gender : {
        type: String,
        required: true,
        trim: true
    },

    photo: {
        type: String
    },

    birthdate: {
        type: String,
        required: true,
        trim: true
    }

})

const Student = mongoose.model("Student", studentSchema);
//                              ("<document name>", )

//export the module
module.exports = Student;

const Image = mongoose.model("student", studentSchema);

module.exports = Image;