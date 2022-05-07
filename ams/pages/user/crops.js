import Usernav from "../../components/usernav";
import Cropd from "../../components/cropdetail";
import { useState,useEffect } from "react";
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
            
            window.location.href="../admin"
        }
        else{
            console.log("chalyo hai ya")
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
                {check && <Crops />}
            </div>
    
    
        )
    
    
       
    }
    
    
    


function Crops(){


    return( 

            <div>
                <Usernav/>

                <Cropd />
            </div>
    )
}