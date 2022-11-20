import Sidepar from "../component/Home/Sidepar/Sidepar";
import Posts from "../component/Home/Posts/posts";
import HeaderHome from "../component/Home/Header/Headerhome";
import axios from "axios";
import { useState, useEffect } from "react";
import Notfind from "../component/notfind/Notfind";
import Loader from "../component/Loader/Loader";
import { useParams } from 'react-router-dom';
function Home() {


const paramId = useParams().jobId
const [navigatedJob, setNavigatedJob] =useState([])

// Fetching the navigated password
useEffect(() => {
  const getNavigatedJob = async () => {
    const res = await axios.get(`http://localhost:7000/jobs/job/${paramId}`);
    // console.log("fffffffffffff")
    console.log(res.data)
    setNavigatedJob([res.data.data])
  }
  getNavigatedJob();
}, [paramId])


// console.log(paramId)
console.log(navigatedJob)
  /////////////////////////////////////

  const [data, setData] = useState([]);
  const [alldata, setAll] = useState([])
  const [loader, setLoader] = useState(true)
  const [flag, setFlag] = useState(false);
  console.log(data)
  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get("http://localhost:7000/jobs/all").then(
      (result) => {
        let res = result.data.data;
        // console.log(res.data)
        res = res.filter((item)=> item.status != "in progress" && item.status != "compelete")
        setTimeout(() => {
          setLoader(false)
          setAll([...res]);
          setData([...res])

        }, 1000)
      }
    )
    return () => {
      // Side-effect cleanup...

      setLoader(true)
    };

  }, []);

  function fliterCategory(type) {

    var arrr = alldata.filter((item) => item.category == type)
    setData([...arrr]);
    setFlag(true);
  }
  function fliterAddress(add) {
    if (flag) {
      var arrr = data.filter((item) => item.city == add)
      setData([...arrr]);
    }
    else {
      var arrr = alldata.filter((item) => item.city == add)
      setData([...arrr]);
    }

  }


  function search(type) {
    let arr = alldata.filter((item) => {
      return item.description.includes(type) || item.title.includes(type) || item.category.includes(type) ||
        item.city.includes(type)
    }
    )
    setData([...arr])
  }

  useEffect(() => { }, [data])


  return (
    <>
      {/* {console.log(data)} */}
      {!loader && <HeaderHome data={search} />}

      <div className="container">

        <div className="row">
          <div className="col-md-3">
            {!loader && <Sidepar press={fliterCategory} press2={fliterAddress} />}
          </div>

          <div className="col-md-9 twoBody">
            {!loader && data.length > 0 && <Posts datas={paramId? navigatedJob: data} />}
            {!loader && data.length == 0 &&
              <div>
                <Notfind data={"لايوجد طلبات مقدمة حاليا"} />
              </div>}
          </div>
        </div>


        <div className="row">

          {/* <Customers /> */}
        </div>


      </div>


      {loader && <Loader />}
    </>
  );
}

export default Home;
