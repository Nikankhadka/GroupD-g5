
import { useForm } from "react-hook-form";
import Link from "next/link"
import { useState,useEffect } from "react";
import * as api from "../Api/apicall"
import Confirm from "../components/confirmation";
import {ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage}  from "../pages/base"
import axios from "axios";
import Alert from "./alert";





export default function Cropupdate(props){

       // react hook form makes it easier to acess and use hooks
       const {register,handleSubmit,formState: { errors }}=useForm();
       const [e1,sete1]=useState(false);
       const [modalOpen, setModalOpen] = useState(false);
       const [data1,setdata1]=useState({})
      const[alert,setalert]=useState(false);
   

       const onclick=(data)=>{
         setModalOpen(true)
         setdata1(data);
       }

       //action to be performed after continution 
    function Action(){
      console.log('action bhitra')
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
              console.log("File available at", downloadURL);
             updatecrop(downloadURL,data1)
           });
         }
       );
  }

  //called to perdor
  function updatecrop(url,data){
      console.log("update crop bhitra")
      const update={
          crop_id:props.cropid,
          
          crop_details: data.crop_details,
          crop_name: data.crop_name,
          imagename:data.image[0].name,
         
          farmers_rate:data.farmers_rate,
          image:url,
          market_rate:data.market_rate,
          }

          console.log(update)
          axios.patch(`http://localhost:2900/api/v1/userupdate/${update.crop_id}`,{update})
          .then(res =>  {
              if(res.data=="updated"){
                 setalert(true)
                  setModalOpen(false)
              }else{
                  alert("crop details not updated")
                setModalOpen(false)
              }
  
  
      })

  }




    return(  



        
        <div className="modalback">
             {/* alert */}
        {alert && <Alert setalert={setalert} msg={"Crop updated Succesfully"} />}
        
          <div className="title">
            
          <div class="container-login">
           

           <div class="wrap-login">
           
           {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
               
                {/* when user submits the form the */}
               <form class="login-form" onSubmit={handleSubmit(onclick)}>
                   <h2 class="login-form-title">Update crop</h2>
                   
   
                   <div class="wrap-input">
                   
                   <input type="text" class="input"  placeholder="cropName" {...register('crop_name', { required:true})}/>
                    </div>
                    {errors.crop_name && <p className="p1">enter valid cropname</p>}
   
   
                   <div class="wrap-input">
                   
                   <input type="text" class="input"  placeholder="crop_details" {...register('crop_details', { required:true})}/>
                    </div>
                    {errors.crop_details && <p className="p1">enter alid crop_details</p>}
   
   
                     
                   <div class="wrap-input">
                 
                   <input type="number" class="input"  placeholder="Farmer_rate" {...register('farmers_rate', { required:true })}/>
                   </div>
                   {errors.farmers_rate && <p className="p1">enter farmer rate</p>}
                   
   
                   <div class="wrap-input">
                   
                   <input type="number" class="input"  placeholder="market rate" {...register('market_rate', { required:true})}/>
                    </div>
                    {errors.market_rate && <p className="p1">enter market_rate</p>}
   
                    <div class="wrap-input">
                   
                   <input type="file" class="input"  placeholder="image" {...register('image', { required:true})}/>
                    </div>
                    {errors.image && <p className="p1">Input image</p>}
   
                    
   
                    {/* conditional rendering to display erors based on input validation */}
                    {e1? <p className="p1">crop Exist/new Input please</p>:console.log({e1})}
        <div class="btn-container">
        <div class="login-form-btn-container">
                       <input type="submit" class="login-form-btn" value="update crop"/>
                   </div>
                   
                   <div className="footer">
            <button
              onClick={() => {
                props.setupdateModal(false);
                
              }}
              id="cancelbtn"
            >
              Cancel
            </button>
            
          </div>
        </div>
  
               
   
               </form>
          </div>
              
          
        </div>
        </div>
     

       

        </div>
   
    )
}