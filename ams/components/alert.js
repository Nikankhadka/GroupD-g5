


//modal used for confirmation
export default function Alert(props){






    return(
        <div className="modalback">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                
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
                props.setalert(false);
                
              }}
             
            >
              Okay
            </button>
           
          </div>
        </div>
        </div>
     



        )
}