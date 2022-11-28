import "../component/Table/Table.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
import _ from "lodash";
import { FaTrashAlt } from "react-icons/fa";

/////constanet/////
const baseURL = "http://localhost:7000/client/all";
////commponent//////

function LastClient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data.Data.reverse());
    });
  }, []);

  /////////////////////pagination/////////////////
  return (
    <div className="resentOrder">
      <div
        className="cardHeadr"
        style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
      >
        <h2>THe Last Client Register : </h2>
        <NavLink style={{ textDecoration: "none" }} to="/client">
          <button
            style={{
              backgroundColor: "#007bff",
              border: "none",
              color: "#fff",
              padding: 5,
              borderRadius: 5,
            }}
          >
            View All :{" "}
          </button>
        </NavLink>
      </div>

      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Adress</td>
            <td>gender</td>
            <td>National ID</td>
            <td>Details</td>
          </tr>
        </thead>
        <tbody>
          {data.slice(0,5).map((item, index) => (
            <tr key={index}>
              <td>{`${item.firstName} ${item.lastName}`}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.gender}</td>
              <td>{item.nationalId}</td>
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
                                  <h5>{`${item.rule} `}</h5>
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
    </div>
  );
}

export default LastClient;
