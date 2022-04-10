import Adminnav from "../../components/adminnav";
import { useForm } from "react-hook-form";
import {useState} from 'react';
import Link from "next/link";
import Postcrop from "../../components/postcrop";
import Deletecrops from "../../components/deletecrops";
import Updatecrop from "../../components/updatecrop";



export default function Category(){

    //state for conditional form rendering 
    const [post, setpost] = useState(true);
    const [update, setupdate] = useState(false);
    const [del, setdel] = useState(false);



    return(
        <div>
            <Adminnav />


            <div className="btn-container">
                        <button  className="login-form-btn"  onClick={()=>{
                            setdel(true)
                            setpost(false)
                            setupdate(false)
                        }}>Delete</button> 
                        <button  className="login-form-btn"  onClick={()=>{
                            setdel(false)
                            setpost(true)
                            setupdate(false)
                        }}>POST</button> 
                    <button  className="login-form-btn"  onClick={()=>{
                            setdel(false)
                            setpost(false)
                            setupdate(true)
                        }}>UPDATE</button> 
                    </div>
            {post? <Postcrop />:console.log("post not rendered")}
            {update? <Updatecrop />:console.log("update not rendered")}
            {del? <Deletecrops />:console.log("delete not rendered")}
            


            

        </div>
        
        )
}