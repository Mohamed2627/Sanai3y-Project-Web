import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Pages/Dashboard";
import LoginPAge from "./Pages/login";
// import { IconName } from "react-icons/fa";
import Sidbar from "./component/sidbar/Sidbar";
import Garud from "./Pages/Garud"
import Setting from "./component/Setting/Setting";
import DropDwoin from "./component/Cardes/DropDwonList";
import AddNewAdmin from "./component/Setting/AddNewAdmin";
function App() {
  let token = localStorage.getItem("token");
  return (
    <>
  
    <Routes>
    <Route path="/" element={<LoginPAge />} />
    <Route path="/Dashboard" element={<Dashboard />}/>
   <Route path="/Setting" element={<Setting/>} />
    <Route path="*" element={< Dashboard/>} />
  </Routes>
  {/* <AddNewAdmin/> */}
  </>
  );
}

export default App;
