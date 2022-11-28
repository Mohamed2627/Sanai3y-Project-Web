/* eslint-disable no-undef */
import './Content.css'

    function CardInfo() {
      return (
        
        
          <div className="imeg col-4"> 
            <div className="under_images">
              <span className="titel">
                <i className="fa-solid fa-plug" />
                <span>نشط الان</span>
              </span>
              <span className="rated">
                <i className=" fa-regular fa-star" />
                <i className="fa-regular fa-star" />
                <i className="fa-regular fa-star" />
                <i className="fa-regular fa-star" />
                <i className="fa-regular fa-star" />
              </span>
              <span className="titel">
                <i className="fa-solid fa-arrow-right-to-bracket" />
                <span>تم الانضمام منذ 1 يناير</span>
              </span>
            </div>
             {/* Ender Images */}
          </div> 
          {/* One */}
          <div className="info col-5">
            <span className="name_Person">
              <h3>احمد محمد علي </h3>
            </span>
            <span className="more_data">
              <i className="fa-solid fa-location-dot" />
              <span>مدينة نصر</span>
            </span>
            <span className="more_data">
              <i className="fa-solid fa-network-wired" />
              <span>نقاش</span>
            </span>
            <span className="more_data">
              <i className="fa-solid fa-thumbs-up" />
              <span>12 <span>التوصيات</span></span>
            </span>
            <span className="descrabtion">
              <h3> الوصف المهني </h3>
              <p>
                انا المعلم افشه اقوم بتصبليح ودهان ابلشقق والشقف والابواب الخشب ودهان
                والموبليا وتجديد الشقق
                والبنايات
                القديمة ودهان المعجون وتركيب الجشيبس بورد وهكذا أمور بسيطه
              </p>
            </span>
          </div> {/* Two */}
          <div className="infopro col-3">
            <div className="timer">
              <a href="https://www.now-time.com/City1.html" className="_time_link" style={{fontSize: '28px'}}>توقيت
                القاهرة : </a>
              <span id="thetimenow" style={{fontSize: '28px'}} />
              <span className=".days" />
              <span className=".hours" />
              <span className=".minutes" />
              <span className=".seconds" />
            </div>
            <span className="titel"><i className="fa-solid fa-table-list" />
              0 الوظائف المكتملة </span><br />
          </div> 
          {/* Three*/}
        
      
           
      );
    }
  
  export default CardInfo