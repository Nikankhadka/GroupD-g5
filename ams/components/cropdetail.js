import axios from "axios"
import React, { useState, useEffect } from 'react';
//importing api functions from api calls as api
import *  as api from "../Api/apicall";


export default function Cropd(){
    const [category, setcategory] = useState([]);
    const [cat, setcat] = useState("");      
    const [crop, setcrop] = useState([]);   
    
    //use react use effect hook which is similar to lifecycle components basically works after loading the page

    useEffect(async() => {
           api.Category(set);
      },
      //use this bracket to only run once if some change is detected 
      []
      );
    
      //function passed as callback to set category in state
      function set(data){
        setcategory(data) 
        console.log(data) ;
      }


      //function to update state with crop info
      function sCet(data){
          setcrop(data);
          console.log(data)
      }


    return(

        <div>
            <h1 className="head"> Crops category</h1>
        <div className="category">
            
        {
            category.map(e=>(
                <button onClick={async()=>{
                    setcat(e)
                    //function to get crop info pass scet callback and e cropname
                    api.Crops(sCet,e);      
                    
                }}> {e} </button>
            ))
        }
        </div>
        {/* divider tos seperate  */}
        <div className="divider"></div>
        <h2 className="hfruit">{cat}</h2>
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
                                        </div>

                                    </div>

                                    <div class="f_details">   
                                        <h2>Farmer Details:</h2>
                                        <div class="f_data">
                                            <div class="data">
                                                <p><span class="b_letters l">Farmer</span>:{c.name}</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters l">Id</span>:{c.farmer_id}</p>
                                            </div>
                                            <div class="data l_m">
                                                <p><span class="b_letters ">Total-posting</span>:{c.posting}</p>
                                            </div>
                                            <div class="data l_m">
                                                <p><span class="b_letters ">Province</span>:{c.province}</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters">Ward</span>:{c.ward}</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters">Family</span>:{c.family}</p>
                                            </div>
                                            

                                        </div>

                                    </div>


                                        
                                        
                                        
                                        
                                       
                                        
                                       
                                        
                                        
                                </div>   
                                </div>))}
        </div>
       
        </div>

    )
}