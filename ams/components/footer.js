
//created component for footer link with props which will contain image src link src and alternate if image is not loaded
function Links(props){
    return(
      <a href={props.hr}>
      <img src={props.src} alt={props.altr} />
    </a>
    )
}

export default function Footer(){


  // basic footer to  link various media outlets for people to contact and know us
    return(
        <footer className="footer">
        <div className="footer-container">
          <div className="social">
            {/* calling link component and passing the required props */}
            <Links hr="#" src="./1111.png" altr="alt please" />
            <Links hr="#" src="./facebook.png" altr="alt please" />
            <Links hr="#" src="./pinterest.png" altr="alt please" />
            <Links hr="#" src="./instagram.png" altr="alt please" />
            <Links hr="#" src="./youtube.png" altr="alt please" />
            <Links hr="#" src="./twitter.png" altr="alt please" /> 
          </div>
          <p>© 2021 Agricultre Management System. All rights reserved.</p>
        </div>
      </footer>
    )
}