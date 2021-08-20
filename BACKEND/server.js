//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const errorHandler = require("./middleware/error");



//assign a port              logical OR
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//assign connection to a seperate variable
const connection = mongoose.connection;
//use to connect to the db once
connection.once("open", () => {
    console.log("Mongodb connection successful!");
})

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter);

//run on the defined port
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
})


app.use("/api/auth", require("./routes/auth"));
//app.use("/api/private", require("./routes/private"));

//Error Handler (Should be the last piece of middleware)
app.use(errorHandler);
