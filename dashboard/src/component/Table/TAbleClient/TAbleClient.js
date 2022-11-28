import "../Table.css";
import axios from "axios";
import _ from "lodash";
import {  FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import {
  FaClock,
  FaGenderless,
  FaIdCardAlt,
  FaSearch,
  FaPhoneSquareAlt,
  FaTransgender,
  FaUserAlt,
} from "react-icons/fa";
import { GoInfo, GoLocation, GoMail, GoPencil, GoTools } from "react-icons/go";
import { format } from "date-fns";
/////constanet/////
const pageSize = 10;
const baseURL = "http://localhost:7000/client/all";
////commponent//////

function TAbleClient() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pagenetdPost, setPage] = useState([]);
  const [currentPge, setCurrentPge] = useState("");
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data.Data);
      setPage(_(response.data.Data).slice(0).take(pageSize).value());
    });
  }, []);
  useEffect(() => {
    // setData(response.data.Data);
    setPage(_(data).slice(0).take(pageSize).value());
  }, [data]);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setPage(_(sorted).slice(0).take(pageSize).value());
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
        setPage(_(sorted).slice(0).take(pageSize).value());
      setOrder("ASC");
    }
  };

  /////////////////////pagination/////////////////
  const pageCount = pagenetdPost ? Math.ceil(data.length / pageSize) : 0;
  if (pageCount === 0) return null;
  const pages = _.range(1, pageCount + 1);
  const pagination = (pagnum) => {
    console.log(pagnum);
    setCurrentPge(pagnum);
    // setData(pagnum)
    const startIndex = (pagnum - 1) * pageSize;
    const pagenetdPoste = _(data).slice(startIndex).take(pageSize).value();
    setPage(pagenetdPoste);
  };
  /////////////////////////////delet function///////////////////////////////////
  function deleteRow(id) {
    // console.log(id);
    let Client = data.filter((item) => item._id !== id);
    setData([...Client]);
    axios.delete(`http://localhost:7000/Client/delete/${id}`).then((res) => {});
  }
  return (
    <div className="resentOrder">
      <div className="cardHeadr">
        <h2>Client Register</h2>
        <div>
          <input
          type="text"
          placeholder="Search About client"
          className="search"
          onChange={(ev) => {
            const inputSearch=ev.target.value.toLocaleLowerCase().trim()
            setSearch(inputSearch)}}
        />
        <span className='searchicon'>

<FaSearch/>
          </span>
        </div>
    
      </div>

      <table>
        <thead>
          <tr>
            <td onClick={() => sorting("firstName")}>Name</td>
            <td onClick={() => sorting("email")}>Email</td>
            <td onClick={() => sorting("address")}>Address</td>
            <td onClick={() => sorting("gender")}>gender</td>
            <td onClick={() => sorting("gender")}>National ID</td>
            <td>Delete</td>
            <td>Details</td>
          </tr>
        </thead>
        <tbody>
          {pagenetdPost
            .filter(
              (item) =>
                item.firstName.concat(" ",item.lastName).toLowerCase().includes(search) ||
                item.address.toLowerCase().includes(search) ||
                item.email.toLowerCase().includes(search) ||
                item.gender.toLowerCase().includes(search)||
                item.nationalId.toLowerCase().includes(search)
            )
            .map((item, index) => (
              <tr key={index}>
                <td>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.gender}</td>
                <td>{item.nationalId}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteRow(item._id)}
                  >
                   <  FaTrashAlt />
                  </button>
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
                                {item.rule=="client"?<div className="titleCard">
                                  <GoInfo
                                      style={{ color: "#ffb200", fontSize: 20 }}
                                    />
                                    <h5>{`Job ${item.jobs.length}`}</h5>
                                  </div>:null}
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
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li>
              <p
                className="page-link btn btn-succes"
                onClick={() => pagination(page)}
              >
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default TAbleClient;
