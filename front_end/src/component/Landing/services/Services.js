import { NavLink } from "react-router-dom"
import "./Services.css"

function Services() {
    let token = localStorage.getItem("token")
    return (
        <div className="container">

            <div className="small-container" id="services">


                <div className="title-services">
                    <h2>خدماتنا</h2>
                    <p>صنايعية في جميع المجالات</p>
                </div>



                <div className="services">
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-hammer"></i>
                            <p>نجار</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-faucet-drip"></i>
                            <p>سباك</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-paint-roller"></i>
                            <p>نقاش</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-trowel-bricks"></i>
                            <p>بناء</p>
                        </div>
                    </div>


                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-bolt-lightning"></i>
                            <p>كهرباء</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-house-chimney-window"></i>
                            <p>الوميتال</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-fan"></i>
                            <p>صيانة تكييف</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="content">
                            <i className="s_icon fa-solid fa-trowel"></i>
                            <p>مبيض محاره</p>
                        </div>
                    </div>
                </div>






            </div>
            <div className="container d-flex justify-content-center align-items-center mb-5">
                <NavLink to={token? "/home": "/login"}>
                    <button type="button" className="showmore lh-lg">شاهد أكثر</button>

                </NavLink>
            </div>
        </div>
    )
}


export default Services