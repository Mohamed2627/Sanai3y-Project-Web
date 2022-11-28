import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFirstOrderAlt} from "react-icons/fa";
import './Card.css'
import '../../Pages/Var.css'
import Setting from '../Setting/AddNewAdmin' 
import DropDwoin from '../../component/Cardes/DropDwonList'
import Topbar from './../topbar/Topbar';
import TAbleSanai3y from "../Table/TAbleSanai3y";
import TAbleClient  from '../Table/TAbleClient/TAbleClient';
import TableJob from '../Table/Jobs/TableJob';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import MainScreen from '../../Pages/MainScreen';
import { FaUserAlt,FaEye, FaCircle } from 'react-icons/fa';
import Notifection from '../Notfication/Notifection';
import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
function Card() {
  // start count data
  const dataUrl = "http://localhost:7000";
  const [dataJob, setDataJob] = useState([]);
  const [dataClient, setDataClient] = useState([]);
  const [dataSanai3y, setDataSanai3y] = useState([]);
  // console.log(dataJob);
  // end count data
  // length of data 
  const jobs = dataJob.length
const sanai3ies = dataSanai3y.length
const clients = dataClient.length

  // start chart
  // 1-Sanai3y
  
  const freetrial = []

const subscriber = [] 
  for (const i of dataSanai3y) {
    if (i.subcribe==false) {
      freetrial.push(i.level)
      
    } if(i.subcribe==true) {
      subscriber.push(i.level)
      
    }
      
    // console.log("object");
  }
  // 2-Jobs
  const compelete = []
const pendingJob = []
const inProgress = []
  for (const i of dataJob) {
    if (i.status=='compelete') {
      compelete.push(i.status)
      
    }if (i.status=='pending') {
      pendingJob.push(i.status)
      
    } if(i.status=='in progress') {
      inProgress.push(i.status)
      
    }
    // console.log("object");
  }
  // 3-Client
  const aswan = []
  const aswanNew = []
  const abusimbel = []
  const drao = []
  const komombo = []
  const nasrNuba = []
  const klabsha = []
  const edfou = []
  for (const i of dataClient) {
    if (i.address=='أسوان') {
      aswan.push(i.address)
      
    }if (i.address=="أسوان الجديدة") {
      aswanNew.push(i.address)
      
    } if(i.address=="أبو سمبل") {
      abusimbel.push(i.address)
      
    } if(i.address=="دراو") {
      drao.push(i.address)
      
    } if(i.address=="كوم امبو") {
      komombo.push(i.address)
      
    } if(i.address=="نصر النوبة") {
      nasrNuba.push(i.address)
      
    } if(i.address=="كلابشة") {
      klabsha.push(i.address)
      
    } if(i.address=="أدفو") {
      edfou.push(i.address)
      
    }
      
    // console.log("object");
  }
  useEffect(()=>{
    setClientlevel(
      {
        labels:["أسوان","أسوان الجديدة","أبو سمبل","دراو","كوم امبو","نصر النوبة",
        "كلابشة","أدفو"],
        datasets: [{
          // label: 'My First Dataset',
          data: [aswan.length,aswanNew.length,abusimbel.length,
            drao.length,komombo.length,nasrNuba.length,klabsha.length,edfou.length],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#E605FF',
            '#FF6905',
            '#1EFF05',
            '#051EFF',
            '#60A857'
          ],
          hoverOffset: 1
        }]
      }
    )
    setJoblevel(
      {
        labels:["complete","pending","in progress"],
        datasets: [{
          // label: 'My First Dataset',
          data: [compelete.length,pendingJob.length,inProgress.length],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 1
        }]
      }
    )
    setSanai3ylevel(
      {
        labels:["freetrial","subscriber"],
        datasets: [{
          label: 'My First Dataset',
          data: [freetrial.length,subscriber.length],
          backgroundColor: [
            'rgb(255, 99, 132)',
            
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 1
        }]
      }
    )
  },[dataClient,dataJob,dataSanai3y])
  // console.log(subscriber.length);
  const datas =  {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      data: [300, 200, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
    }]
  }
  const [sanai3ylevel,setSanai3ylevel]=useState(datas)
  const [joblevel,setJoblevel]=useState(datas)
  const [clientlevel,setClientlevel]=useState(datas)
   ChartJs.register(
    Tooltip, Title, ArcElement, Legend
  );
  // end chart
  useEffect(() => {
    axios.get(`${dataUrl}/Jobs/all`).then((response) => {
      // console.log(response.data.data);
      setDataJob(response.data.data);
     
    });
    axios.get(`${dataUrl}/client/all`).then((response) => {
      // console.log(response.data.Data);
      setDataClient(response.data.Data);
    });
    axios.get(`${dataUrl}/sanai3y/all`).then((response) => {
      // console.log(response.data.Data);
      setDataSanai3y(response.data.Data);
    
 
      // console.log(freetrial);
      // console.log(pending);
      // console.log(subscriber);
    
    });
  }, []);
  const[showsanai3y,setShowsanai3y]=useState(false)
  const[showjob,setShowjob]=useState(false)
  const[showclient,setShowclient]=useState(false)
  // console.log(clients);
      return (
        <>

        <div className="card">
          <div className="card1 show1 "onClick={()=>{showjob?setShowjob(false):setShowjob(true)}}>
            <div>
              <div className="iconBox">
                <FaEye/>
              </div>
            <section>
                <h2 className="unmber"><CountUp end={dataJob.length} useEasing="true" duration={2}  /></h2>
                <h2 className="namecard">Jobs</h2>
            </section>
            </div>
          </div>
          <div className="card1 show2" onClick={()=>{showsanai3y?setShowsanai3y(false):setShowsanai3y(true)}} style={{background: "linear-gradient(-90deg,#90caf9,#047edf 99%)"}}>
            <div> 
              <div className="iconBox">
              <FaUserAlt/>
              </div>
            <section >
                <h2 className="unmber"><CountUp end={dataSanai3y.length} useEasing="true" duration={1}  /></h2>
                <h2 className="namecard">Sanai3y</h2>
            </section>
            </div>
          </div>
          <div className="card1 show3 " onClick={()=>{showclient?setShowclient(false):setShowclient(true)}} style={{background: "linear-gradient(-90deg,#ffbf96,#fe7096)"}}>
            <div>
              <div className="iconBox">
              <FaUserAlt/>
              </div>
          <section>
                <h2 className="unmber"><CountUp end={dataClient.length} useEasing="true" duration={1}  /></h2>
                <h2 className="namecard">Client</h2>
          </section>
            </div>
          </div>
         
        
       {showjob? <div style={{width:"30%"}}  className="Jobs shadow rounded-3 bg-light">
            <h2>Jobs</h2>
          <Doughnut data={joblevel}/>
          <div className="percent mt-5">

            <div className="statistic1">
              <p><FaCircle style={{color:"rgb(255, 205, 86)"}}/> in progress</p>
              <p>{Math.round(inProgress.length*100/jobs)}%</p>
            </div>
            <div className="statistic2">
              <p><FaCircle style={{color:"rgb(54, 162, 235)"}}/> pending</p>
              <p>{Math.round(pendingJob.length*100/jobs)}%</p>
            </div>
            <div className="statistic3">
              <p><FaCircle style={{color:"rgb(255, 99, 132)"}}/> complete</p>
              <p>{Math.round(compelete.length*100/jobs)}%</p>
            </div>
          </div>
        </div>:null}
       {showsanai3y? <div style={{width:"30%"}} className="Sanai3y shadow rounded-3 bg-light">
            <h2>Sanai3y</h2>
          <Doughnut data={sanai3ylevel}/>
          <div className="percent mt-5">

            <div className="statistic1 subscriber">
              <p><FaCircle style={{color:"rgb(255, 205, 86)"}}/> subscriber</p>
              <p>{Math.round(subscriber.length*100/sanai3ies)}%</p>
            </div>
         
            <div className="statistic3 freetrail">
              <p><FaCircle style={{color:"rgb(255, 99, 132)"}}/> freetrail</p>
              <p>{Math.round(freetrial.length*100/sanai3ies)}%</p>
            </div>
          </div>
        </div>:null}
       {showclient? <div style={{width:"30%"}} className="Clients shadow rounded-3 bg-light">
            <h2>Client</h2>
          <Doughnut data={clientlevel}/>
          <div className="percent">

            <div className="statistic1">
             <span className="d-flex ">
               <p className="me-2"><FaCircle style={{color:"rgb(255, 99, 132)"}}/> اسوان</p>
               <p className="me-2">{Math.round(aswan.length*100/clients)}%</p>
             </span>
             <span className="d-flex ">
               <p className="me-2"><FaCircle style={{color:"rgb(54, 162, 235)"}}/> اسوان الجديدة</p>
               <p className="me-2">{Math.round(aswanNew.length*100/clients)}%</p>
             </span>
            </div>
            <div className="statistic2">
             <span className="d-flex ">
               <p className="me-2"><FaCircle style={{color:"rgb(255, 205, 86)"}}/> ابو سمبل</p>
               <p className="me-2">{Math.round(abusimbel.length*100/clients)}%</p>
             </span>
             <span className="d-flex ">
               <p className="me-2"><FaCircle style={{color:"#E605FF"}}/> دراو</p>
               <p className="me-2">{Math.round(drao.length*100/clients)}%</p>
             </span>
            </div>
            <div className="statistic3">
            <span className="d-flex ">
                <p className="me-2"><FaCircle style={{color:"#FF6905"}}/> كوم امبو</p>
                <p className="me-2">{Math.round(komombo.length*100/clients)}%</p>
            </span>
            <span className="d-flex ">
               <p className="me-2"><FaCircle style={{color:"#1EFF05"}}/> نصر النوبة</p>
               <p className="me-2">{Math.round(nasrNuba.length*100/clients)}%</p>
             </span>
            </div>
            <div className="statistic3">
            <span className="d-flex ">
                <p className="me-2"><FaCircle style={{color:"#051EFF"}}/> كلابشة</p>
                <p className="me-2">{Math.round(klabsha.length*100/clients)}%</p>
            </span>
            <span className="d-flex ">
               <p className="me-2"><FaCircle style={{color:"#60A857"}}/> ادفو</p>
               <p className="me-2">{Math.round(edfou.length*100/clients)}%</p>
             </span>
            </div>
          </div>
        </div>:null}
      
        
          <Routes>
    <Route path="/"  element={<MainScreen  />} />
    <Route path="/Sanai3y" element={ < TAbleSanai3y  /> }/>
    <Route path="/Client" element={<TAbleClient />} /> 
    <Route path="/Job" element={<TableJob/>} />
    

    </Routes>
         
        </div>
        </>
      );
    }
export default Card;
