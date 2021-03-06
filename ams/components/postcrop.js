import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';
import axios from "axios"
import {ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage}  from "../pages/base"
import Confirm from "./confirmation";
import Alert from "./alert";

import * as api from "../Api/apicall"


export default function Postcrop(){

    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})
    const [progress, setProgress] = useState(false);
    const [alert,setalert]=useState(false)
    
    //react hook form makes it easier to acess and use hooks
    const {register,handleSubmit,formState: { errors }}=useForm();
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

       //basic function which fetches the form data and uploads the then passes the form data along with image url to funtion which is uploaded to database
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
             setProgress(true);
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
        family: data.family,
        farmer_id: data.farmer_id,
        farmers_rate:data.farmers_rate,
        image:url,
        imagename:data.image[0].name,
        market_rate:data.market_rate,
        name: data.name,
        province:data.province,
        ward:data.ward,
        }

        console.log(update);
        

        //call post crop api function from api call
       Postcropdb(update.category,update,modelsetter)
    

       }


       //setter function to set model state to false
       function modelsetter(){
           console.log("dettetetete")
           setModalOpen(false)
       }
//function to post crop
async function Postcropdb(category,update,modelsetter){
       
    axios.post(`http://localhost:2900/api/v1/crops/${category}`,{update})
        .then(res =>  {
            if(res.data=="posted"){
              setalert(true); 
                //passed as callback to setmodel to false
                    modelsetter();
               
            }else{
                alert("crop not posted already exist")
            
                //passed as callback to setmodel to false
                modelsetter();
            }


    })
    
}

    return(  
        <div>
            {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}


            {/* alert */}
        {alert && <Alert setalert={setalert} msg={"Crop Posted Succesfully"} />}
            <div className="cs_set">
             
             <div className="green_bg"></div>
            
             <form className="cs_form" >
                 <div className="inner_form"> 
                     <h1>Post Crop</h1>  
                     <div className="two_div">
                     <ul className="test_grid">
                         <li><div className="wrap-input">
                             <input type="text" className="input"  placeholder="farmer name" {...register('name', { required:true})}/>
                             </div>
                             {errors.name && <p className="p1">enter valid username</p>}
                         </li>
                         <li><div className="wrap-input">
                             <input type="text" className="input"  placeholder="farmer ID" {...register('farmer_id', { required:true})}/>
                             </div>
                             {errors.farmer_id && <p className="p1">enter valid UserId</p>}
                         </li>
                         <li><div className="wrap-input">
                             <input type="text" className="input"  placeholder="Province" {...register('province', { required:true})}/>
                             </div>
                             {errors.province && <p className="p1">enter valid Province name</p>}
                         </li>
                         <li><div className="wrap-input">
                             <input type="text" className="input"  placeholder="Ward" {...register('ward', { required:true})}/>
                             </div>
                             {errors.ward && <p className="p1">enter valid Ward No.</p>}
                         </li>
                         <li><div className="wrap-input">
                             <input type="number" className="input"  placeholder="Family" {...register('family', { required:true})}/>
                             </div>
                             {errors.family && <p className="p1">enter valid Family</p>}
                         </li>
                        
     
                     
                     
                     
                     
                     </ul>
                     <ul className="test_grid2">
                         <li><div className="wrap-input">
                             <input type="text" className="input"  placeholder="Crop Name" {...register('crop_name', { required:true})}/>
                             </div>
                             {errors.crop_name && <p className="p1">enter valid Crop Name</p>}
                         </li>
     
     
                         <li><div className="wrap-input">
                             <input type="text" className="input"  placeholder="Crop details" {...register('crop_details', { required:true})}/>
                             </div>
                             {errors.crop_details && <p className="p1">enter valid Crop details</p>}
                         </li>
     
                         <li><div className="wrap-input">
                             <input type="number" className="input"  placeholder="Farmers Rate" {...register('farmers_rate', { required:true})}/>
                             </div>
                             {errors.farmers_rate && <p className="p1">enter valid Farmers Rate</p>}
                         </li>
                         <li><div className="wrap-input">
                             <input type="number" className="input"  placeholder="Market Rate " {...register('market_rate', { required:true})}/>
                             </div>
                             {errors.market_rate && <p className="p1">enter valid Market Rate</p>}
                         </li>
                         <li><div className="wrap-input">
                             <input input type="file" id="img" name="img" accept="image/*" {...register('image', { required:true})}/>
                             </div>
                             {errors.image && <p className="p1">please upload the image</p>}
                             {progress? <p>Imae Upload complete</p>:console.log("image not uploading") }
                         </li>
     
                         <select name="pets" className="input slct_size pet_down" {...register("category", { required: true })}>
                             {
                                 category.map(e=>{
                                     return(
                                         <option value={e}>{e}</option>
                                     )
                                 })
                                  }
                         </select>
                                      
                         <li> <button  className="login-form-btn li_btn" onClick={handleSubmit(onclick)}>Post Crops</button></li>
                         
                         </ul> 
     
                    
             
                     
                     </div>
                     </div>
     
                     </form>
                     
                     </div>
        </div>
        
    
    )
}