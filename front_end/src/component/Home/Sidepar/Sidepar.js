import "./Sidepar.css";

function Sidepar(props) {

  function fliter(type)
  {
    props.press(type);
  }
  return (
    <div className="twoSlid">
      <div className="categories">
        <ul className="c_one">
          <h4>الاقسام</h4>
          <li onClick={()=>fliter("سباك")}>
            <i className="fa-brands fa-pied-piper"></i>
             سباكة
          </li>
          <li onClick={()=>fliter("نجار")}>
            <i className="fa-solid fa-rug"></i>
            نجارة
          </li>
          <li onClick={()=>fliter("دهانات")}>
            <i className="fa-solid fa-paint-roller"></i>
            دهانات
          </li>
          <li onClick={()=>fliter("كهربائي")}>
            <i className="fa-solid fa-bolt"></i>
            كهرباء
          </li>
          <li onClick={()=>fliter("بناء")}>
            <i className="fa-solid fa-building"></i>
            بناء
          </li>
          <li onClick={()=>fliter("فني ارضيات")}>
            <i className="fa-solid fa-house-flood-water"></i>
            ارضيات
          </li>
          <li onClick={()=>fliter("مبيض محارة")}>
            <i className="fa-solid fa-chalkboard"></i>
            مبيض محارة
          </li>
          <li onClick={()=>fliter("فني تكييف")}>
            <i className="fa-solid fa-fan"></i>
            تكيف
          </li>
          <li onClick={()=>fliter("الوميتال")}>
            <i className="fa-solid fa-home"></i>
           الوميتال
          </li>   
          
        </ul>

      
        {/* start Search With Location */}
        <ul className="c_three">
          <h4>تحديد مكان العمل</h4>
          <li onClick={()=>{props.press2('أسوان')}}>
            <input
              type="radio"
              id="one"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="one">أسوان</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('أسوان الجديدة')}}>
            <input
              type="radio"
              id="two"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="two">أسوان الجديدة</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('أبو سمبل')}}>
            <input
              type="radio"
              id="three"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="three">أبو سمبل</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('دراو')}}>
            <input
              type="radio"
              id="four"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="four">دراو</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('كوم امبو')}}>
            <input
              type="radio"
              id="five"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="five">كوم أمبو</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('نصر النوبة')}}>
            <input
              type="radio"
              id="six"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="six">نصر النوبة</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('كلابشة')}}>
            <input
              type="radio"
              id="seven"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="seven">كلابشة</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
          <li onClick={()=>{props.press2('أدفو')}}>
            <input
              type="radio"
              id="eight"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="eight">إدفو</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidepar;
