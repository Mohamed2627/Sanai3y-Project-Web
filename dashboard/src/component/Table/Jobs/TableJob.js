import "../Table.css";
import axios from "axios";
import { format } from "date-fns";
import {
  FaArrowDown,
  FaArrowUp,
  FaClock,
  FaGenderless,
  FaIdCardAlt,
  FaSearch,
  FaPhoneSquareAlt,
  FaTransgender,
  FaUserAlt,
} from "react-icons/fa";
import { MdDescription, MdOutlineDescription, MdPendingActions } from "react-icons/md";
import { GoInfo, GoLocation, GoMail, GoPencil, GoTools } from "react-icons/go";
import _ from "lodash";
import {  FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
//////////////////constant//////////////////
const pageSize = 10;
const baseURL = "http://localhost:7000/Jobs/all";



// TAbleSanai3y
/////////////////commponent///////////////////

function TableJob() {
  const [data, setData] = useState([]);
// console.log(data.length);
  const [serch, setSearch] = useState("");
  const [pagenetdPost, setPage] = useState([]);
  const [currentPge, setCurrentPge] = useState('');
  const [order, setOrder] = useState('');
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data.data);
      setData(response.data.data);
      // console.log("efect");
      setPage(_(response.data.data).slice(0).take(pageSize).value());
      // console.log(pagenetdPost);
    });
  }, []);

  useEffect(()=>{
  setPage(_(data).slice(0).take(pageSize).value())
  },[data])

console.log(data)
  ////////////////////Sorting////////////////////
  const sorting = (col) => {
    setOrder("ASC")
    if (order === "ASC") {
      
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      // setPage(sorted);
      setPage(_(sorted).slice(0).take(pageSize).value());
      setOrder("DSC");
    }
    if (order === "DSC") {
      
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      // setPage(sorted);
      setPage(_(sorted).slice(0).take(pageSize).value());
      setOrder("ASC");
    }
  };
  ///////////////////////pagination////////////////
  // console.log(pagenetdPost);

  const pageCount = pagenetdPost ? Math.ceil(data.length / pageSize) : 0;
  if (pageCount === 0) return null;
  const pages = _.range(1, pageCount + 1);
  // console.log(pages);
  const pagination = (pagnum) => {
    // console.log(pagnum);
    setCurrentPge(pagnum);
    // setData(pagnum)
    const startIndex = (pagnum - 1) * pageSize;
    const pagenetdPoste = _(data).slice(startIndex).take(pageSize).value();
    setPage(pagenetdPoste);
  // console.log(startIndex);

  };

  function deleteRow(id) {
    // console.log(id);
    let jobs = data.filter((item) => item._id !== id);
    // setPage(jobs);
    setData([...jobs]);
   const token = localStorage.getItem("token")
    axios.delete(`http://localhost:7000/jobs/delete/${id}`,{headers:{authorization:token}}).then((res) => {});
  }
  return (
    <div className="resentOrder">
      <div className="cardHeadr">
        <h2>Jobs Register</h2>
        <div>
          <input
          type="text"
          placeholder="Search About Jobs"
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
      {!data ? (
        "not found data"
      ) : (
        <table>
          <thead>
            <tr>
              <td> Name </td>
              <td onClick={() => sorting("title")}>title</td>
              <td onClick={() => sorting("city")}>city</td>
              <td onClick={() => sorting("address")}>address</td>
              <td onClick={() => sorting("status")}>status</td>
              <td>Delete</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {pagenetdPost
              .filter((item) => 
              item.clientData?.firstName.toLowerCase().includes(serch)||
              item.clientData?.firstName.concat(" ", item.clientData?.lastName).toLowerCase().includes(serch) ||
              item.title?.toLowerCase().includes(serch)||
              item.address?.toLowerCase().includes(serch)||
              item.city?.toLowerCase().includes(serch)||
              item.status?.toLowerCase().includes(serch)
              )
              .map((item,index) => (
                <tr key={index}>
                  <td>{`${item.clientData?.firstName} ${item.clientData?.lastName}`}</td>
                  <td>{item.title}</td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td className="status">{item.status=="pending" ? <span className="pending">{item.status}</span>:item.status=="compelete" ? <span className="delivered">{item.status}</span>:<span className="inprogress">{item.status}</span>}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteRow(item._id);
                      }}
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
                      <div className=" d-flex justify-content-between p-3 align-items-center " dir="rtl" >
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
                                 <div className="titleCard">
                                  <GoLocation
                                    style={{ color: "#ffb200", fontSize: 22 }}
                                  />
                                  <h5>{item.address}</h5>
                                </div>
                              </div>
                              <div className="parentTitles">
                              <div className="titleCard">
                                  <GoLocation
                                    style={{ color: "#ffb200", fontSize: 22 }}
                                  />
                                  <h5>{item.city}</h5>
                                </div>
                          
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
                              <div className="titleCard">
                                <FaClock
                                  style={{ color: "#ffb200", fontSize: 22 }}
                                />
                                <h5>{`${format(
                                  new Date(item.hiredDate),
                                  "d/MMM/yyyy"
                                )}`}</h5>
                              </div>
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
                                      <h5>{item.proposals.map((item)=>(
                                        <p>
                                          {`${item.sanai3yId.firstName} ${item.sanai3yId.lastName},`}
                                        </p>
                                      ))}</h5>
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
                                  <h5 style={{width:200}}>{item.description}</h5>
                                </div>
                                </div>
                              </div>
                          </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer edit_footer_job  p-2" dir="rtl">
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
export default TableJob;
