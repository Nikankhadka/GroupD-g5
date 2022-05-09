
import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';
import axios from "axios"


import * as api from "../Api/apicall"
import Mainform from "./uuuuuu";




export default function Updatecrop(){
    

    const {register,handleSubmit,formState: { errors }}=useForm();
  
   
    const [crop_id,setcrop_id]=useState([])
    const [form,setform]=useState({})


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







    
  

  


   const formdata=(data)=>{
         //now getting category selectd from the form then using that to fetch data from the database
        setform(data)
        api.Crops(set,data.category);
        

   }

  const set=(data)=>{
     setcrop_id(data);
     console.log(data);
  }



    return(
        <div>
            
       


        
        <div className="update">

            
        <div className="crops">
          
        <h2 className="title"> Crops Update</h2>
        

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


    <button  type="submit" className="logbtn" onClick={handleSubmit(formdata)}>getcrop</button>


    

    </form>

    {/* passing selected category into component to get crop info */}
     <Mainform  cropsid={crop_id} category={form.category}  />
    
     </div>
           
        
        


    
   
        </div>



        </div>
        )
}