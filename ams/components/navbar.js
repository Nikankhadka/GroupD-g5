import Link from 'next/link'



export default function Navbar(){

  const  option1 = [
   
    {
      name: "Crops",
      path: "/crops",
    },
    {
      name: "About",
      path: "/about",
    },
   
  ];

  const  option2 = [
   
    {
      name: "Log in",
      path: "/loginpage",
    },
    {
      name: "Join now",
      path: "/services",
    },
   
  ];

  return(
    <nav className="navbar">
      <div className="navbar-container">

      {/* company logo which also acts as an home page link */}
        <div className="navbar-brand"> 
          <Link href="/"><a >
            <img src="/leaf.png" alt="AMS" />
          </a>
          </Link>
          
        </div>

        <ul className="navbar-nav-left">
        
        {/* using map method to map different objcets inside array to specific link and also proding path to them */}
            {option1.map((link) => {
            return (
                
                <Link href={link.path}>
                <a >{link.name}</a>
              </Link>
             
          );
        })}
        </ul>
        

        <ul class="navbar-nav-right">
        
            
              <img src="/grass.png" alt="just grass" />
              
            
          

        {option2.map((link) => {
            return (
                
                <Link href={link.path}>
                <a >{link.name}</a>
              </Link>
             
          );
        })}
      </ul>  
        

        {/* hamburger type menu to show when screen is minimized */}
        <button type="button" class="hamburger" id="menu-btn">
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
    </nav>
  )
}