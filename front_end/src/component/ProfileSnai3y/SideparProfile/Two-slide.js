import "./Two-slide.css";
import { Link, NavLink } from "react-router-dom";
function TwoSlider() {
  return (
    <>
      <div className="navbar_right">
        {/* <h3>عمليات التحقق</h3> */}
        <ul className="navpar_tow">
          <li>

            <NavLink to="one">
              <span>
                <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
                <lord-icon
                  src="https://cdn.lordicon.com/gmzxduhd.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffb200"
                  style={{ width: "30px", height: "30px" }}
                ></lord-icon>
              </span>
              <span className="nav_title_flex">معرض الاعمال</span>
            </NavLink>
          </li>

          <li>

            <NavLink to="two">
              <span>
                <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
                <lord-icon
                  src="https://cdn.lordicon.com/zpxybbhl.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffb200"
                  style={{ width: "30px", height: "30px" }}
                >
                  
                </lord-icon>
              </span>
              <span className="nav_title_flex">الطلبات المقبولة</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TwoSlider;
