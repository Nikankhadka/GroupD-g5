
import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';

import axios from "axios"
import Confirm from "./confirmation";
import {ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage}  from "../pages/base"
import Farmer from "./updatefarmer";





export default function Updatecrop(){
    
    const [progress, setProgress] = useState(false);
    const [farmer, setfarmer] = useState([]);
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})



    const [category, setcategory] = useState([]);
    //load category in selection input
    useEffect(async() => {
        await  axios.get(`http://localhost:2900/api/v1/category`)
        .then(result => {
             setcategory(result.data)  
             console.log(category)
          
        })
       },
       //use this bracket to only run once if some change is detected 
       []);






    function getcrop(data){
        setdata1(data)
        setModalOpen(true)
    }

    
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
               updatecrop(downloadURL,data1)
             });
           }
         );
    }


    function updatecrop(url,data){

        const update={
            category: data.category,
            crop_details: data.crop_details,
            crop_name: data.crop_name,
           
            farmer_id: data.farmer_id,
            farmers_rate:data.farmers_rate,
            image:url,
            market_rate:data.market_rate,
            }

            axios.patch(`http://localhost:2900/api/v1/crops/${update.category}`,{update})
            .then(res =>  {
                if(res.data=="updated"){
                    alert("crop "+data.crop_name+" succesfully updated")
                    setModalOpen(false)
                }else{
                    alert("please enter valid farmerid and cropname and select category acoordingly")
                }
    
    
        })

    }



   





    return(
        <div className="update">

            
           <div className="crops">
          
        <h2 className="title"> Crops Update</h2>
        {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
        <form>
        <div className="wrap-input">
        <select name="pets" className="input" {...register("category", { required: true })}>
        {/* using array map to map value and return it for option in select tag */}
        {
            category.map(e=>{
                return(
                    <option value={e}>{e}</option>
                )
            })
        }
       
    </select>
    </div>
    {errors.category && <p className="p1">select category</p>}
         <div className="wrap-input">
        <input type="text" className="input"  placeholder="farmer id" {...register('farmer_id', { required:true })}/>
        </div>
         {errors.farmer_id && <p className="p1">enter valid id</p>}

         <div className="wrap-input">
        <input type="text" className="input"  placeholder="Crop name" {...register('crop_name', { required:true })}/>
        </div>
         {errors.crop_name && <p className="p1">enter valid crop name</p>}
        
        <h4 >Enter new details to update</h4>
         <div className="wrap-input">
        <input type="number" className="input"  placeholder="rate" {...register('farmers_rate', { required:true})}/>
        </div>
         {errors.farmers_rate && <p className="p1">enter valid farmer_rate</p>}

         <div className="wrap-input">
        <input type="number" className="input"  placeholder="market rate" {...register('market_rate', { required:true })}/>
        </div>
         {errors.market_rate && <p className="p1">enter valid market_rate</p>}

         <div className="wrap-input">
        <input type="text" className="input"  placeholder="Crop detail" {...register('crop_details', { required:true })}/>
        </div>
         {errors.crop_details && <p className="p1">enter valid crop_details</p>}

         <div className="wrap-input">
        <input type="file" className="input"  placeholder="Crop image" {...register('image', { required:true })}/>
        </div>
         {errors.image && <p className="p1">upload image</p>}


         <button  className="login-form-btn"  onClick={handleSubmit(getcrop)}>Update</button> 


        </form>
    
     </div>
           
           <Farmer />


    
   
        </div>
        
        )
}