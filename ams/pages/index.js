import Navbar from "../components/navbar"
import Link from "Next/link"
import Footer from "../components/footer"
import axios from "axios"

import React, { useMemo, useState, useEffect } from "react";
import * as api from "../Api/apicall"





export default function Authorize(){




  const [check,setcheck]=useState(false)
  //function checks for result fromt the authorization calls then only reners the page
      function verify(result){
          
          if(result==true){
              window.location.href="./admin"
             
          }else{
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
              {check && <Home />}
          </div>
  
  
      )
  
  
     
  }
  


















//cant export more than one component in next since every new page acts as a route 

// box component for each boxes in the home or index page
function Box_component(props){
const check=props.im
const tagg=<img src={props.imm} alt="" />
    return(
      <section className={props.c1}>
        {/* used conditional rendering to retrurn img tag when true is passed as props */}
        {check? tagg:console.log("false")}
      <div className={props.c2}>

        <h2 className={props.c3}>{props.t1}</h2>
        <p className={props.c4}>
         {props.t2}
          <br></br>
        </p>
      </div>
    </section>
  )
}


 function Home(){
 



  
    return(
     
        //this div contans the entire home page
        <div>
          {/* this is navbar component exported from nav bar */}
          <Navbar />


          {/* main contianer represents the body of home page */}
          <div className="maincontainer">

          {/* calling box compnent and passing the appropiate pros as required */}
           <Box_component c1="box box-a bg-first text-center py-md" c2="box-inner" c3="text-xl" c4="text-md" t1="Farm With Us"
            t2=" Farming looks mighty easy when your plow is a pencil, and you’re a thousand miles from the corn field." />
           
           <Box_component c1="box box-b bg-second grid-col-2" c2="box-text" im={false} imm="img/box-d.png" c3="text-xl" c4="text-md" t1="By the people For the people"
            t2="Our team are highly skilled and experienced having experience in every sector making sure there is nothing to be compromised." />

          <Box_component c1="box box-c bg-third grid-col-2 " c2="box-text" im={true} imm="img/box-d.png" c3="text-xl" c4="text-md" t1="Patience is bitter, but its fruit is sweet."
            t2="Products made here go through various stages of processing making sure that you get the best of everything." />

          <Box_component c1="box box-d bg-fourth grid-col-2" c2="box-text" im={false} imm="img/box-d.png" c3="text-xl" c4="text-md" t1="Ahead of competition"
            t2="With the help of our dedicated team and everying behind the office, we have been able to server the best for 5 years and running!" />

          <Box_component c1="box box-e bg-fifth grid-col-2 " c2="box-text" im={true} imm="img/box-d.png" c3="text-md" c4="text-sm" t1="Always full of suprises"
            t2="We aim to be different. Therefore every week we like to suprise our customers with something new." />


            {/* <!-- Box F --> */}
            <section className="box box-f grid-col-2">
              <div>
              
                <div className="bg-extra py-lg">
                  <div className="box-text">
                    <h2 className="text-md">Let the holiday cheer come to you</h2>
                    <p className="text-sm">
                      Make the moment merry. Order from us on Daraz.
                    </p>

                  </div>
                </div>
              </div>

              <div>
               
                <div className="last-box py-lg">
                  <div className="box-text">
                    <h2 className="text-md">Love The Crops</h2>
                    <p className="text-sm">

                    </p>

                  </div>
                </div>
              </div>
            </section>
          </div>


          {/* divider to seperate the main body and footer section */}
          <div className="divider"></div>

          {/* importing footer component   */}
          <Footer />



        </div>
    )
}