import React, { Fragment } from 'react'
import Sidbar from '../sidbar/Sidbar'
import AddNewAdmin from './AddNewAdmin'
import './Setting.css'
function Setting() {
  
  return (
    
    <Fragment>   
   
    <div className="appMain">
       <div className="appMAinNext">
       <Sidbar />
      <div style={{flexDirection:'column',overflow:'auto '}}>
      <AddNewAdmin/>
      
      </div>
       
     </div>
     </div>
   
     
   </Fragment>
  )
}

export default Setting