import { useEffect, useState } from "react";
import "./headerHome.css";

function HeaderHome(props) {
  // console.log(data)
  let [val, setVal] = useState()
  // console.log(val.val)

  function inputval(e) {
    // let lowercase = e.target.value
    setVal(e.target.value)
  }

  useEffect(() => {
    props.data(val)

  }, [val])
  // console.log(val)
  return (
    <div className="one mt-5">
      <div className="container">
        <div className="only_flex row">
          <div className="tittle_page col-sm-12 col-md-6">
            <h1>الرئيسية</h1>
            <h2>صناعة وتطوير</h2>
            <p>
              استعن بخدمات أفضل الحرفيين والمطورين لحل جميع المشاكل التي تواجهها  
            </p>
          </div>

          <div className="col-sm-12 col-md-6 position-relative">
            <div className="box_search">
              <div className="search">
                <input
                  type="text"
                  id="#"
                  onChange={inputval}
                  placeholder="البحث بعنوان المشكلة"
                />
                  <lord-icon
                    src="https://cdn.lordicon.com/xfftupfv.json"
                    trigger="loop"
                    delay="2000"
                    colors="primary:#ffb200"
                    style={{width:"40px",height:"40px",top:"-50%", transform:"translateY(-50%)"}}>
                  </lord-icon>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Lines */}
      <div className="container">
        <div className="border_me_right"></div>
        <div className="border_me_left"></div>
      </div>



    </div>
  );
}

export default HeaderHome;
