
import axios from "axios"
import { getStorage, ref, deleteObject } from "firebase/storage";


//function to call api to get  categories
export async function Category(set){
        await  axios.get(`http://localhost:2900/api/v1/category`)
        .then(result => {
                set(result.data);
                console.log(result.data)
           
        
        })  
}


//api function to get crops info and pass that to callbackfunction to update the state
export async function Crops(set,e){

    await  axios.get(`http://localhost:2900/api/v1/cropinfo/${e}`)
                     .then(result => {
                        set(result.data);
                        
                        
                     })
}


//function to post crop
export async function Postcrop(category,update,modelsetter){
       
        axios.post(`http://localhost:2900/api/v1/crops/${category}`,{update})
            .then(res =>  {
                if(res.data=="posted"){
                    alert("crop "+update.crop_name+" succesfully posted")
                    //passed as callback to setmodel to false
                        modelsetter();
                   
                }else{
                    alert("crop not posted already exist")
                
                    //passed as callback to setmodel to false
                    modelsetter();
                }
    
    
        })
        
}


 // Action to delete crop 
 export function Deletecrop(imagename,selected,cropid,modalsetter){
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
                    alert("Crop of "+cropid+" succesfully deleted")
                
                                 //callback to set modal to false
                                 modalsetter()
                }else{
                    alert("crop failed to delete")
                                 //callback to set modal to false
                                modalsetter()
                }
            }
        )

   }









//function to authorize the cookie info on page loads of admin and user specific only
export async function Authorize(verify){
        await axios.get("http://localhost:2900/api/v1/login",{withCredentials:true}).then(result=>{
                //pass result as parameter in call back function
                        
                        verify(result.data)
        })
}