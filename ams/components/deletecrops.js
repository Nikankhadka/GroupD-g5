import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';
import axios from "axios"
import Confirm from "./confirmation";



export default function Deletecrops(){
    const [category, setcategory] = useState([]);
    const [crop, setcrop] = useState([]);  
    const {register,handleSubmit,formState: { errors }}=useForm();
    
    //main part
    const [selected,setselected]=useState("")
   const [modalOpen, setModalOpen] = useState(false);
    const[cropid,setcropid]=useState("")


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

//then after selecting the crop to delete and confirming the action below code is executed to delete the crop information 
       function Action(){
           console.log(selected)
           console.log(cropid)
           const del={
            crop_id:cropid
           }
           console.log(del)
            axios.delete(`http://localhost:2900/api/v1/crops/${selected}/${cropid}`).then(
                result =>{
                    if(result.data=="deleted"){
                        alert("Crop of "+cropid+" succesfully deleted")
                        setModalOpen(false)
                    }else{
                        alert("crop failed to delete")
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
                <button  className="login-form-btn view_btn"  onClick={handleSubmit(onclick)}>View Details</button>
                </form>

                <section className="display_info"></section> 
            </div>
            {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
                <div className="cropsview">
                {crop.map(c=>(<button  onClick={()=>{
                    setModalOpen(true)
                    setcropid(c.crop_id)

                }}>
                    <div class="crop">

                <img src={c.image} className="cropimg"/>
                <p className="ptag">{c.crop_name}</p>
               
                <p>Crop_id:{c.crop_id}</p>
                
                
               
                <p>Farmer:{c.name}</p>
                <p>Id:{c.farmer_id}</p>
                
               
             
             
                </div>
                    
                    
                    </button>))}
                </div>
            </div>
    
        )
}