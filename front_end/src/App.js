import "./App.css";

import Landing from "./pages/Landing";
import Navpar from "./component/navpar/Navpar";
import Footer from "./component/footer/Footer";
import Register from "./component/Account/Register/Register";
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import AuthGuard from "./component/Guard/AuthGuard";
import Login from "./component/Account/Login/Login";
import Home from "./pages/Home";
import Totop from "./component/Totop/Totop";
import React, { useEffect, useState, useRef } from 'react';
import Snai3yCardPage from "./pages/Snai3yCardPage";
import Addjops from "./component/AddJops/Addjops";
import AddjopsIcon_fixed from "./component/AddJops/AddjopsIcon_fixed";
import BusinesFaire from "./component/ProfileSnai3y/BusnisFaire/BusinesFaire";
import TalpatSnai3y from "./component/ProfileSnai3y/Talpat/TalpatSnai3y";
import ProfileSnai3y from "./pages/ProfileSnai3y";
import ProfilesClients from "./pages/ProfilesClients";
import { getDataClient } from "./Redux/Slices/ClientReducer";
import { getSnai3y } from "./Redux/Slices/Snai3yReducer";
import Showprofile from "./component/UserShowProfile/ShowProfile";
import ShowClientProfile from "./component/UserShowProfile/ShowClientProfile";
import Notfound from "./component/notfound/Notfound";
import Loader from "./component/Loader/Loader";
import Terms from "./component/Terms/Terms";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { io } from "socket.io-client";
import { getUserData } from './Redux/Slices/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Messenger from './pages/messenger/Messenger';



function App() {


  // The socket
  const [socket, setSocket] = useState(null)

  // The current User
  const currentUser = useSelector((state) => state.userReducer.userData);

  // // Setting socket current
  // useEffect(() => {
  //     socket.current = (io("http://localhost:7000"));
  // }, [socket])

  useEffect(() => {
    setSocket(io("http://localhost:7000", {
      transport: ['websocket', 'polling', 'flashsocket'],
      // withCredentials: true 
    }))
  }, [])

  useEffect(() => {
    socket?.emit("addUser", currentUser?._id);
    socket?.on("getUsers", (users) => {
      // setOnlineUsers([...users])
      // console.log(users)

    })
  }, [currentUser, socket])



  /////////////////////////////////////////////////
  let [scroll, setScroll] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    // Get Client By Id
    dispatch(getDataClient());
    dispatch(getSnai3y());
    dispatch(getUserData())
  }, [dispatch]);

  let location = useLocation();
  const recieverId = useSelector((state) => state.userReducer.recieverId)
  // console.log(recieverId)
  // console.log(location)



  return (
    <>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <Navpar socket={socket} />
        <AddjopsIcon_fixed />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/index" element={<Landing />} />

          <Route
            path="/profileS"
            element={
              <AuthGuard>
                <ProfileSnai3y />
              </AuthGuard>
            }
          >
            <Route index element={<BusinesFaire />} />
            <Route path="one" element={<BusinesFaire />} />
            <Route path="two" element={<TalpatSnai3y />} />
          </Route>

          <Route
            path="/profileC/"
            element={
              <AuthGuard>
                <ProfilesClients />
              </AuthGuard>
            }
          >
            <Route path=':jobId' element={<AuthGuard><ProfilesClients /></AuthGuard>} />
          </Route>
          <Route path='/home/' element={<AuthGuard><Home /></AuthGuard>}>

            <Route path=':jobId' element={<AuthGuard><Home /></AuthGuard>} />
          </Route>

          <Route path='/chat/' element={<AuthGuard><Messenger /></AuthGuard>}>

            <Route path=':recieverId' element={<AuthGuard><Messenger /></AuthGuard>} />
          </Route>
          <Route
            path="/showprofile/:data"
            element={
              <AuthGuard>
                <Showprofile />
              </AuthGuard>
            }
          />
          <Route
            path="/showprofileC/:data"
            element={
              <AuthGuard>
                <ShowClientProfile />
              </AuthGuard>
            }
          />
          <Route path="/allsnai3y" element={<Snai3yCardPage />} />
          <Route path="/addjops" element={<Addjops socket={socket} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/regiser" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
        {scroll > 400 && <Totop />}
        {location.pathname != "/chat" && location.pathname != `/chat/${recieverId}` && <Footer />}
      </PayPalScriptProvider>
    </>
  );
}

export default App;
