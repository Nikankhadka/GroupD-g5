import Navbar from "../components/navbar"
import Link from 'next/link';
import { useForm } from "react-hook-form";
import {useState} from 'react';

import axios from 'axios';
import Confirm from "../components/confirmation";
import Alert from "../components/alert"





export default function Signup(){
    


    //usoign react hook form to get form object and handle erorr
    const {register,handleSubmit,formState: { errors }}=useForm();
    const[e1,sete1]=useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [formdata,setformdata]=useState({})
    const [alert,setalert]=useState(false)


    //onsubmit handler just pass data into state and also use modal
    const onSubmit=(data)=>{
        setModalOpen(true);
        setformdata(data);
      
    }

    //main function to run when user confirm the modal to continue 

    const Action=()=>{
        console.log(formdata)

        axios.post(`http://localhost:2900/api/v1/signup`,{formdata})
        .then(res =>  {
            console.log(res);
            console.log(res.data);
            //will get response if false then show eroror
            if(res.data){
                console.log("ayo resp")
                setModalOpen(false)
                setalert(true)
                sete1(false)
            }
            else {
                
                setModalOpen(false)
                //for error msh
                sete1(true)
                
            }
       
          
        })
    }

    
    return(
        <div>
            {/* nav bar for the login page  */}
        <Navbar/> 
        {/* alert */}
        {alert && <Alert setalert={setalert} msg={"signIn succesfully"} />}
        {/* confirmation */}
        {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
        <div class="container-login">
           

            <div class="wrap-login">
           
                <div class="login-pic">
                    <img src="/leaf22.png" alt="IMG"/>
                </div>
                 {/* when user submits the form the */}
                <form class="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 class="login-form-title">Signup</h2>
                    

                    <div class="wrap-input">
                    <h5> Enter User Name:</h5>
                    <input type="text" class="input"  placeholder="userName" {...register('user_name', { required:true})}/>
                     </div>
                     {errors.user_name && <p className="p1">enter valid username</p>}


                    <div class="wrap-input">
                    <h5> Enter User Id:</h5>
                    <input type="text" class="input"  placeholder="userId" {...register('userId', { required:true})}/>
                     </div>
                     {errors.userId && <p className="p1">enter valid userID</p>}


                      
                    <div class="wrap-input">
                    <h5> Enter Password:</h5>
                    <input type="password" class="input"  placeholder="password" {...register('password', { required:true })}/>
                    </div>
                    {errors.password && <p className="p1">enter valid password</p>}
                    

                    <div class="wrap-input">
                    <h5> Enter province:</h5>
                    <input type="text" class="input"  placeholder="Province" {...register('province', { required:true})}/>
                     </div>
                     {errors.province && <p className="p1">enter valid Province</p>}

                     <div class="wrap-input">
                     <h5> Enter Ward:</h5>
                    <input type="text" class="input"  placeholder="Ward" {...register('ward', { required:true})}/>
                     </div>
                     {errors.ward && <p className="p1">enter valid Ward</p>}

                     <div class="wrap-input">
                     <h5> Enter Family:</h5>
                    <input type="number" class="input"  placeholder="Family" {...register('family', { required:true})}/>
                     </div>
                     {errors.family && <p className="p1">enter valid Family</p>}


                     {/* conditional rendering to display erors based on input validation */}
                     {e1? <p className="p1">User Exist/Input please</p>:console.log({e1})}

                    <div class="login-form-btn-container">
                        <input type="submit" class="login-form-btn" value="Signup"/>
                    </div>
                    
                  
                  <div class="text-center p-t-2">
                  <Link href="/loginpage">
                    <a>Log in to Your Account</a>
                 </Link>
                     
                  </div>

                </form>

            </div>
        </div>
    </div>
        
    )
}