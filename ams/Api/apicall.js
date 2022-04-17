
import axios from "axios"



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


//function to authorize the cookie info
export async function Authorize(verify){
        await axios.get("http://localhost:2900/api/v1/login",{withCredentials:true}).then(result=>{
                //pass result as parameter in call back function
                        
                        verify(result.data)
        })
}