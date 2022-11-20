import './About.css'
import Carousel from '../../../images/landing/whyus.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
function About() {
    let [crafts, setCrafts] = useState([])
    let token = localStorage.getItem("token")
    useEffect(() => {

        axios.get("http://localhost:7000/sanai3y/all").then((res) => {
            // console.log(res.data.Data)
            let x = res.data.Data
            // let arr =[]
            // arr.push(x[1])
            // arr.push(x[2])
            // arr.push(x[4])
            // console.log()
            setCrafts(x.slice(-3))
            // console.log(crafts)
        })
    }, [])
    return (
        <div>
            <div className='AboutUs'>
                <div className='OverLay'></div>
                <h2 className='About_Title'>
                    أحدث الحرفين
                </h2>
                <div className='container AboutUs_content'>
                    <div className='row p-0 parent_aboutUs'>

                            {crafts.map((item, index) =>
                        <NavLink className='card_About col-3 col-lg-4 col-md-12' to={token?`/showprofile/${item._id}`:"/login"}>
                                <div className='' key={index}>
                                    <div className='img_About'>
                                        <img src={item.img}></img>
                                    </div>

                                    <div className='About_name'>
                                        <h5>{`${item.firstName} ${item.lastName}`}</h5>
                                        <p> {item.skills}</p>
                                    </div>
                                </div>

                        </NavLink>
                            )}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default About