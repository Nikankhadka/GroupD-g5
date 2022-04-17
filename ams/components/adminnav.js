import Link from "next/link"

import Confirm from "./confirmation";
import {useState} from 'react';
import axios from 'axios';


 export default function Adminnav(){

    function Action(){
        //delete the cookies everytime the user logouts
        axios.delete("http://localhost:2900/api/v1/login",{ withCredentials: true }).then(res=>{
            if(res.data=="cleared"){
                window.location.href = '/'
            }
        })
       
    }

    const [modalOpen, setModalOpen] = useState(false);

    

    return(
        <div>
                    <nav className="nav1">
            <div className="home">
            <Link href="/admin"><a><img  class="adimg"src="/user.png"  alt="image load bhayena"/></a></Link>
            <Link href="#"><a><img  src="/setting.png"  alt="image load bhayena"/></a></Link>
              <button  onClick={()=>{
                   setModalOpen(true)
              }}> <img src="/log-out.png"  alt="image load bhayena"/></button>  
            </div>



            <div className="llink">
            
                <Link href="/admin/acrops"><a>Crops</a></Link>
                <Link href="/admin/categorysettings"><a>Category </a></Link>
                <Link href="/admin/cropsetting"><a>Crops Settings</a></Link>
                
            </div>
            

        </nav>
        {modalOpen && <Confirm setOpenModal={setModalOpen} action1={Action} />}
        </div>


    )

}