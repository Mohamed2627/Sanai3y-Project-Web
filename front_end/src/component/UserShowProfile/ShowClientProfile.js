import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { Box } from "@mui/system";
import Button from "@mui/joy/Button";
import Notfind from '../notfind/Notfind';
import { useSelector } from 'react-redux';





function ShowClientProfile() {
  // The current user
  const currentUser = useSelector((state) => state.userReducer.userData);
  const navigate = useNavigate();
  let [Profile, setProfile] = useState({})
  let [jobs, setJobs] = useState([])
  const [oopeen, setOpenUp] = useState(false)
  const [open, setOpen] = useState(false);
  let params = useParams().data
  // console.log(params)

  const [conversations, setConversations] = useState([]);
  let sanai3yId = localStorage.getItem("id");
  // console.log(sanai3yId);
  // console.log(Profile._id);

  // Getting all conversations of the current sanai3y
  useEffect(() => {
    axios.get("http://localhost:7000/conversations/" + sanai3yId).then((res) => {
      // console.log(res.data.data)
      setConversations([...res.data.data]);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  // Getting the data of client (reciever)  and routing to the chat page
  useEffect(() => {


    window.scrollTo(0, 0);
    async function getData() {

      const getAllData = await axios.get(`http://localhost:7000/client/clients/${params}`)
      setProfile(getAllData.data.Data)
      setJobs(getAllData.data.Data.jobs)
    }

    console.log(jobs)

    getData()

  }, [])


  // Making new conversation and routing to the chat page
  const setNewConversation = async () => {

    const isFriend = conversations.some((conversation) => conversation.members.includes(Profile._id))
    console.log(isFriend);
    if (isFriend) {
      navigate(`/chat/${Profile._id}`);
    }
    else {
      const res = await axios.post("http://localhost:7000/conversations", { senderId: sanai3yId, recieverId: Profile._id });
      console.log(res);
      navigate(`/chat/${Profile._id}`)

    }
    // const res = await axios.post("http://localhost:7000/conversations", { senderId: clientId, recieverId: Profile._id})
  }


  console.log(jobs)
  // Style material-ui
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    backgroundColor: "#FFF",
    boxShadow: 24,
    p: 4,
  };
  const styleButton = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    cursor: "pointer",
    background: "#FFF",
    // color: "#fff",
    borderRadius: "10px",
    borderTop: "3px",
    borderLeft: "10px",
    borderRight: "10px",
    borderWidth: "2px",
    borderColor: "#ffb200",
    color: "#ffb200",
    borderStyle: "solid",
    transitionProperty: "all",
    transitionDuration: ".5s",
    '&:hover': {
      background: "#ffb200",
      color: "#FFF"
    },
  }
  return (
    <>
      <div className='container' style={{ marginTop: "100px" }}>

        <div className="row">

          <div className="col-lg-4 col-sm-4">
            <div className="image_profile">
              <img src={Profile.img} />
            </div>
          </div>

          <div className="col-lg-8  col-sm-8">
            <div className="data_profile_client">
              <h4>{Profile.firstName + " " + Profile.lastName}</h4>
              <ul>
                <li>
                  <i className="fa-solid fa-at ed_fonts"></i>
                  <span className='ed_text_c'> البريد الالكتروني :</span>
                  <span className="data_client"><strong> {Profile.email}</strong></span>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot ed_fonts"></i>
                  <span className='ed_text_c'> العنوان :</span>
                  <span className="data_client"><strong> {Profile.address}</strong></span>

                </li>
                <li>
                  <i className="fa-solid fa-circle-info ed_fonts"></i>
                  <span className='ed_text_c'> العمر :</span>
                  <span className="data_client"><strong> {Profile.age} </strong></span>

                </li>
                <li className='d-flex flex-row justify-content-between w-100'>
                  <div className='col-lg-8 col-sm-8'>
                    <i className="fa-solid fa-circle-info ed_fonts"></i>
                    <span className='ed_text_c'> تاريخ التسجيل :</span>
                    <span className="data_client"><strong> {dateFormat(Profile.joinedDate, "fullDate")}</strong></span>
                  </div>
                  <div className='col-lg-4 col-sm-4 text-center'>
                    {(currentUser._id !== Profile._id) && <lord-icon
                      src="https://cdn.lordicon.com/hpivxauj.json"
                      trigger="click"
                      colors="primary:#ffb200"
                      style={{ width: '40px', height: '40px' }}
                      onClick={setNewConversation}>
                      {/* <span className='badge badge-danger bg-danger d-flex justify-content-center align-items-center ' style={{ width: '10px', height: '10px', fontSize: '1px' }}></span> */}
                    </lord-icon>}
                    {/* <button onClick={setNewConversation}><i class="fa-solid fa-comment-dots" style={{}}></i></button> */}
                  </div>


                </li>
              </ul>
              <div>
                عدد المنشورات :
                ({jobs.length})

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client jops */}
      <div className='container' style={{ backgroundColor: "#eee", padding: "10px", marginTop: "50px" }}>

        <div className='containerr' >

          {jobs.map((d, index) => (
            <div className="box" key={index}>
              <h1>{d.title}</h1>
              <span className="city">{d.city}</span>
              <span className="formatDate">
                {dateFormat(d.hiredDate, "UTC:h:MM:ss TT ")}
              </span>
              <p className="diss">{d.description}</p>


              <span className="category">{d.category}</span>
              <span
                className="badge badge-danger status"
                style={{ fontSize: '15px' }}
              >
                عدد المتقدمين للعمل
                (   {d.proposals.length} )
              </span>


              <h1>{d.show}</h1>
            </div>
          ))}
        </div>
      </div>

      {jobs.length == 0 && <Notfind />}
    </>
  )
}

export default ShowClientProfile