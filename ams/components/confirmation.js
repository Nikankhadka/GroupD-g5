


//modal used for confirmation
export default function Confirm(props){






    return(
        <div className="modalback">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                props.setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
        
          <div className="footer">
            <button
              onClick={() => {
                props.setOpenModal(false);
                console.log("chalyo")
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button  onClick={()=>{
               props.action1()
            }}>Continue</button>
          </div>
        </div>
        </div>
     



        )
}