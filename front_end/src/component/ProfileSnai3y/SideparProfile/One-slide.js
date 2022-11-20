import { useEffect, useState, } from "react";
import { Snai3ycontext } from "../context";
import "./One-slide.css";
import { useDispatch, useSelector } from 'react-redux';
import { setData } from "../../../Redux/Slices/Snai3yReducer";
import { store } from "../../../Redux/Store";

function OneSlider() {
  let data = useSelector(state => state.Snai3yReducer.data)
  console.log(data)
  return (  
    <>
      <div className="navbar_right">
        <h3>عمليات التحقق</h3>
        <ul>

          <li>
            <span>
              <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/cnbtojmk.json"
                trigger="hover"
                colors="primary:#121331,secondary:#ffb200"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </span>
            <span>{data.phoneNumber}</span>  
          </li>



          <li>
            <span>

              <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/cnbtojmk.json"
                trigger="hover"
                colors="primary:#121331,secondary:#ffb200"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
              
            </span>
            <span>{data.email}</span>
          </li>

          <li>
            <span>

              <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/cnbtojmk.json"
                trigger="hover"
                colors="primary:#121331,secondary:#ffb200"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
              
            </span>
            <span>عدد الوظائف: {data.jobs}</span>  
          </li>





        </ul>
      </div>
    </>
  );
}

export default OneSlider;
