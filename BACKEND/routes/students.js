const router = require("express").Router();
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
let Student = require("../models/Student");
let path = require("path");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '')
    },
    filename: function(req, file, cb){
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if(allowedFileTypes.includes(file.minetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    } 
}
let upload = multer({storage, fileFilter });


//router for create function
/*http://localhost:8070/student*/
router.route("/add").post((req,res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const birthdate = req.body.birthdate;
    const photo = req.file.filename;

    const newStudent = new Student({
        name,
        age,
        gender,
        birthdate,
        photo
    })

newStudent.save().then(() => {
    res.json("Student Added")
}).catch(() => {
    console.log(err);
})
})

router.route("/").get((req, res) => {
    Student.find().then((students) => {
        res.json(students)
    }).catch(() => {
        console.log(err);
    })
    
})

/* https//localhost:8070/update/5fggfd */   
router.route("/update/:id").put(upload.single("photo"), async(req, res) => {
    let userId = req.params.id;
    //destructure method
    //const{name, age, gender} = req.body;
    const name = req.params.name;
    const age = req.params.age;
    const gender = req.params.gender;
    const birthdate = req.params.birthdate;
    const photo = req.file.filename;

    const updateStudent = {
        name,
        age,
        gender,
        birthdate,
        photo
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
        res.status(200).send({status: "user updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})
    //delete function
    router.route("/delete/:id").delete(async(req, res) => {
        let userId = req.params.id;

        await Student.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({status: "user deleted"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete user", error: err.message});
        })
    })

    //get
    router.route("/get/:id").get(async(req, res) => {
        let userId = req.params.id;
        const user = await Student.findById(userId)
        .then((student) => {
            res.status(200).send({status: "User fetched", student})
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({status: "error with get user", error: err.message});
        })
    })
    
module.exports = router;