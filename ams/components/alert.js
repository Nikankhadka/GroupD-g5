


//modal used for confirmation
export default function Alert(props){






    return(
        <div className="modalback">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                props.setalert(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>{props.msg}</h1>
          </div>
        
          <div className="footer">
            <button
              onClick={() => {
                window.location.href="/loginpage"
                
              }}
             
            >
              Continue to Login
            </button>
           
          </div>
        </div>
        </div>
     



        )
}