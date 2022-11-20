import React from 'react'
import "./Notfind.css"
function Notfind({data}) {
  return (
    <div className='notfind'>
        {/* <p>لا يوجد طلبات مقدمة حاليا</p> */}
        <p>{data}</p>
        <img src={require('../../images/notfind/search.jpg')}/>
    </div>
  )
}

export default Notfind