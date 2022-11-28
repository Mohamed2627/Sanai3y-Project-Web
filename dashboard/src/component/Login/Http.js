/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';

export const CardContext=React.createContext();  
function Http() {
    const [Jobs,setjob]=useState([])
    const [Err,seterr]=useState([])
    useEffect(()=>{
        axios.get("localhost://7000/sanai3y/all").then((res)=>
        {
            setjob(res.data);
        })
    },[]).catch((err)=>{
        seterr(err)
    })
    

 
   
    return (
        
<CardContext.Provider>
        <div className='row'>
             {Jobs.map((item)=>
              <div class="card m-1 " style={{width: '18rem'}}>
        <><img class="card-img-top" src={ item.images[1] } alt="Card image cap" /><div class="card-body">
                     <h5 class="card-title">{item.title}</h5>
                     <h5 class="card-title">{item.price}</h5>
                     <p class="card-text">{item.description}</p>
                     {/* <button href="#" onClick={()=>{Add(item)}} class="btn btn-primary" >Addto Card</button> */}
        </div>
                 </>
                 </div>
                 )}
      
      </div>
      </CardContext.Provider>
      
    );
}

export default Http;