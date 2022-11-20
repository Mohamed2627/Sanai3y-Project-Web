import React, { useState } from 'react'
import './ClintCard.css'
import { NavLink } from 'react-router-dom'
import dateFormat from "dateformat";
function ClintCard({ datas }) {
    let [data, setData] = useState(datas)
    return (
      <>
        <NavLink to={`/showprofile/${data._id}`} style={{ color: "black" }}>
          <div
            className="parent_card mb-4 p-3"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="row">
              <div className="col-lg-4 col-md-5 col-sm-12">
                <div className="box_image_in_card_client">
                  <img
                    src={data.img}
                    alt="snai3y photo"
                    style={{ width: "100%", height:'100%' }}
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-sm-12 snai3y_content">
                {/* Name  */}
                <h2
                  style={{
                    borderRight: "2px solid #ffb200",
                    paddingRight: "10px",
                  }}
                >
                  {/* <i className=
                                // Snai3y Status
                                {`fa-solid fa-o ${data.status == "free" ? "snai3y_status" : ""}`}

                                style={{ fontSize: "20px" }}></i> */}
                  {`${data.firstName} ${data.lastName}`}
                </h2>
                {/* Date  */}
                <small>
                  <i
                    className="fa-solid fa-clock"
                    style={{ fontSize: "18px" }}
                  ></i>
                  {dateFormat(data.joinedDate, "mmmm dS, yyyy , h:MM  TT")}
                </small>

                {/* address */}
                <p style={{ marginTop: "10px" }}>
                  <lord-icon
                    src="https://cdn.lordicon.com/zzcjjxew.json"
                    trigger="hover"
                    colors="primary:#ffb200,secondary:#000000"
                    style={{ width: "30px", height: "30px" }}
                  ></lord-icon>
                  {data.address}
                </p>

                {/* gender  */}
                <small className="snai3y_gender">{data.gender}</small>
                <hr />
                {/* Skills */}
                <div className="row">
                  <div className=" col-12">
                    <p className="snai3y_skills">{data.skills}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </NavLink>
      </>
    );
}

export default ClintCard