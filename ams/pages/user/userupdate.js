
import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';

import axios from "axios"
import Confirm from "../../components/confirmation";
import Usernav from "../../components/usernav";
import Alert from "../../components/alert"
import * as api from "../../Api/apicall";





    
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
                {check && <Userupdate />}
            </div>
    
    
        )
    
    
       
    }
    
    
    










 function Userupdate(){
    const [farmer, setfarmer] = useState([]);
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})
    const [alert,setalert]=useState(false);













    function click(data){
        setdata1(data)
        console.log(data)
        setModalOpen(true)
    }

    function Action(){

        console.log(data1)


        axios.patch(`http://localhost:2900/api/v1/farmer`,{data1},{withCredentials:true})
        .then(res =>  {
            console.log(res)
            if(res.data=="updated"){
                alert("farmer information succesfully updated")
                setModalOpen(false)
            }else{
                alert("failed to update")
            }


    })
    }








    return(
    <div>
        <Usernav />



        <div className="farmer"> 
    {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
   

    <div class="container-login">
           

           <div class="wrap-login">
          
               
                {/* when user submits the form the */}
               <form class="login-form" >
                   <h2 class="login-form-title">Update farmer Details</h2>
                   

                   <div class="wrap-input">
                   <h5> Enter user Name:</h5>
                   <input type="text" class="input"  placeholder="userName" {...register('user_name', { required:true})}/>
                    </div>
                    {errors.user_name && <p className="p1">enter valid username</p>}


                   <div class="wrap-input">
                   <h5> Enter new password:</h5>
                   <input type="password" class="input"  placeholder="new password" {...register('password', { required:true})}/>
                    </div>
                    {errors.password && <p className="p1">enter new password</p>}


                     
                   <div class="wrap-input">
                   <h5> Enter province:</h5>
                   <input type="text" class="input"  placeholder="province" {...register('province', { required:true })}/>
                   </div>
                   {errors.province && <p className="p1">enter province</p>}
                   

                   <div class="wrap-input">
                   <h5> Enter ward:</h5>
                   <input type="number" class="input"  placeholder="ward" {...register('ward', { required:true})}/>
                    </div>
                    {errors.ward && <p className="p1">enter ward</p>}

                    <div class="wrap-input">
                    <h5> family:</h5>
                   <input type="number" class="input"  placeholder="family" {...register('family', { required:true})}/>
                    </div>
                    {errors.family && <p className="p1">Input family</p>}

                   

                    

                   <div class="login-form-btn-container">
                   <button  type="submit" className="login-form-btn"  onClick={handleSubmit(click)}>Update</button> 
                   </div>
                   
                 
               

               </form>

           </div>
       </div>


           

        
           
           
           
           </div>



    </div>    
    





      
        
        
        
        
        
        
        
        
        
        )
}