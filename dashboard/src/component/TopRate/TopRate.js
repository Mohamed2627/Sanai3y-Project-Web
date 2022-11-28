
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClock,
  FaGenderless,
  FaIdCardAlt,
  FaPhoneSquareAlt,
  FaTransgender,
  FaUserAlt,
} from "react-icons/fa";
import { GoInfo, GoLocation, GoMail, GoPencil, GoTools } from "react-icons/go";
import { format } from "date-fns";
import './TopRate.css'
function TopRate() {
  const baseURLsanai3y = "http://localhost:7000/sanai3y/all";
  const [datasanai3y, setDatasanai3y] = useState([]);
  const [dataclient, setDataclient] = useState([]);
  useEffect(() => {
    axios.get(baseURLsanai3y).then((response) => {
      setDatasanai3y(response.data.Data);
      // setPage(_(response.data.Data).slice(0).take(pageSize).value());
    });   
  }, []);
  const baseURLclient = "http://localhost:7000/client/all";
  useEffect(() => {
    axios.get(baseURLclient).then((response) => {
      setDataclient(response.data.Data);
      // setPage(_(response.data.Data).slice(0).take(pageSize).value());
    });   
  }, []);
  console.log(dataclient);
  console.log(datasanai3y);

  return (

    <div className="row">
      <div className="mb-4 col-md-6 col-12">
    <div className="shadow rounded-3">
      <div className="border-bottom border-2 d-flex justify-content-between card-header bg-light ">
        <h2 className="fs-5 fw-bold mb-0 p-3">Top rate Sanai3y </h2>
        <h2 className="fs-5 fw-bold mb-0 p-3">Jobs </h2>
      </div>
      <div className="py-0 px-0 bg-light card-body ">
        <div className="list-group-flush list-group">
     {  datasanai3y.sort((a, b) => b.jobs.length - a.jobs.length).slice(0, 5).map((item,index) => (
       <div className="bg-light border-bottom py-3 px-3 list-group-item show-data"
       key={index}
       
       >
       <div className="align-items-center row"
         data-bs-toggle="modal"
         data-bs-target={`#Taha${item._id}`}
       >
         <div className="col-auto">
           
             <img
               src={item.img}
               className="m-0 rounded avatar-md"
               width={50}
               height={50}
             />
           
         </div>
         <div className="px-0 col-auto">
           <h4 className="fs-6 text-dark mb-0">
            
              {item.firstName+" "+item.lastName}
             
           </h4>
           <small>{item.skills}</small>
         </div>
         <div className="text-end col">
           <span className="fs-6 fw-bolder text-dark me-4">{item.jobs.length}</span>
         </div>
       </div>
       <div
                className="modal modal-xl fade"
                id={`Taha${item._id}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div
                      className=" d-flex justify-content-between  p-3 align-items-center"
                      dir="rtl"
                    >
                      <h1 className="modal-title fs-2" id="staticBackdropLabel">
                        التفاصيل حول الصنايعي
                      </h1>

                      <button
                        type="button"
                        className="btn-close edit_close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      {/* data Snai3y In Details */}
                      <div className="some_edit_about_snai3y">
                        <div className="cards-body">
                          <div className="leftTitle">
                            <div className="titleimg">
                              <img
                                width={150}
                                style={{ display: "block" }}
                                className="img-thumbnail"
                                src={item.img}
                                alt=""
                              />
                            </div>
                            <div className="titleContent">
                              <div className="parentTitles">
                                <div className="titleCard">
                                  <FaUserAlt
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{`${item.firstName} ${item.lastName}`}</h5>
                                </div>
                                <div className="titleCard">
                                  <FaPhoneSquareAlt
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{item.phoneNumber}</h5>
                                </div>
                              </div>
                              <div className="parentTitles">
                                <div className="titleCard">
                                  <GoMail
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{item.email}</h5>
                                </div>
                                <div className="titleCard">
                                  <GoLocation
                                    style={{ color: "#ffb200", fontSize: 22 }}
                                  />
                                  <h5>{item.address}</h5>
                                </div>
                              </div>
                              <div className="parentTitles">
                                <div className="titleCard">
                                  <FaIdCardAlt
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5 className="card-text">
                                    {item.nationalId}
                                  </h5>
                                </div>

                              
                              </div>
                            </div>
                          </div>
                          <div className="rightTitle">
                           
                            <div className="parentTitles">
                              <div>
                                <div className="titleCard">
                                  <FaTransgender
                                    style={{ color: "#ffb200", fontSize: 22 }}
                                  />
                                  <h5>{item.gender}</h5>
                                </div>
                               
                              </div>
                              <div>
                                <div className="titleCard">
                                  <GoTools
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{item.skills}</h5>
                                </div>
                                <div className="titleCard">
                                  <GoPencil
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{`years ${item.age} `}</h5>
                                </div>
                                <div className="titleCard">
                              <FaClock
                                style={{ color: "#ffb200", fontSize: 22 }}
                              />
                              <h5>{`${format(
                                new Date(item.joinedDate),
                                "d/MMM/yyyy"
                              )}`}</h5>
                            </div>
                            <div className="titleCard">
                                  <GoInfo
                                      style={{ color: "#ffb200", fontSize: 20 }}
                                    />
                                    <h5>{`Job ${item.jobs.length}`}</h5>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal-footer edit_footer_job  p-2"
                      dir="rtl"
                    >
                      <button
                        type="button"
                        className="btn btn-secondary edit_close_button"
                        data-bs-dismiss="modal"
                      >
                        اغلاق
                      </button>
                    </div>
                  </div>
                </div>
              </div>

     </div>
    ))   }
     
        </div>
      </div>
    </div>
  </div>
    <div className="mb-4 col-md-6 col-12">
    <div className="shadow cards rounded-3">
      <div className="border-bottom border-2 d-flex justify-content-between card-header bg-light">
        <h2 className="fs-5 fw-bold mb-0 p-3">Top rate Client </h2>
        <h2 className="fs-5 fw-bold mb-0 p-3">Jobs </h2>
      </div>
      <div className="py-0 px-0 bg-light card-body">
        <div className="list-group-flush list-group">
          {dataclient.sort((a, b) => b.jobs.length - a.jobs.length).slice(0, 5).map((item,index)=>(

          <div className="bg-light border-bottom py-3 px-3 list-group-item show-data"
          key={index}
          >
            <div className="align-items-center row"
               data-bs-toggle="modal"
               data-bs-target={`#Taha${item._id}`}
            >
              <div className="col-auto">
                
                  <img
                    src={item.img}
                    className="m-0 rounded avatar-md"
                    width={50}
                    height={50}
                  />
                
              </div>
              <div className="px-0 col-auto">
                <h4 className="fs-6 text-dark mb-0">
                 
                {item.firstName+" "+item.lastName}
                  
                </h4>
                <small>{item.rule}</small>
              </div>
              <div className="text-end col">
                <span className="fs-6 fw-bolder me-4 text-dark">{item.jobs.length}</span>
              </div>
            </div>
            <div
                className="modal modal-xl fade"
                id={`Taha${item._id}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div
                      className=" d-flex justify-content-between  p-3 align-items-center"
                      dir="rtl"
                    >
                      <h1 className="modal-title fs-2" id="staticBackdropLabel">
                        التفاصيل حول العميل
                      </h1>

                      <button
                        type="button"
                        className="btn-close edit_close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      {/* data Snai3y In Details */}
                      <div className="some_edit_about_snai3y">
                        <div className="cards-body">
                          <div className="leftTitle">
                            <div className="titleimg">
                              <img
                                width={150}
                                style={{ display: "block" }}
                                className="img-thumbnail"
                                src={item.img}
                                alt=""
                              />
                            </div>
                            <div className="titleContent">
                              <div className="parentTitles">
                                <div className="titleCard">
                                  <FaUserAlt
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{`${item.firstName} ${item.lastName}`}</h5>
                                </div>
                                <div className="titleCard">
                                  <FaPhoneSquareAlt
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{item.phoneNumber}</h5>
                                </div>
                              </div>
                              <div className="parentTitles">
                                <div className="titleCard">
                                  <GoMail
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{item.email}</h5>
                                </div>
                                <div className="titleCard">
                                  <GoLocation
                                    style={{ color: "#ffb200", fontSize: 22 }}
                                  />
                                  <h5>{item.address}</h5>
                                </div>
                              </div>
                              <div className="parentTitles">
                                <div className="titleCard">
                                  <FaIdCardAlt
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5 className="card-text">
                                    {item.nationalId}
                                  </h5>
                                </div>

                              
                              </div>
                            </div>
                          </div>
                          <div className="rightTitle">
                            <div className="titleCard">
                              <FaClock
                                style={{ color: "#ffb200", fontSize: 22 }}
                              />
                              <h5>{`${format(
                                new Date(item.joinedDate),
                                "d/MMM/yyyy"
                              )}`}</h5>
                            </div>
                            <div className="parentTitles">
                              <div>
                                <div className="titleCard">
                                  <FaTransgender
                                    style={{ color: "#ffb200", fontSize: 22 }}
                                  />
                                  <h5>{item.gender}</h5>
                                </div>
                              
                              </div>
                              <div>
                             
                                <div className="titleCard">
                                  <GoPencil
                                    style={{ color: "#ffb200", fontSize: 20 }}
                                  />
                                  <h5>{`years ${item.age} `}</h5>
                                </div>
                                <div className="titleCard">
                                  <GoInfo
                                      style={{ color: "#ffb200", fontSize: 20 }}
                                    />
                                    <h5>{`Job ${item.jobs.length}`}</h5>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal-footer edit_footer_job  p-2"
                      dir="rtl"
                    >
                      <button
                        type="button"
                        className="btn btn-secondary edit_close_button"
                        data-bs-dismiss="modal"
                      >
                        اغلاق
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          ))}
   
        </div>
      </div>
    </div>
  </div>
    </div>
  );
}

export default TopRate;
