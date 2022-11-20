/* eslint-disable no-unused-vars */
import axios from "axios";
import "../../pages/messenger/messenger.css";
import logo from "../../images/Chat/helmet.png"
import { useEffect, useState } from "react";
// import "./conversation.css";

export default function Conversation({ conversation, currentUser, onlineUsers }) {

    const [reciever, setReciever] = useState(null);
    // const [isOnline, setIsOnline] = useState(false);
    // console.log(onlineUsers);

    useEffect(()=> {
        const recieverId = conversation?.members.find((id)=> id !== currentUser?._id);

        const getRecieverById = async () => {
            try {
                const res = await axios.get("http://localhost:7000/client/users/"+recieverId);
                // console.log(res.data.data)
                setReciever(res.data.data)
                // setReciever({...res.data.data, isOnline: false})
            }catch(err) {
                console.log(err)
            }
            
        }
        getRecieverById();
    }, [conversation, currentUser])
    // console.log(onlineUsers[1].userId)
    // console.log(reciever._id)
    // console.log(onlineUsers[0]?.userId === reciever?._id)
    // for (let onlineUser of onlineUsers) {
    //     if (onlineUser.userId === reciever?._id) {
    //         setIsOnline(true);
    //     }
    //     else {
    //         setIsOnline(false);
    //     }
    // }

    return (
        <>
            <div className="hover">
                <img src={reciever?.img} alt="reciever_photo" />
                <h3>{`${reciever?.firstName} ${reciever?.lastName}`}</h3>
                {/* <p>السلام عليكم.....</p> */}
                {/* <span className="chatOnline"></span> */}
            </div>
            {/* <div className=" left-ch">
                <div className="search-chat">
                    <i className="fa-solid fa-search"></i>
                    <input type="search" placeholder="ابحث هنا" />
                </div>
                <div className="scrols messages">
                    <div>
                        <img src={logo} alt="" />
                        <h3>على احمد </h3>
                        <p>السلام عليكم.....</p>
                        <div className="chatOnline"></div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
