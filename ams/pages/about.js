import Navbar from "../components/navbar"

import Footer from "../components/footer"

import { useState ,useEffect} from "react"
import * as api from "../Api/apicall"






export default function Authorize(){




    const [check,setcheck]=useState(false)
    //function checks for result fromt the authorization calls then only reners the page
    function verify(result){
      console.log(result)
      if(!result){
        setcheck(true)
         
      }else if(result=="admin"){
        window.location.href="../admin"
        console.log("chalyo hai ya")
          
         
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
                {check && <About />}
            </div>
    
    
        )
    
    
       
    }
    













 function About(){
    return(
        <div>
            {/* importing the nav bar  */}
            <Navbar />

            <div className="About-body"> 
               <div className="headding">
                <h1>Agriculutre Management System</h1>
               </div>
               <div className="tete">
                   <img  src='/leaf22.png' id="ii"></img>
                   <div className="content">
                       <h1>
                           About us
                       </h1>
                       <p>
                       We here at Agriculture Management have been working for the past 10 years to bring quality goods and products to our valuable customer all over the world without any comprpmisation. We are all about quality assurance and finished good delivery.
                       </p>
                   </div>
               </div>
            </div>
            {/* divider to seperte the body fromt the footer */}
            <div className="divider"></div>
            {/* importing the footer section */}
            <Footer />

        </div>
    )
}