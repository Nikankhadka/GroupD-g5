import Usernav from "../../components/usernav";
import { useForm } from "react-hook-form";
import Link from "next/link"
import { useState,useEffect } from "react";
import * as api from "../../Api/apicall"
import Confirm from "../../components/confirmation";
import {ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage}  from "../base"
import axios from "axios";
import Alert from "../../components/alert";



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
                {check && <Cropsetting />}
            </div>
    
    
        )
    
    
       
    }
    
    
    






 function Cropsetting(){
   // react hook form makes it easier to acess and use hooks
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [e1,sete1]=useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})
    const [alert,setalert]=useState(false)


    const[category,setcategory]=useState([]);
     //when trying to call remote api function in use effect, call thrugh async function
     useEffect(  async()=>{
        api.Category(set)}
        ,
       //use this bracket to only run once if some change is detected 
       []
       );

       //setter function to chnage state by passing as a call back 
    function set(data){
        
        setcategory(data);
       
    }


    function onclick(data2){
        setdata1(data2)
         setModalOpen(true)
         }
       
       
         //pass callback and state 
        function Action(){
             
         const storageRef = ref(storage, `files/${data1.image[0].name}`);
          const uploadTask = uploadBytesResumable(storageRef, data1.image[0]);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
             
            },
            (error) => console.log(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             //    console.log("File available at", downloadURL);
                postcrop(downloadURL,data1)
              });
            }
          );
             
        }
 
 
 
        function postcrop(url,data){
        
         //creatuning object to store extra image url and passing that into data base
         const update={
         category: data.category,
         crop_details: data.crop_details,
         crop_name: data.crop_name,
         farmers_rate:data.farmers_rate,
         image:url,
         imagename:data.image[0].name,
         market_rate:data.market_rate,
         }
 
         console.log(update);
         
 
         axios.post(`http://localhost:2900/api/v1/userpost/${update.category}`,{update},{withCredentials:true})
         .then(res =>  {
             if(res.data){
                setalert(true)
                 setModalOpen(false)
                 sete1(false)
             }else{
                 alert("crop not posted/already exist")
             
                 //passed as callback to setmodel to false
                 setModalOpen(false)
                 sete1(true)
                
             }
 
 
     })
        
         
 
        }



    return(
        <div>
                {/* alert */}
        {alert && <Alert setalert={setalert} msg={"Crop Posted Succesfully"} />}
             {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
            <Usernav/>

            <div class="container-login">
           

            <div class="wrap-login">
           
                
                 {/* when user submits the form the */}
                <form class="login-form" onSubmit={handleSubmit(onclick)}>
                    <h2 class="login-form-title">Post Crop</h2>
                    

                    <div class="wrap-input">
                    <h5> Enter crop Name:</h5>
                    <input type="text" class="input"  placeholder="cropName" {...register('crop_name', { required:true})}/>
                     </div>
                     {errors.crop_name && <p className="p1">enter valid cropname</p>}


                    <div class="wrap-input">
                    <h5> Enter crop details:</h5>
                    <input type="text" class="input"  placeholder="crop_details" {...register('crop_details', { required:true})}/>
                     </div>
                     {errors.crop_details && <p className="p1">enter alid crop_details</p>}


                      
                    <div class="wrap-input">
                    <h5> Enter farmer rate:</h5>
                    <input type="number" class="input"  placeholder="Farmer_rate" {...register('farmers_rate', { required:true })}/>
                    </div>
                    {errors.farmers_rate && <p className="p1">enter farmer rate</p>}
                    

                    <div class="wrap-input">
                    <h5> Enter market rate:</h5>
                    <input type="number" class="input"  placeholder="market rate" {...register('market_rate', { required:true})}/>
                     </div>
                     {errors.market_rate && <p className="p1">enter market_rate</p>}

                     <div class="wrap-input">
                     <h5> Input image:</h5>
                    <input type="file" class="input"  placeholder="image" {...register('image', { required:true})}/>
                     </div>
                     {errors.image && <p className="p1">Input image</p>}

                     <div class="wrap-input">
                     <h5> Select category:</h5>
                     <select name="pets" className="input" {...register("category", { required: true })}>
                             {
                                 category.map(e=>{
                                     return(
                                         <option value={e}>{e}</option>
                                     )
                                 })
                                  }
                         </select>
                     
                        </div>

                     {/* conditional rendering to display erors based on input validation */}
                     {e1? <p className="p1">crop Exist/new Input please</p>:console.log({e1})}

                    <div class="login-form-btn-container">
                        <input type="submit" class="login-form-btn" value="Post crop"/>
                    </div>
                    
                  
                

                </form>

            </div>
        </div>
            
        </div>
        
        )
}