import Adminnav from "../../components/adminnav"
import Cropd from "../../components/cropdetail"




import React, { useMemo, useState, useEffect } from "react";
import axios from "axios"
import * as api from "../../Api/apicall"


export default function Authorize(){




const [check,setcheck]=useState(false)
//function checks for result fromt the authorization calls then only reners the page
function verify(result){
    console.log(result)
    if(!result){
        alert("please login to come")
         window.location.href="../loginpage"
       
    }else if(result=="admin"){
        console.log("chalyo hai ya")
        setcheck(true)
       
    }
    else{
        window.location.href="../user"
    }
}



    //call api function
    useEffect(()=>{
       
        api.Authorize(verify)
    },[]);

    //once everything is verified then only the page will be rendered
    return(
        <div>
            {check && <Acrop />}
        </div>


    )


   
}




//only renders after chekcing the cookies

 function Acrop(){
    return(
        <div>
        <Adminnav />
        <Cropd/>
        </div>

    )

}