import './navpar.css'
import logo from '../../images/landing/logo.png'
import user from '../../images/landing/user.png'
import { useNavigate, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Snai3ycontext } from '../ProfileSnai3y/context'
import { useDispatch, useSelector } from 'react-redux'
import { getDataClient } from '../../Redux/Slices/ClientReducer'
import { getSnai3y, logOutSnai3y } from '../../Redux/Slices/Snai3yReducer'
import Notifications from '../notifications/Notifications'
import axios from 'axios'




function Navpar({ socket }) {

    // The badge
    const [badge, setBadge] = useState(false);
    // // when click (responsive)
    // const [click, setClick] = useState(false)
    // sanai3y notifications
    const [sanai3yNotifications, setSanai3yNotifications] = useState([]);
    // client notifications
    const [clientNotifications, setClientNotifications] = useState([])
    // New notifications
    const [newNotifications, setNewNotifications] = useState([])
    // // The job id
    // const [jobId, setJobId] = useState("");

    // The current User
    const currentUser = useSelector((state) => state.userReducer.userData);
    console.log(currentUser._id, currentUser.rule)

    // // The current role
    // const currentRole = currentUser.rule;



    // The socket events
    useEffect(() => {
        socket?.emit("groupUserRule", { currentUserId: currentUser?._id, currentUserRule: currentUser?.rule })
        socket?.on("getRule", ((msg) => {
            console.log(msg)
        }))

        // Getting add job notification
        socket?.on("getJob", (data) => {
            if (currentUser?.skills === data.skills) {
                // setJobId(data.jobId);
                setBadge(true);
                setNewNotifications(data);

            }
        })

        // Getting accept job notification
        socket?.on("getAcceptedJob", (data) => {
            // setJobId(data.jobId);
            setBadge(true);
            setNewNotifications(data);
            console.log(data);
        })

        // Getting proposal notification
        socket?.on("getproposal", (data) => {
            setBadge(true);
            setNewNotifications(data);
        })

        // Confirm compeleting the job notification
        socket?.on("getconfirm", (data) => {
            setBadge(true);
            setNewNotifications(data);
        })



    }, [currentUser, socket])


    // Adding the new notification by socket io
    useEffect(() => {
        // let finalNotifications = newNotifications?.concat(sanai3yNotifications)
        // setSanai3yNotifications((prev) => newNotifications?.concat(prev))
        if (currentUser.rule === "sanai3y") {
            setSanai3yNotifications((prev) => [newNotifications, ...prev])
        }
        else if (currentUser.rule === "client") {
            setClientNotifications((prev) => [newNotifications, ...prev])
        }
        
    }, [newNotifications])

    // Fetching the notifications of the currentUser
    useEffect(() => {
        const headers = { authorization: currentUser?.token }
        if (currentUser.rule === "sanai3y") {
            let getNotifications = async () => {
                const res = await axios.get(`http://localhost:7000/sanai3y/notifications`, { headers: headers });
                console.log(res.data.data.newNotifications)
                console.log(res.data.data.oldNotifications)
                if (res.data.data.newNotifications.length !== 0) {
                    setBadge(true);
                }
                let notifications = res.data.data.newNotifications.concat(res.data.data.oldNotifications);
                setSanai3yNotifications(notifications)
            }
            getNotifications();
        } else if (currentUser.rule === "client") {
            let getNotifications = async () => {
                const res = await axios.get(`http://localhost:7000/client/notifications`, { headers: headers });
                console.log(res.data.data.newNotifications)
                console.log(res.data.data.oldNotifications)
                if (res.data.data.newNotifications.length !== 0) {
                    setBadge(true);
                }
                let notifications = res.data.data.newNotifications.concat(res.data.data.oldNotifications);
                setClientNotifications(notifications)
            }
            getNotifications();
        }

    }, [currentUser])


    // Onclicking on notifications
    const readNotifications = async () => {
        let token = localStorage.getItem("token")
        const headers = { authorization: token }
        if (currentUser.rule === "sanai3y") {
            const res = await axios.put(`http://localhost:7000/sanai3y/readnotification`, {}, { headers: headers });
            setBadge(false);
        }
        else if (currentUser.rule === "client") {
            const res = await axios.put(`http://localhost:7000/client/readnotification`, {}, { headers: headers });
            setBadge(false);
        }

    }

    const onSanai3yNavigating = (notificationObj) => {
        if(notificationObj.type === "addjob") {
            navigate(`/home/${notificationObj.jobId}`)
            window.location.reload(true)
        }
        else if (notificationObj.type === "acceptjob") {
            navigate("/profileS/two");
            window.location.reload(true)

        }
    }

    const onClientNavigating = (notificationObj) => {
        if(notificationObj.type === "addproposal") {
            navigate(`/profileC/${notificationObj.jobId}`)
            window.location.reload(true)
        }
        else if (notificationObj.type === "confirmjob") {
            navigate(`/profileC/${notificationObj.jobId}`)
            window.location.reload(true)

        }
    }

    // // Onclicking on notifications (responsive)
    // const showNotifications = () => {
    //     setClick(!click);
    //     setBadge(false);
    // }


    console.log(sanai3yNotifications)
    /////////////////////////////////////////////////////////////////////

    // const {data, setData} = useState(Snai3ycontext)
    const role = localStorage.getItem("snai3yRole");
    // let [dataUser,setDataUser] = useState() ;//Snai3y Data
    let snai3yData = useSelector(state => state.Snai3yReducer.data);
    let clientData = useSelector(state => state.ClientReducer.clintdata)

    let dataUser;

    if (role == "sanai3y") {
        dataUser = snai3yData
        // console.log(dataUser)
    }
    else if (role == "client") {
        dataUser = clientData
        // console.log(dataUser)
    }
    else dataUser = ""

    // console.log(data)


    let token = localStorage.getItem("token")
    const navigate = useNavigate()
    const imageUser = localStorage.getItem("image");
    const userName = localStorage.getItem("Name");
    let dispatch = useDispatch()

    function logout() {

        localStorage.clear()
        navigate("/login");
    }
    return (
        <div lang='ltr' >
            <nav className="navbar navbar_project navbar-expand-lg navbar-dark p-0">
                <div className='container'>

                    <NavLink to='/' className="navbar-brand" style={{ width: "80px" }}>

                        <img src={logo} className="brand" style={{ width: "100%" }}></img>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item active list_navpar">
                                <NavLink to="/home">
                                    {/* <lord-icon
                                    src="https://cdn.lordicon.com/dxjqoygy.json"
                                    trigger="hover"
                                    colors="primary:#000000,secondary:#ffb200"
                                    style={{ width: '30px', height: '30px' }}>
                                </lord-icon> */}

                                    <i className="fa-solid fa-house-user"></i>
                                    الصفحة الرئيسيه
                                </NavLink>
                            </li>

                            <li className="nav-item list_navpar" >
                                <NavLink to="/allsnai3y">
                                    <i className="fa-solid fa-helmet-safety"></i>
                                    الحرفين
                                </NavLink>
                            </li>

                            <li className="nav-item list_navpar">
                                <NavLink to="/terms">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/yyecauzv.json"
                                        trigger="click"
                                        colors="primary:#fff,secondary:#ffb200"
                                        style={{ width: '30px', height: '30px' }}>
                                    </lord-icon>
                                    سياسة الأستخدام
                                </NavLink>
                            </li>
                            {token && <li className="icon_nav_mesage nav-item list_navpar text-white">
                                {/* <button className='notificbtn' onClick={showNotifications}> */}

                                <lord-icon
                                    src="https://cdn.lordicon.com/psnhyobz.json"
                                    trigger="click"
                                    colors="primary:#ffb200"
                                    style={{ width: '30px', height: '30px' }}
                                >

                                    {badge && <span className='badge badge-danger bg-danger d-flex justify-content-center align-items-center ' style={{ width: '10px', height: '10px', fontSize: '1px' }}></span>}
                                </lord-icon>
                                {/* الاشعارات */}
                                {/* </button> */}
                                {/* {click && <div className='notificList'> */}
                                {/* hfhhhhhhh */}
                                {/* </div>} */}
                            </li>}
                            {token && <li className="icon_nav_mesage nav-item list_navpar text-white">
                                <NavLink to='/chat'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hpivxauj.json"
                                        trigger="click"
                                        colors="primary:#ffb200"
                                        style={{ width: '30px', height: '30px' }}>
                                        <span className='badge badge-danger bg-danger d-flex justify-content-center align-items-center ' style={{ width: '10px', height: '10px', fontSize: '1px' }}></span>
                                    </lord-icon>
                                    الرسائل
                                </NavLink>
                            </li>}
                            {token && <li className='icon_nav_mesage nav-item '>
                                <NavLink to={role == "sanai3y" ? "/profileS" : "/profileC"} className=''>
                                    <div style={{ width: '30px', height: '30px', display: "flex" }} className="">
                                        <img src={dataUser?.img} style={{ width: '100%', height: '100%', borderRadius: "50%" }} />
                                        <span style={{ marginRight: "5px", color: "white" }}>
                                            {dataUser?.firstName + dataUser?.lastName}
                                        </span>
                                    </div>
                                    {/* <h4 style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "13ch", direction: "ltr", textAlign: "center" }}>{`${dataUser.firstName} ${dataUser.lastName}`}</h4> */}
                                </NavLink>
                            </li>}
                            {token && <li onClick={logout} style={{ cursor: "pointer" }} className='list_navpar icon_nav_mesage nav-item list_navpar text-white'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                تسجيل الخروج
                            </li>}
                            {!token && <li className='icon_nav_mesage nav-item list_navpar text-white'>
                                <NavLink to='/login' className='d-flex align-items-baseline'>
                                    <i className="login_content icon fa-solid fa-user"></i>
                                    تسجيل الدخول
                                </NavLink>
                            </li>}
                            {!token && <li className='icon_nav_mesage nav-item list_navpar text-white'>
                                <NavLink to='/regiser' className='d-flex align-items-baseline'>
                                    <i className="login_content icon fa-solid fa-user-plus"></i>
                                    حساب جديد
                                </NavLink>
                            </li>}
                        </ul>
                        <div className='chat_notif d-flex align-items-center justify-content-md-center justify-content-sm-center'>



                            {token && <div className='login_reg_nav'>

                                {/* Notefications */}
                                <div className=' position-relative toggle notification_icon' data-bs-toggle="collapse" data-bs-target="#notification" aria-controls="userToogel" aria-expanded="false" aria-label="Toggle navigation">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/psnhyobz.json"
                                        trigger="click"
                                        colors="primary:#ffb200"
                                        style={{ width: '40px', height: '35px', marginLeft: '20px' }}
                                        onClick={readNotifications}
                                    >

                                        {badge && <span className='badge badge-danger bg-danger d-flex justify-content-center align-items-center ' style={{ width: '10px', height: '10px', fontSize: '1px' }}></span>}

                                    </lord-icon>
                                </div>
                                {/* if the current user is sanai3y */}
                                {currentUser.rule === "sanai3y" && <div id='notification' className='collapse  notification_toggle'>
                                    {sanai3yNotifications?.map((notificationObj) => <div onClick={ () => {onSanai3yNavigating(notificationObj)} } className='one_notification'>
                                        {notificationObj?.notification}
                                    </div>)}

                                </div>}
                                {/* if the current user is client */}
                                {currentUser.rule === "client" && <div id='notification' className='collapse  notification_toggle'>

                                {clientNotifications?.map((notificationObj) => <div onClick={ () => {onClientNavigating(notificationObj)} } className='one_notification'>
                                        {notificationObj?.notification}
                                    </div>)}
                                </div>}

                                {/* Chat  */}


                                <NavLink to='/chat'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hpivxauj.json"
                                        trigger="click"
                                        colors="primary:#ffb200"
                                        style={{ width: '40px', height: '35px', marginLeft: '20px' }}>
                                        <span className='badge badge-danger bg-danger d-flex justify-content-center align-items-center ' style={{ width: '10px', height: '10px', fontSize: '1px' }}></span>
                                    </lord-icon>
                                </NavLink>
                            </div>}

                            {/* image User  */}
                            {token && <div className='login_reg_nav'>
                                <div className=' position-relative toggle' data-bs-toggle="collapse" data-bs-target="#userToogel" aria-controls="userToogel" aria-expanded="false" aria-label="Toggle navigation">
                                    <img src={dataUser?.img} style={{ width: '30px', height: '30px', borderRadius: "50%", cursor: "pointer" }}></img>
                                </div>
                                <div id='userToogel' className='collapse  user_toogel'>
                                    <div>

                                        <div className='user_content_navpar'>
                                            <div className='user_img_name'>
                                                <NavLink to={role == "sanai3y" ? "/profileS" : "/profileC"} className='user_img_name'>
                                                    <div style={{ width: '130px', height: '130px', marginBottom: "15px" }}>
                                                        <img src={dataUser?.img} style={{ width: '100%', height: '100%', borderRadius: "50%" }} />
                                                    </div>
                                                    <h4 style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "13ch", direction: "ltr", textAlign: "center" }}>{`${dataUser?.firstName} ${dataUser?.lastName}`}</h4>
                                                </NavLink>
                                            </div>
                                            <div>
                                                <button className="btn_user" onClick={logout}>
                                                    <i className="fa-solid fa-right-from-bracket"></i>
                                                    <p>تسجيل الخروج</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}



                            <div className=' d-flex justify-content-md-center justify-content-sm-center mb-md-3 mb-sm-3 m-lg-0'>
                                {!token && <div className='login_reg_nav text-light  mx-2 login_reg_button'>
                                    <a className='d-flex align-items-baseline '>
                                        <NavLink to='/login' className='d-flex align-items-baseline'>
                                            <i className="login_content icon fa-solid fa-user"></i>
                                            <p className='p-0 m-0'>تسجيل الدخول</p>
                                        </NavLink>
                                    </a>
                                </div>}
                                {!token && <div className=' text-light d-flex align-items-baseline mx-2 login_reg_button'>

                                    <a className='login_reg_nav'>
                                        <NavLink to='/regiser' className='d-flex align-items-baseline'>
                                            <i className="login_content icon fa-solid fa-user-plus"></i>
                                            <p className='p-0 m-0'>حساب جديد</p>
                                        </NavLink>
                                    </a>
                                </div>}
                            </div>

                        </div>

                    </div>
                </div>
            </nav>

        </div>
    )

}

export default Navpar