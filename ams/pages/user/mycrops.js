import Usernav from "../../components/usernav";
import React, { useState, useEffect } from 'react';
import axios from "axios"
import Confirm from "../../components/confirmation";
import Alert from "../../components/alert";
import Cropupdate from "../../components/usercropupdate";
import * as api from "../../Api/apicall"
import { getStorage, ref, deleteObject } from "firebase/storage";

//authorize componnet fro allpages of admin and user so they cant route into other pages without logging in 


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
                {check && <Mycrops />}
            </div>
    
    
        )
    
    
       
    }
    
    
    


 function Mycrops(){
  
    const [modalOpen, setModalOpen] = useState(false);     
    const [crop, setcrop] = useState([]);   
    const [cropid, setcropid] = useState([]); 
    const [alert,setalert]=useState(false) 
    const [msg,setmsg]=useState("crop deleted succesfully")
    const [updateModal, setupdateModal] = useState(false);    
    const [imagename,setimagename]=useState("") 
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

    await axios.delete(`http://localhost:2900/api/v1/userdelete/${cropid}`).then(result=>{
        if(result.data){
            setalert(true)
            console.log("crop deleted")
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
                                       <div class="box-text">
                                       <p className="ptag p_bold">{c.crop_name}</p>
                                       <button  className="lbtn" value={c.crop_id} onClick={()=>{
                                                   setModalOpen(true);
                                                   setcropid(c.crop_id);
                                                   setimagename(c.imagename);
                                               }}>delete</button>




                                               <button  className="elbtn" value={c.crop_id} onClick={()=>{
                                                   setupdateModal(true)
                                                   setcropid(c.crop_id);
                                                   console.log(cropid)
                                               }}>update</button>
                                       </div>
                                       
                                   </div> 
                                   
   
                                             
                                     
                                   </div>))}
           </div>
          
        </div>


    )
}