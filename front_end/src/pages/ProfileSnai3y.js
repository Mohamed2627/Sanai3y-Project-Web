import { Outlet } from 'react-router-dom';
import OneSlider from '../component/ProfileSnai3y/SideparProfile/One-slide'
import TwoSlider from '../component/ProfileSnai3y/SideparProfile/Two-slide'
import OneSection from '../component/ProfileSnai3y/DetailsUser/One-section'
import { useEffect, useState } from 'react';
import Loader from '../component/Loader/Loader';


function ProfileSnai3y() {
    let [loader , setLoader] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setLoader(false)
        }, 1000);
        window.scrollTo(0,0)
        
        return () =>{
            setLoader(true)
        }


    },[])

    return (

        <>
            {!loader &&<div className="profil">
                <div className="container">


                    <div className="row my-5">

                        {/* slider */}
                        {/* <div className="col-3 mt-5">
                            <OneSlider /> 
                        </div> */}

                        {/* body */}
                        <div className="col-12 mt-5"> 
                            <OneSection/>

                            <div className='row'>
                                <div className='col-sm-12 col-lg-3'>
                                    <TwoSlider />

                                </div>
                                <div className='col-sm-12 col-lg-9'>

                                    <Outlet />
                                </div>

                            </div>
                            {/* <BusinesFaire /> */}
                        </div>


                    </div>


                </div>
            </div>}
            
            {loader && <Loader/>}
        </>

    )

}

export default ProfileSnai3y;