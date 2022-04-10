import Link from "next/link"


 export default function Adminnav(){
    return(
        <nav className="nav1">
            <div className="home">
            <Link href="/admin"><a><img  class="adimg"src="/user.png"  alt="image load bhayena"/></a></Link>
            <Link href="#"><a><img  src="/setting.png"  alt="image load bhayena"/></a></Link>
            <Link href="/"><a><img src="/log-out.png"  alt="image load bhayena"/></a></Link>
            </div>



            <div className="llink">
                <Link href="/admin/acrops"><a>Crops</a></Link>
                <Link href="/admin/categorysettings"><a>Category </a></Link>
                <Link href="/admin/cropsetting"><a>Crops Settings</a></Link>
                
            </div>
            

        </nav>


    )

}