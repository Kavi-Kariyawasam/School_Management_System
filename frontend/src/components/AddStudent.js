import React,{useState} from "react";
import axios from "axios";

export default function AddStudent() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    function sendData(e){
        e.preventDefault();

        const newStudent = {
            name,
            age,
            gender
        }

        axios.post("http://localhost:8070/student/add", newStudent).then(() => {
            alert("Student Added");
            setName("");
            setAge("");
            setGender("");

        }).catch((err) => {
            alert(err);
        })
        //console.log(newStudent);
    }

    return(
        <div 
        classNameName="container">
          <form onSubmit={sendData}>
            <div 
            className="form-group">
                <label for="name" 
                className="form-label">Student Name</label>
                <input type="text" 
                className="form-control" id="name" placeholder="enter student name"
                onChange = {(e)=>{
                    setName(e.target.value);
                }}
                />    
            </div>
            
            <div 
            className="form-group">
                <label for="age" 
                className="form-label">Student Age</label>
                <input type="text" 
                className="form-control" id="age" placeholder="enter student age"
                onChange = {(e)=>{
                    setAge(e.target.value);
                }}
                />    
            </div>

            <div 
            className="form-group">
                <label for="gender" 
                className="form-label">Gender</label>
                <input type="text" 
                className="form-control" id="gender" placeholder="enter gender"
                onChange = {(e)=>{
                    setGender(e.target.value);
                }}
                />    
            </div>
            
    
            <button type="submit" 
            className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

