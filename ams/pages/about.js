import Navbar from "../components/navbar"

import Footer from "../components/footer"

export default function About(){
    return(
        <div>
            {/* importing the nav bar  */}
            <Navbar />

            <div className="About-body"> 
               <div className="headding">
                <h1>Agriculutre Management System</h1>
               </div>
               <div className="tete">
                   <img  src='/leaf22.png' id="ii"></img>
                   <div className="content">
                       <h1>
                           About us
                       </h1>
                       <p>
                       In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                       </p>
                   </div>
               </div>
            </div>
            {/* divider to seperte the body fromt the footer */}
            <div className="divider"></div>
            {/* importing the footer section */}
            <Footer />

        </div>
    )
}