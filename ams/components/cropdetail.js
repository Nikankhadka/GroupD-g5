import axios from "axios"
import React, { useState, useEffect } from 'react';



export default function Cropd(){
    const [category, setcategory] = useState([]);
    const [cat, setcat] = useState("kkkkk");      
    const [crop, setcrop] = useState([]);   
    
    //use react use effect hook which is similar to lifecycle components basically works after loading the page

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
    

    //initially load the crop details with default value passed on page load 
      useEffect(async()=>{
        
        
        await  axios.get(`http://localhost:2900/api/v1/cropinfo/${cat}`)
         .then(result => {
            console.log(result.data)
            setcrop(result.data);
            
            
         })},[]);





    return(

        <div>
            <h1 className="head"> Crops category</h1>
        <div className="category">
            
        {
            category.map(e=>(
                <button onClick={async()=>{
                    setcat(e)
                    console.log(e)
                    await  axios.get(`http://localhost:2900/api/v1/cropinfo/${e}`)
                     .then(result => {
                        console.log(result.data)
                        setcrop(result.data);
                        
                        
                     })
                }}> {e} </button>
            ))
        }
        </div>
        {/* divider tos seperate  */}
        <div className="divider"></div>
        <p className="ptag">{cat}</p>
        <div className="cropsview">
       

    {/* mapping the card information gotten after  getting information from api and updating the state  */}

        {crop.map(c=>(<div className="crop">

                                    <img src={c.image} className="cropimg"/>
                                    <p className="ptag">{c.crop_name}</p>
                                    <p>Detail:{c.crop_details}</p>
                                    <p>Crop_id:{c.crop_id}</p>
                                    <p>Market-rate:{c.market_rate} Rs/Kg</p>
                                    <p>Farmer-rate:{c.farmers_rate} Rs/Kg</p>
                                    <h2>Farmer Details:</h2>
                                    <p>Farmer:{c.name}</p>
                                    <p>Id:{c.farmer_id}</p>
                                    <p>Total-posting:{c.posting}</p>
                                    <p>Province:{c.province}</p>
                                    <p>Ward:{c.ward}</p>
                                    <p>Family:{c.family}</p>
                                </div>))}
        </div>
       
        </div>

    )
}