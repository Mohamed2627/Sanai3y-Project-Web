import { useEffect, useState } from 'react'
import About from '../component/Landing/AboutUs/About'
import Contuctus from '../component/Landing/ContuctUs/Contuctus'
import Header from '../component/Landing/Header/Header'
import Payment from '../component/Landing/Payment/Payment'
import Services from '../component/Landing/services/Services'
import Whyus from '../component/Landing/WhyUs/Whyus'
import Loader from '../component/Loader/Loader'

function Landing(){
    let [loader , setLoader] = useState(true)
    useEffect(() => {
        window.scrollTo(0,0)
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    
      return () => {
        setLoader(true)
      }
    }, [])
    
    return(
        <>
        {!loader &&<div>

            <Header/>
            <Services/>
            <Whyus/>
            <Payment/>
            <About/>
            <Contuctus/>
        </div>}

            {loader && <Loader/>}
        </>
    )
}

export default Landing