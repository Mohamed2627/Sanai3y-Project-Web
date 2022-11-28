/* eslint-disable react/jsx-no-undef */
import '../App'
import { Fragment } from "react";
import Sidbar from "../component/sidbar/Sidbar";
import Notifection from "../component/Notfication/Notifection";
import Card from "../component/Cardes/Card";
import TAbleSanai3y from "../component/Table/TAbleSanai3y";
import TAbleClient  from '../component/Table/TAbleClient/TAbleClient';
import TableJob from '../component/Table/Jobs/TableJob';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Setting from '../component/Setting/Setting';

function Dashboard() {
  return (
    <Fragment>   
   
     <div className="appMain">
        <div className="appMAinNext">
        <Sidbar />
       <div style={{flexDirection:'column',overflow:'auto '}}>
        <Card />  
       
       </div>
        
      </div>
      </div>
    
      
    </Fragment>
  );
}
export default Dashboard;
