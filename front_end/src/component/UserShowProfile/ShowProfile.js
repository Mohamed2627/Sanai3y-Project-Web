import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import dateFormat from "dateformat";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notfind from '../notfind/Notfind';



function Showprofile(props) {
  // The current user
  const currentUser = useSelector((state) => state.userReducer.userData);

  // console.log(currentUser.jobs)

  // let Profile = useSelector((state) => state.Snai3yReducer.data)
  const navigate = useNavigate();
  let params = useParams().data
  let [Profile, setProfile] = useState({})
  let [photo, setPhoto] = useState([])
  const [conversations, setConversations] = useState([]);
  let clientId = localStorage.getItem("id");
  // console.log(clientId);
  // console.log(Profile._id);


  // Getting all conversations of the current client
  useEffect(() => {
    axios.get("http://localhost:7000/conversations/" + clientId).then((res) => {
      // console.log(res.data.data)
      setConversations([...res.data.data]);
    }).catch((err) => {
      console.log(err)
    })


    window.scrollTo(0, 0)
  }, [])


  // Getting the data of sanai3y (reciever)  and routing to the chat page
  useEffect(() => {
    axios.get(`http://localhost:7000/sanai3y/sanai3ies/${params}`)
      .then((res) => {
        // console.log(res.data.Data.workStore)
        setPhoto(res.data.Data.workStore)
        setProfile(res.data.Data)
      })

    window.scrollY = 0;
  }, [])


  // Making new conversation and routing to the chat page
  const setNewConversation = async () => {

    const isFriend = conversations.some((conversation) => conversation.members.includes(Profile._id))
    console.log(isFriend);
    if (isFriend) {
      navigate(`/chat/${Profile._id}`);
    }
    else {
      const res = await axios.post("http://localhost:7000/conversations", { senderId: clientId, recieverId: Profile._id });
      console.log(res);
      navigate(`/chat/${Profile._id}`)

    }
    // const res = await axios.post("http://localhost:7000/conversations", { senderId: clientId, recieverId: Profile._id})
  }


  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        {Profile && <div className="row" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding: "20px" }}>

          <div className="col-lg-4 col-sm-12">
            <div className="image_profile">
              <img src={Profile.img} />
            </div>
          </div>

          <div className="col-lg-8  col-sm-12">
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
                  <i class="fa-solid fa-screwdriver-wrench ed_fonts"></i>
                  <span className='ed_text_c'>الحرفة :</span>
                  <span className="data_client"><strong> {Profile.skills}</strong></span>

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
                    {/* <button type="button" className="btn btn-primary" onClick={setNewConversation}>Button</button> */}
                  </div>


                </li>
              </ul>
              
              <div>
                      عدد الوظائف اللتي قبل فيها 
                      ( {currentUser.jobs.length} )

              </div>


            </div> {/* end Div Ul */}

          </div>

        </div>} {/* end parint details */}
      </div> {/* end Div Container */}


      <div className='container'>
        <div className="cardinfo3 col-12" id="worke">
          <div className="container">
            <div className="cardinfo3_edit justify-content-center">
              <h3 className="special-header text-center"> معرض الاعمال</h3>
            </div>


            {/* Slider From Swiper Liprary */}
            {photo.length > 0 && <Swiper
              slidesPerView={3}
              spaceBetween={30}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >

              {photo.map((item, index) =>

                <SwiperSlide key={index}>
                  <div className="cardWork">

                    <div className='cardWork_img'>
                      <img src={item.img} alt="" />
                    </div>

                    <div className="info_Card_Work">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                  </div>

                </SwiperSlide>
              )}


            </Swiper>}
            {photo.length == 0 && <Notfind data={"لايوجد صور حاليا"} />}
          </div>
        </div>
      </div>



    </>
  )
}

export default Showprofile