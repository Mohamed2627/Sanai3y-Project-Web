import "./Snai3ySidepar.css";

function Snai3ySidepar(props) {
  return (
    <div className="twoSlidS">
      <div className="categories">
        <ul className="c_one">
          <h4>الاقسام</h4>
          <li onClick={()=>props.filter1("سباك")}>
            <i className="fa-brands fa-pied-piper"></i>
            سباكة
          </li>

          <li onClick={()=>props.filter1("نجار")}>
            <i className="fa-solid fa-rug"></i>
            نجارة
          </li>

          <li onClick={()=>props.filter1("دهانات")}>
            <i className="fa-solid fa-paint-roller"></i>
            دهانات
          </li>

          <li onClick={()=>props.filter1("كهربائي")}>
            <i className="fa-solid fa-bolt"></i>
            كهرباء
          </li>

          <li onClick={()=>props.filter1("بناء")}>
            <i className="fa-solid fa-building"></i>
            بناء
          </li>

          <li onClick={()=>props.filter1("فني ارضيات")}>
            <i className="fa-solid fa-house-flood-water"></i>
            ارضيات
          </li>

          <li onClick={()=>props.filter1("مبيض محارة")}>
            <i className="fa-solid fa-chalkboard"></i>
            تبيض
          </li>

          <li onClick={()=>props.filter1("فني تكييف")}>
            <i className="fa-solid fa-fan"></i>
            تكيف
          </li>

          <li onClick={()=>props.filter1("الوميتال")}>
            <i className="fa-solid fa-fan"></i>
            الوميتال
          </li>
         
        </ul>


        {/* #region  */}



        {/* <ul className="c_two">
          <h4>مستوي العميل </h4>
          <li>
            <input
              type="checkbox"
              id="trusted_client"
              name="trusted_client"
              value="trusted_client"
            />
            <label htmlFor="trusted_client">عميل موثوق</label>
            <br />
          </li>
          <li>
            <input
              type="checkbox"
              id="active_client"
              name="active_client"
              value="active_client"
            />
            <label htmlFor="active_client">عميل نشط</label>
            <br />
          </li>
          <li>
            <input
              type="checkbox"
              id="new_customer"
              name="new_customer"
              value="new_customer"
            />
            <label htmlFor="new_customer">عميل جديد</label>
            <br />
          </li>
        </ul> */}


        {/* <ul className="c_three">
          <h4>حاله البائع </h4>
          <li>
            <input
              type="checkbox"
              id="online_now"
              name="online_now"
              value="online_now"
            />
            <label htmlFor="online_now">متواجد حاليآ</label>
            <br />
          </li>
          <li>
            <input
              type="checkbox"
              id="trusted_identity"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="trusted_identity">هوية موثوقة</label>
            <br />
          </li>
        </ul> */}
      {/* #endregion */}
        
        
        <ul className="c_three">
          <h4>تحديد مكان العمل</h4>
          <li onClick={()=> props.filter2("أسوان")}>
            <input
              type="radio"
              id="one"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="one">أسوان</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("أسوان الجديدة")}>
            <input
              type="radio"
              id="two"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="two">أسوان الجديدة</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("أبو سمبل")}>
            <input
              type="radio"
              id="three"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="three">أبو سمبل</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("دراو")}>
            <input
              type="radio"
              id="four"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="four">دراو</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("كوم امبو")}>
            <input
              type="radio"
              id="five"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="five">كوم أمبو</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("نصر النوبة")}>
            <input
              type="radio"
              id="six"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="six">نصر النوبة</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("كلابشة")}>
            <input
              type="radio"
              id="seven"
              name="trusted_identity"
              value="trusted_identity"
            />
            <label htmlFor="seven">كلابشة</label>
            <i className="fa-solid fa-location-dot"></i>
          </li>

          <li onClick={()=> props.filter2("أدفو")}>
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

export default Snai3ySidepar;
