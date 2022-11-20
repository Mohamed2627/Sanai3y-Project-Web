import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './AddjopsIcon_fixed.css'
function AddjopsIcon_fixed() {
    let role = localStorage.getItem("snai3yRole");
    let token = localStorage.getItem("token");
    let navigate = useNavigate()
    function gotoJops(){
        navigate("/addjops")
    }
    return (
        <>
            {role != "sanai3y" && token &&<div className='icon_jops'>
                <button onClick={gotoJops}>
                    <i className="fa-solid fa-plus"></i>
                    إنشاء وظيفة
                </button>
            </div>}
        </>
    )
}

export default AddjopsIcon_fixed