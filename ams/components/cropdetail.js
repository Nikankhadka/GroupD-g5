import axios from "axios"
import React, { useState, useEffect } from 'react';
//importing api functions from api calls as api
import *  as api from "../Api/apicall";
















export default function Cropd(){
    const [category, setcategory] = useState([]);
    const [cat, setcat] = useState("");      
    const [crop, setcrop] = useState([]);   
    const [cropbtn,setcropbtn]=useState(false);
    const [data,setdata]=useState({});
    const [detail,setdetail]=useState(false)

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
                    setdetail(false) 
                    setcropbtn(true)    
                    
                }}> {e} </button>
            ))
        }
        </div>
        {/* divider tos seperate  */}
        <div className="divider"></div>
       
        


        {/* conditionally rendering the crop detail */}
        {detail? <Crop  detail={data} />:console.log("crop detailed infor not rendered")}
        
        {/* conditional rendering  */}
        {cropbtn?   
        
        <div>
         <h2 className="hfruit">{cat}</h2>
        <div className="cropsview">
       
        
       {/* mapping the card information gotten after  getting information from api and updating the state  */}
   
           {crop.map(c=>(<button

            onClick={()=>{

               
                setcropbtn(false);

                 //setting obj data
                setdata({
                image:c.image,
                crop_name:c.crop_name,
                crop_details:c.crop_details,
                crop_id:c.crop_id,
                market_rate:c.market_rate,
                farmers_rate:c.farmers_rate,
                farmername:c.name,
                farmer_id:c.farmer_id,
                posting:c.posting,
                province:c.province,
                ward:c.ward,
                family:c.family
                }
                )
                setdetail(true);



            }
            }
           
           >
   
                           <div className="cropbtn"> 
                           <img src={c.image} className="cropimgbtn"/>
                           <p className="ptag p_bold">{c.crop_name}</p>
                           <h3>Detail:{c.crop_details}</h3>
                           </div>                     
                       </button>))}
           </div></div>
           
           
           :console.log("renderbhayena")}
       
        </div>

    )
}




//main crop detail display
function Crop(props){




    return(
        <div>
            <div className="wrapper">
                                <div class="left">
                                    <img src={props.detail.image} className="cropimg"/>
                                    <p className="ptag p_bold">{props.detail.crop_name}</p>
                                </div> 
                                <div class="right">

                                    <div class="finfo">   
                                        <h2>Information</h2>
                                        <div class="info_data">
                                            <div class="data d_m">
                                                <p><span class="b_letters">Detail</span>:{props.detail.crop_details}</p>
                                            </div>
                                            <div class="data d_m">
                                                <p><span class="b_letters">Crop_id</span>:{props.detail.crop_id}</p>
                                            </div>

                                            <div class="data">
                                                <p><span class="b_letters">Market-rate</span>:{props.detail.market_rate} Rs/Kg</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters">Farmer-rate</span>:{props.detail.farmers_rate} Rs/Kg</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="f_details">   
                                        <h2>Farmer Details:</h2>
                                        <div class="f_data">
                                            <div class="data">
                                                <p><span class="b_letters l">Farmer</span>:{props.detail.farmername}</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters l">Id</span>:{props.detail.farmer_id}</p>
                                            </div>
                                            <div class="data l_m">
                                                <p><span class="b_letters ">Total-posting</span>:{props.detail.posting}</p>
                                            </div>
                                            <div class="data l_m">
                                                <p><span class="b_letters ">Province</span>:{props.detail.province}</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters">Ward</span>:{props.detail.ward}</p>
                                            </div>
                                            <div class="data">
                                                <p><span class="b_letters">Family</span>:{props.detail.family}</p>
                                            </div>
                                            

                                        </div>

                                    </div>


                                        
                                        
                                        
                                        
                                       
                                        
                                       
                                        
                                        
                                </div>   
                                </div>



        </div>
        
        
        
        
        )
}