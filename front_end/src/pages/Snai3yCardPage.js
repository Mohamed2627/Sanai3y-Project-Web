import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from "../component/Loader/Loader";
import ClintCard from '../component/Snai3yData/ClinetCard/ClintCard'
import Snai3ySidepar from '../component/Snai3yData/Snai3ySidepar/Snai3ySidepar'

function Snai3yCardPage() {
  const [data, setData] = useState([])
  const [newdata, setNewdata] = useState([])
  const [flagfilter, setFlagfilter] = useState(false)
  const [loader , setLoader] = useState(true)
  useEffect(() => {
    window.scrollTo(0,0)
    axios.get("http://localhost:7000/sanai3y/all").then(
      (res) => {
        // console.log(res)
        if(res.status == 200){

          setTimeout(()=>{
            setLoader(false)
            setNewdata([...res.data.Data])
            setData([...res.data.Data])
          },1000)
        }
      })
      return ()=>{
        setLoader(true)
      }
  }, [])

  function fliterSkills(type) {
    let arr = newdata.filter((item) => item.skills == type);
    setData([...arr])
    setFlagfilter(true)
  }

  function fliterAddressSnai3y(add) {
    console.log(add)

    if (flagfilter) {
      let arr = newdata.filter((item) => item.address == add);
      setData([...arr])
    }
    else {
      let arr = newdata.filter((item) => item.address == add);
      setData([...arr])
    }
  }
  return (

    <>
   { !loader && <div className='container marginTop'>
      <div className='title-services mb-3'>

        <h2>الحرفيين</h2>
      </div>
      <div className='row' style={{ position: "relative" }}>
        {/* Sidepar */}
        <div className='col-3 ' >
          <Snai3ySidepar filter1={fliterSkills} filter2={fliterAddressSnai3y}
            style={{ position: "fixed", right: "0" }}
          />
        </div>

        {/* Snai3y Card */}
        <div className='col-9' style={{ backgroundColor: "#eee", padding: "20px" }} >

          {data.map((item, index) =>
            <ClintCard datas={item} key={index} />
          )}
        </div>

      </div>
    </div>}
    {loader &&<Loader/>}
    </>
    

  )
}

export default Snai3yCardPage