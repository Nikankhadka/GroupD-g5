import Adminnav from "../../components/adminnav";
import { useForm } from "react-hook-form";


import Postcrop from "../../components/postcrop";
import Deletecrops from "../../components/deletecrops";
import Updatecrop from "../../components/updatecrop";





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
            {check && <Category />}
        </div>


    )


   
}









//only render after checking the authorization from token stored in cookies
function Category(){

    //state for conditional form rendering 
    const [page, setpage] = useState(<Postcrop />);




    return(
        <div>
            <Adminnav />


            <div className="btn-container">
                        <button  className="login-form-btn"  onClick={()=>{
                           setpage(<Deletecrops />)
                        }}>Delete</button> 
                        <button  className="login-form-btn"  onClick={()=>{
                            setpage(<Postcrop />)
                        }}>POST</button> 
                    <button  className="login-form-btn"  onClick={()=>{
                          setpage(<Updatecrop />)
                        }}>UPDATE</button> 
                    </div>
                    
                    {/* state based rendering just changes the component on button click  */}
                    {page}

           
            


            

        </div>
        
        )
}