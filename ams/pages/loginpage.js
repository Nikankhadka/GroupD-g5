import Navbar from "../components/navbar"
import Link from 'next/link';
import { useForm } from "react-hook-form";

import Admin from "./admin";
import axios from 'axios';




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
                {check && <Login />}
            </div>
    
    
        )
    
    
       
    }
    





 function Login(){
    


    //usoign react hook form to get form object and handle erorr
    const {register,handleSubmit,formState: { errors }}=useForm();
    const[e1,sete1]=useState(false);
   
    //onsubmit handler
    const onSubmit=(data)=>{
        
        console.log(data)
       
        axios.post(`http://localhost:2900/api/v1/login`,{userId:data.userId,password:data.password},{ withCredentials: true })
        .then(res =>  {
            
            //will get response if false then show eroror
            if(res.data.status==false){
                sete1(true)
            }
            else {
                //check type of login then open the dashboard
                if(res.data=="admin"){
                    sete1(false)
                    window.location.href = './admin'
               }
               else if(res.data=="user"){
                sete1(false)
                window.location.href="./user"
               
               }
                
            }
       
          
        })
        
    }


    
    return(
        <div>
            {/* nav bar for the login page  */}
        <Navbar/> 

       
        <div class="container-login">
           

            <div class="wrap-login">
           
                <div class="login-pic">
                    <img src="/leaf22.png" alt="IMG"/>
                </div>
                 {/* when user submits the form the */}
                <form class="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 class="login-form-title">Login</h2>

                    <div class="wrap-input">
                    <input type="text" class="input"  placeholder="userId" {...register('userId', { required:true})}/>
                     </div>
                     {errors.username && <p className="p1">enter valid username</p>}
                    <div class="wrap-input">
                    <input type="password" class="input"  placeholder="password" {...register('password', { required:true })}/>
                    </div>
                    {errors.password && <p className="p1">enter valid password</p>}
                    
                    <div class="login-form-btn-container">
                        <input type="submit" class="login-form-btn" value="Login"/>
                    </div>
                    {/* conditional rendering to display erors based on input validation */}
                    {e1? <p className="p1">username/password not matched</p>:console.log({e1})}
                  
                  <div class="text-center p-t-2">
                  <Link href="/Signup">
                    <a>Create Your Account</a>
                 </Link>
                     
                  </div>

                </form>

            </div>
        </div>
    </div>
        
    )
}