import React from "react";
import AddNewAdmin from  '../component/Setting/AddNewAdmin'

import LastJob from "../Pages/LastJob";
import LastSanai3y from "../Pages/LastSanai3y";
import LastClient from "../Pages/LastClient";
import TopRate from '../component/TopRate/TopRate';
import Notifection from "../component/Notfication/Notifection";

import './progress.css'
import Charts from "./Charts";
function MainScreen() {

  return (
    <>

    <div className="w-100">
        <Charts />
        <TopRate/>
   
        {/* <Charts /> */}
        {/* <Charts /> */}
       
      </div>
      {/* tables and notifecation */}
    <div style={{ "overflow-x": "auto","width":"100%" }}>
      <div >
        <LastClient />
        <LastSanai3y />
        <LastJob />
     {/* <AddNewAdmin/> */}
      </div>
    

    </div>
    
    </>
  );
}

export default MainScreen;
