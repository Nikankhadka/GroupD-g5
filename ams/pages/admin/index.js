
import Adminnav from "../../components/adminnav"
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
            {check && <Comp />}
        </div>


    )


   
}

 function Comp(){
    const [category, setcategory] = useState([]);
    const [farmer, setfarmer] = useState([]);
    var pcount=0;
    var fcount=0;

   


    useEffect(() => {
         axios.get(`http://localhost:2900/api/v1/farmer`)
        .then(result => {
          


             setfarmer(result.data) 
            
             
          
        })
       },
       //use this bracket to only run once if some change is detected 
       []);




       useEffect(async() => {
        await  axios.get(`http://localhost:2900/api/v1/category`)
        .then(result => {
             setcategory(result.data)  
             
          
        })
       },
       //use this bracket to only run once if some change is detected 
       []
       );

       farmer.forEach(e=>{
           pcount=pcount+e.posting
           fcount++
       })
       

const info=[    {
            count:category.length,
            title:"Crops Categories"
        },
        {
            count:pcount,
            title:"Crops Posting"
        },
        {
            count:fcount,
            title:"Farmers Count"
        }

]



    return(
        <div className="adminlowerbody">
            
        <Adminnav />
        <div className="indbody">
            <h1 id="head1"> Daily Records</h1>
            <div className="boxholder">
            {
                info.map(e=>{
                    return(
                        <div className="box">
                            <h2>{e.count}</h2>
                            <p>{e.title}</p>
                        </div>
                        )
                })
            }


            {/* react table to display data  */}

           

            </div>
        
        </div>

         {/* divider tos seperate  */}
         <div className="divider"></div>
        <h1 id="head1"> Farmer Details</h1>
        <div className="table">

        <table >
                <tr className="thead">
                    <th className="head">Farmer Id</th>
                    <th className="head">Name</th>
                    <th className="head">Posting</th>
                    <th className="head">Province</th>
                    <th className="head">ward</th>
                    <th className="head">Family</th>
                </tr>
             {
                 farmer.map(e=>{
                     return(
                     <tr>
                        <td className="head">{e.farmer_id}</td>
                        <td className="head">{e.name}</td>
                        <td className="head">{e.posting}</td>
                        <td className="head">{e.province}</td>
                        <td className="head">{e.ward}</td>
                        <td className="head">{e.family}</td>
                     </tr>
                     )
                 })


             }   
                
               
                </table>
        </div>



        </div>
        




    )
}