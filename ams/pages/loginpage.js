import Navbar from "../components/navbar"
import Link from 'next/link';
import { useForm } from "react-hook-form";
import {useState} from 'react';
import Admin from "./admin";
import axios from 'axios';







export default function Login(){
    
    //local object to validate form data
    const user={
        name:"admin",
        password:"admin",
        catg:"admin"
    }


    //usoign react hook form to get form object and handle erorr
    const {register,handleSubmit,formState: { errors }}=useForm();
    const[e1,sete1]=useState(false);
   
    //onsubmit handler
    const onSubmit=(data)=>{
        
        console.log(data)
       
        axios.post(`http://localhost:2900/api/v1/login`,{username:data.username,password:data.password},{ withCredentials: true })
        .then(res =>  {
            
            if(res.data){
                sete1(false)
                console.log(res.data)
                window.location.href = './admin'
            }
            else {
                sete1(true)
            }
       
          
        })
        
    
        // if(data.username==user.name&&data.password==user.password&&data.pcat==user.catg){
        //     console.log(username)
            
            
        //     sete1(false)
        // }else{
        //     //set is method u shen u update the value or change u pass the change as parameter 
        //     if(!e1){
        //         sete1(!e1);
        //     }
        //     else{
        //         sete1(true)
        //     }
           
        // }
    

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
                    <input type="text" class="input"  placeholder="username" {...register('username', { required:true})}/>
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
                  <Link href="/">
                    <a>Create Your Account</a>
                 </Link>
                     
                  </div>

                </form>

            </div>
        </div>
    </div>
        
    )
}