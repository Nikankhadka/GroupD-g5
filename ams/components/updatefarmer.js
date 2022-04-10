
import { useForm } from "react-hook-form";
import {useState,useEffect} from 'react';

import axios from "axios"
import Confirm from "./confirmation";






export default function Farmer(){
    const [farmer, setfarmer] = useState([]);
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})











    useEffect(async() => {
        await  axios.get(`http://localhost:2900/api/v1/farmer`)
        .then(result => {
             setfarmer(result.data)  
             console.log(farmer)
          
        })
       },
       //use this bracket to only run once if some change is detected 
       []);



    function click(data){
        setdata1(data)
        setModalOpen(true)
    }

    function Action(){

        console.log(data1)


        axios.patch(`http://localhost:2900/api/v1/farmer`,{data1})
        .then(res =>  {
            if(res.data=="updated"){
                alert("farmer information succesfully updated")
                setModalOpen(false)
            }else{
                alert("failed to update")
            }


    })
    }








    return(
        
    <div className="farmer"> 
    {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
    <h2 className="title">Update Farmer Details</h2>
                <form>

                <div className="wrap-input">
         <select name="pets" className="input" {...register("farmer_id", { required: true })}>
            {/* using array map to map value and return it for option in select tag */}
            {
            farmer.map(e=>{
                return(
                    <option value={e.farmer_id}>{e.farmer_id}</option>
                )
            })
         }
       
    </select>

    </div>
    {errors.farmer_id && <p className="p1">select farmer_id</p>}

    <div className="wrap-input">
        <input type="text" className="input"  placeholder=" new name" {...register('name', { required:true })}/>
        </div>
         {errors.name && <p className="p1">enter new name</p>}

         <div className="wrap-input">
        <input type="text" className="input"  placeholder="new province" {...register('province', { required:true })}/>
        </div>
         {errors.province && <p className="p1">enter new province</p>}


         <div className="wrap-input">
        <input type="text" className="input"  placeholder="new ward" {...register('ward', { required:true })}/>
        </div>
         {errors.ward && <p className="p1">enter new ward</p>}

         <div className="wrap-input">
        <input type="number" className="input"  placeholder="family" {...register('family', { required:true })}/>
        </div>
         {errors.family && <p className="p1">enter family</p>}

         <button  className="login-form-btn"  onClick={handleSubmit(click)}>Update</button> 

     </form>
           
           
           
           </div>








      
        
        
        
        
        
        
        
        
        
        )
}