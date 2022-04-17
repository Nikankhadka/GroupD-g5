import Adminnav from "../../components/adminnav";
import { useForm } from "react-hook-form";



import Confirm from "../../components/confirmation";

import React, { useMemo, useState, useEffect } from "react";
import axios from "axios"
import * as api from "../../Api/apicall"


export default function Authorize(){




const [check,setcheck]=useState(false)
//function checks for result fromt the authorization calls then only reners the page
    function verify(result){
        
        if(result==true){
            console.log("chalyo hai ya")
           setcheck(true)
        }else{
            alert("please login to come")
             window.location.href="../loginpage"
        }
    }



    //call api function
    useEffect(()=>{
       
        api.Authorize(verify)
    },[]);

    //once everything is verified then only the page will be rendered
    return(
        <div>
            {check && <Category />}
        </div>


    )


   
}






























function Deletecat(){
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

       const delcat=(data)=>{
        setdata1(data)
        setModalOpen(true)

        
}

    async function Action(){
        console.log(data1)
        axios.delete(`http://localhost:2900/api/v1/category/${data1.name1}`)
        .then(res =>  {
            if(res.data=="deleted"){
               console.log("deleted")
               alert("Category "+data1.name+" succesfull deleted")
               setModalOpen(false)
            }


    })
    }


    return(
        <div> 
                    {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
        <form className="cat-form" >
        <h2 className="title">Delete Setting</h2>
        <div className="wrap-input">

    <select name="pets" className="input" {...register("name1", { required: true })}>
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
    <button  className="login-form-btn"  onClick={handleSubmit(delcat)}>Delete</button> 
    </form>
       
     </div>
        

 )
    
}



function Post(){

    const {register,handleSubmit,formState: { errors }}=useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})



    const postcat=(data)=>{
        setdata1(data)
        setModalOpen(true)

       
}

    async function Action(){
        console.log(data1)
        axios.post(`http://localhost:2900/api/v1/category/${data1.name}`)
        .then(res =>  {
            if(res.data=="posted"){
                alert("category "+data1.name+" succesfully posted")
                setModalOpen(false)
            }else{
                alert("category not posted cat already exist")
            }


    })
    }


    return(
        <div>
            {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
        <form className="cat-form" >
        <h2 className="title">Post Setting</h2>

        <div className="wrap-input">
        <input type="text" className="input"  placeholder="Crop Category" {...register('name', { required:true , minLength: 5})}/>
        </div>
         {errors.name && <p className="p1">enter valid category</p>}

         <button  className="login-form-btn"  onClick={handleSubmit(postcat)}>POST</button> 

         </form>
     
        </div>
        
    )
}




function Updatecat(){
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [category, setcategory] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [data1,setdata1]=useState({})

    useEffect(async() => {
        await  axios.get(`http://localhost:2900/api/v1/category`)
        .then(result => {
             setcategory(result.data)  
             console.log(category)
          
        })
       },
       //use this bracket to only run once if some change is detected 
       []);




     const upcat=(data)=>{
        setdata1(data)
        setModalOpen(true)

}

    async function Action(){
        console.log(data1)
        axios.patch(`http://localhost:2900/api/v1/category/${data1.name}`,{name1:data1.name1})
        .then(res =>  {
            if(res.data=="updated"){
                alert("category "+data1.name1+" succesfully updated")
                setModalOpen(false)
            }else{
                alert("update not succesful table doesnot exist")
            }


    })
    }




    return(
        <div>
        {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
        <form className="cat-form" >
        <h2 className="title">Update Setting</h2>
        <div className="wrap-input">
   
    <select name="pets" className="input" {...register("name", { required: true })}>
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
    <div className="wrap-input">
        <input type="text" className="input"  placeholder="Crop Category" {...register('name1', { required:true , minLength: 5})}/>
     </div>
     {errors.name1 && <p className="p1">enter at least 5 letter</p>}
    <button  className="login-form-btn"  onClick={handleSubmit(upcat)}>Update</button> 
   
    </form>
   
    </div>
 )
    
}


 function Category(){

    //state for conditional form rendering 
    const [page, setpage] = useState(<Post />);




    return(
        <div>
            <Adminnav />


            <div className="cat">
            <div className="btn-container">
                        <button  className="login-form-btn"  onClick={()=>{
                           setpage(<Deletecat />)
                        }}>Delete</button> 
                        <button  className="login-form-btn"  onClick={()=>{
                           setpage(<Post />)
                        }}>POST</button> 
                    <button  className="login-form-btn"  onClick={()=>{
                           setpage(<Updatecat />)
                        }}>UPDATE</button> 
                    </div>
            </div>
            {/* state based rendering where button prersses while change the component calle in state and rerender the page */}
            {page}
            
           
           

         
      

            

        </div>
        
        )
}