



import Confirm from "./confirmation";
import {ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage}  from "../pages/base"
import { useForm } from "react-hook-form";
import {useState} from 'react'
import axios from "axios"




export default function Mainform(props){

    const {register,handleSubmit,formState: { errors }}=useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})



    //this function is to get data from form and use to update the data
    function formdata(data){
        setdata1(data)
        console.log(data);
        setModalOpen(true)
    }

    
    //action to be performed after continution 
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
               updatecrop(downloadURL,data1)
             });
           }
         );
    }

    //called to perdor
    function updatecrop(url,data){

        const update={
            crop_id:data.crop_id,
            category: props.category,
            crop_details: data.crop_details,
            crop_name: data.crop_name,
            imagename:data.image[0].name,
           
            farmers_rate:data.farmers_rate,
            image:url,
            market_rate:data.market_rate,
            }

            console.log(update)
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
        <div>


             {/* modal for action on the form */}
        {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
                            
            <form>

            <div className="wrap-input">
                <select name="pets" className="input" {...register("crop_id", { required: true })}>
                {/* using array map to map value and return it for option in select tag */}
                {
                    props.cropsid.map(e=>{
                        return(
                            <option value={e.crop_id}>{e.crop_id}</option>
                        )
                    })
                }
            
            </select>
            </div>
            {errors.category && <p className="p1">select category</p>}

            <div className="wrap-input">
                             <input type="text" className="input"  placeholder="Crop Name" {...register('crop_name', { required:true})}/>
                             </div>
                             {errors.crop_name && <p className="p1">enter valid Crop Name</p>}

            
                             <div className="wrap-input">
                             <input type="text" className="input"  placeholder="Crop details" {...register('crop_details', { required:true})}/>
                             </div>
                             {errors.crop_details && <p className="p1">enter valid Crop details</p>}

                             <div className="wrap-input">
                             <input type="number" className="input"  placeholder="Farmers Rate" {...register('farmers_rate', { required:true})}/>
                             </div>
                             {errors.farmers_rate && <p className="p1">enter valid Farmers Rate</p>}


                             <div className="wrap-input">
                             <input type="number" className="input"  placeholder="Market Rate " {...register('market_rate', { required:true})}/>
                             </div>
                             {errors.market_rate && <p className="p1">enter valid Market Rate</p>}

                             <div className="wrap-input">
                             <input input type="file" id="img" name="img" accept="image/*" {...register('image', { required:true})}/>
                             </div>
                             {errors.image && <p className="p1">please upload the image</p>}
                            
                             <button  className="login-form-btn li_btn" onClick={handleSubmit(formdata)}>Post Crops</button>

            </form>



        </div>
        
        
        )



}