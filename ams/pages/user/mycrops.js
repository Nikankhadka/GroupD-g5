import Usernav from "../../components/usernav";
import React, { useState, useEffect } from 'react';
import axios from "axios"
import Confirm from "../../components/confirmation";
import Alert from "../../components/alert";
import Cropupdate from "../../components/usercropupdate";






export default function Mycrops(){
  
    const [modalOpen, setModalOpen] = useState(false);     
    const [crop, setcrop] = useState([]);   
    const [cropid, setcropid] = useState([]); 
    const [alert,setalert]=useState(false) 
    const [msg,setmsg]=useState("crop deleted succesfully")
    const [updateModal, setupdateModal] = useState(false);     
    //use react use effect hook which is similar to lifecycle components basically works after loading the page

    useEffect(async() => {
        await  axios.get(`http://localhost:2900/api/v1/usercrops`,{withCredentials:true})
        .then(result => {
           setcrop(result.data);
           
           
        })
      },
      //use this bracket to only run once if some change is detected 
      []
      );


   const Action=async()=>{
    

    await axios.delete(`http://localhost:2900/api/v1/userdelete/${cropid}`).then(result=>{
        if(result.data){
            setalert(true)
            setModalOpen(false);

        }
        else{
            setmsg("crop not deleted");
            setalert(true)
        }
    })


   }
       
        

    
    return(

        <div>
            {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
            {alert && <Alert setalert={setalert} msg={msg} />}
            <Usernav/>
            {updateModal && <Cropupdate setupdateModal={setupdateModal} cropid={cropid} />}

            <div className="cropsview">
       

       {/* mapping the card information gotten after  getting information from api and updating the state  */}
       
           {crop.map(c=>(<div className="wrapper">
                                   <div class="left">
                                       <img src={c.image} className="cropimg"/>
                                       <p className="ptag p_bold">{c.crop_name}</p>
                                   </div> 
                                   <div class="right">
   
                                       <div class="finfo">   
                                           <h2>Information</h2>
                                           <div class="info_data">
                                               <div class="data d_m">
                                                   <p><span class="b_letters">Detail</span>:{c.crop_details}</p>
                                               </div>
                                               <div class="data d_m">
                                                   <p><span class="b_letters">Crop_id</span>:{c.crop_id}</p>
                                               </div>
   
                                               <div class="data">
                                                   <p><span class="b_letters">Market-rate</span>:{c.market_rate} Rs/Kg</p>
                                               </div>
                                               <div class="data">
                                                   <p><span class="b_letters">Farmer-rate</span>:{c.farmers_rate} Rs/Kg</p>
                                               </div>
                                               <button  className="login-form-btn li_btn" value={c.crop_id} onClick={()=>{
                                                   setModalOpen(true);
                                                   setcropid(c.crop_id);
                                               }}>delete</button>




                                               <button  className="login-form-btn li_btn" value={c.crop_id} onClick={()=>{
                                                   setupdateModal(true)
                                                   setcropid(c.crop_id);
                                                   console.log(cropid)
                                               }}>update</button>

                                           </div>
   
                                       </div>       
                                   </div>   
                                   </div>))}
           </div>
          
        </div>


    )
}