import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';
import axios from "axios"
import Confirm from "./confirmation";
import Alert from "./alert";
import { getStorage, ref, deleteObject } from "firebase/storage";

import * as api from "../Api/apicall"

export default function Deletecrops(){
    const [category, setcategory] = useState([]);
    const [crop, setcrop] = useState([]);  
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [alert,setalert]=useState(false)
   
    //main part
    const [selected,setselected]=useState("")
   const [modalOpen, setModalOpen] = useState(false);
    const[cropid,setcropid]=useState("")
    const [imagename,setimagename]=useState("")

    //use to load initial details of crop category
    useEffect(async() => {
        await  axios.get(`http://localhost:2900/api/v1/category`)
        .then(result => {
             setcategory(result.data)  
             console.log(category)
          
        })
       },
       //use this bracket to only run once if some change is detected 
       []
       );

       //when details button is cliced crops of that specific cataegory is loaded
       function onclick(data){
           setselected(data.category);
           console.log(data)

             axios.get(`http://localhost:2900/api/v1/cropinfo/${data.category}`)
                     .then(result => {
                        
                        setcrop(result.data);
                        
                        
                     })

       }

   
    //callback to pass into modal componnet so that it executes only after the continue button is clicked
       function Action(){
        Deletecrop(imagename,selected,cropid)
        setModalOpen(false)
       }

       
       
 // Action to delete crop 
  function Deletecrop(imagename,selected,cropid){
    console.log("action bitra"+imagename)
//delete image from ffirebase cloud storage

//cretae storage ref with getstorage function
const storage=getStorage();
//reference to file that u want to delete
const fileref=ref(storage,`files/${imagename}`)
//delete the file
deleteObject(fileref).then(()=>{
    console.log("deleted")
}).catch((error)=>{
    console.log(error);

})

   const del={
    crop_id:cropid
   }

   console.log(del)
    axios.delete(`http://localhost:2900/api/v1/crops/${selected}/${cropid}`).then(
        result =>{
            if(result.data=="deleted"){
                setalert(true);
            setModalOpen(false);
                
            
                             //callback to set modal to false
                             
            }else{
                alert("crop failed to delete")
                             //callback to set modal to false
                            setModalOpen(false);
            }
        }
    )

}





       
    return(
        <div>
            <div className="main_container">
                
                <form className="del_crop" >
                    <select name="pets" className="input slct_size pet_down" {...register("category", { required: true })} >

                     {/* using array map to map value and return it for option in select tag */}
            {
                category.map(e=>{
                return(
                    <option value={e}>{e}</option>
                )
            })
             }
     </select>
     {errors.category && <p className="p1">enter valid category</p>}
                <button  className="dada dd_btn"  onClick={handleSubmit(onclick)}>View Details</button>
                </form>

                <section className="display_info"></section> 
            </div>
            

            {/* modal to continue the to perform action hai */}
            {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
                <div className="cropsview">



                {crop.map(c=>(<button  onClick={()=>{
                    setModalOpen(true)
                    setcropid(c.crop_id)
                    //setting image name to delete in firebase
                    setimagename(c.imagename);
                    
                }}>
                <div class="crop">
                       {/* alert */}
        {alert && <Alert setalert={setalert} msg={"Crop Deleted Succesfully"} />}

                <img src={c.image} className="cropimg"/>
                <p className="ptag" id="pbold">{c.crop_name}</p>
               
                <p id="idbold">Crop_id: <span class="extra">{c.crop_id}</span></p>
                
                
               
                {/* <p>Farmer:{c.name}</p>
                <p>Id:{c.farmer_id}</p> */}
                
               
             
             
                </div>
                    
                    
                    </button>))}
                </div>
            </div>
    
        )
}