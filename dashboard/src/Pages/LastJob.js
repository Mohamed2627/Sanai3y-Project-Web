import "../component/Table/Table.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { FaUserAlt, FaClock } from "react-icons/fa";
import {
  MdDescription,
  MdOutlineDescription,
  MdPendingActions,
} from "react-icons/md";
import { GoInfo, GoLocation, GoMail, GoPencil, GoTools } from "react-icons/go";
import _ from "lodash";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
//////////////////constant//////////////////

const baseURL = "http://localhost:7000/Jobs/all";

// TAbleSanai3y
/////////////////commponent///////////////////

function LastJob() {
  const [data, setData] = useState([]);
  // console.log(data.length);
  const [serch, setSearch] = useState("");
  const [pagenetdPost, setPage] = useState([]);
  const [currentPge, setCurrentPge] = useState("");
  const [order, setOrder] = useState("");
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const res = response.data.data;

      setData(res.reverse());
    });
  }, []);

  console.log(currentPge);
  ////////////////////Sorting////////////////////

  ///////////////////////pagination////////////////
  // console.log(pagenetdPost);

  // console.log(startIndex);

  return (
    <div className="resentOrder">
      <div className="cardHeadr" style={{display:"flex",alignItems:"center",marginBottom:8}}>
        <h2>Jobs Register</h2>
        <NavLink  style={{textDecoration:"none"}} to="/job">
        <button style={{backgroundColor:"#007bff",border:'none',color:'#fff',padding:5,borderRadius:5}}>View All : </button>
        </NavLink>
      </div>
      {!data ? (
        "not found data"
      ) : (
        <table>
          <thead>
            <tr>
              <td> Name </td>
              <td> title</td>
              <td>city</td>
              <td>address</td>
              <td>status</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {data.slice(0,5).map((item) => (
              <tr key={item.id}>
                <td>{`${item.clientData?.firstName} ${item.clientData?.lastName}`}</td>
                <td>{item.title}</td>
                <td>{item.city}</td>
                <td>{item.address}</td>
                <td className="status">
                  {item.status == "pending" ? (
                    <span className="pending">{item.status}</span>
                  ) : item.status == "compelete" ? (
                    <span className="delivered">{item.status}</span>
                  ) : (
                    <span className="inprogress">{item.status}</span>
                  )}
                </td>

                <td>
                  <button
                    className="app_di_img btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#Taha${item._id}`}
                  >
                    Details
                  </button>
                </td>
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
                        className=" d-flex justify-content-between p-3 align-items-center "
                        dir="rtl"
                      >
                        <h1
                          className="modal-title fs-2"
                          id="staticBackdropLabel"
                        >
                          التفاصيل حول الوظائف
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
                        <div className="some_edit_about_snai3y d-flex">
                          <div className="cards-body">
                            <div className="leftTitle">
                              <div className="titleimg">
                                <img
                                  width={150}
                                  style={{ display: "block" }}
                                  className="img-thumbnail"
                                  src={item.image}
                                  alt=""
                                />
                              </div>
                              <div className="titleContent">
                                <div className="parentTitles">
                                  <div className="titleCard">
                                    <FaUserAlt
                                      style={{ color: "#ffb200", fontSize: 22 }}
                                    />
                                    <h5>{`${item.clientData?.firstName} ${item.clientData?.lastName}`}</h5>
                                  </div>
                                </div>
                                <div className="parentTitles">
                                  {item.address !== undefined ? (
                                    <div className="titleCard">
                                      <GoLocation
                                        style={{
                                          color: "#ffb200",
                                          fontSize: 22,
                                        }}
                                      />
                                      <h5>{item.address}</h5>
                                    </div>
                                  ) : null}
                                </div>
                                <div className="parentTitles">
                                  {item.city !== undefined ? (
                                    <div className="titleCard">
                                      <GoLocation
                                        style={{
                                          color: "#ffb200",
                                          fontSize: 22,
                                        }}
                                      />
                                      <h5>{item.city}</h5>
                                    </div>
                                  ) : null}

                                  <div className="titleCard">
                                    <MdPendingActions
                                      style={{ color: "#ffb200", fontSize: 20 }}
                                    />
                                    <h5>{item.status}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rightTitle">
                              <div className="parentTitles">
                                <div>
                                  {item.proposals.length !== 0 ? (
                                    <div className="titleCard">
                                      <FaUserAlt
                                        style={{
                                          color: "#ffb200",
                                          fontSize: 20,
                                        }}
                                      />
                                      <h5>{`[${[...item.proposals]}]`}</h5>
                                    </div>
                                  ) : null}
                                </div>
                                <div>
                                  <div className="titleCard">
                                    <GoTools
                                      style={{ color: "#ffb200", fontSize: 20 }}
                                    />
                                    <h5>{item.category}</h5>
                                  </div>
                                  <div className="titleCard">
                                    <GoInfo
                                      style={{ color: "#ffb200", fontSize: 20 }}
                                    />
                                    <h5 className="card-title">{item.title}</h5>
                                  </div>
                                  <div className="titleCard">
                                    <MdOutlineDescription
                                      style={{ color: "#ffb200", fontSize: 25 }}
                                    />
                                    <h5 style={{ width: 200 }}>
                                      {item.description}
                                    </h5>
                                  </div>
                                  <div className="titleCard">
                                <FaClock
                                  style={{ color: "#ffb200", fontSize: 22 }}
                                />
                                <h5>{`${format(
                                  new Date(item.hiredDate),
                                  "d/MMM/yyyy"
                                )}`}</h5>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default LastJob;
