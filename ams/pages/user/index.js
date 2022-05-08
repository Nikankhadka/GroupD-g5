 
import Usernav from "../../components/usernav"
 
 
 
 
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios"
import * as api from "../../Api/apicall"
 
 
export default function Authorize(){
 
const [user,setuser]=useState("");
const [check,setcheck]=useState(false)
//function checks for result fromt the authorization calls then only reners the page
function verify(result){
    console.log(result)
    if(!result){
        alert("please login to come")
         window.location.href="../loginpage"
 
    }else if(result=="admin"){
 
        window.location.href="../admin"
    }
    else{
        setuser(result);
        setcheck(true)
    }
}
 
 
 
    //call api function
    useEffect(()=>{
 
        api.Authorize(verify)
    },[]);
 
    //once everything is verified then only the page will be rendered
    return(
        <div>
            {check && <User  user={user}   />}
        </div>
 
 
    )
 
 
 
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
function User(props){
 
     const [farmer, setfarmer] = useState([]);
    useEffect(() => {
         axios.get(`http://localhost:2900/api/v1/farmer`)
        .then(result => {
 
 
 
             setfarmer(result.data) 
 
            console.log(result.data);
 
        })
       },
       //use this bracket to only run once if some change is detected 
       []);
 
 
 
 
 
    return(
            <div>
                <Usernav />
                <h1 className="weltext"> Welcome {props.user}</h1>
            </div>
 
        )
}