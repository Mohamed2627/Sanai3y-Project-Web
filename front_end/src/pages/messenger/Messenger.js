/* eslint-disable no-unused-vars */
import "./messenger.css";
import hi from "../../images/Chat/hi-robot.gif"
// import logo from '../../images/Chat/helmet.png'
// import Navpar from "../../component/navpar/Navpar";
import Conversation from "../../component/conversations/Conversation";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Message from "../../component/message/Message";
// import ChatOnline from "../../component/chatOnline/ChatOnline.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { getUserData } from "../../Redux/Slices/userReducer";
import { setRecieverId } from "../../Redux/Slices/userReducer";
import { io } from "socket.io-client";

export default function Messenger() {


    // useNavigate & useDispatch
    const navigate = useNavigate();
    const usedispatch = useDispatch();
    // console.log(location);

    // Conversations
    const [conversations, setConversations] = useState([]);
    // Current Chat
    const [currentChat, setCurrentChat] = useState(null);
    // current Reciever
    const [currentReciever, setCurrentReciever] = useState(null);
    // Messages
    const [messages, setMessages] = useState([]);
    // New Message (sent Message)
    const [newMessage, setNewMessage] = useState("");
    // The message image
    const [messageImage, setMessageImage] = useState(null)
    // The recieved Message
    const [recievedMessage, setRecievedMessage] = useState(null);
    // The socket
    const socket = useRef()
    // useRef
    const scrollRef = useRef();
    // The online users
    const [onlineUsers, setOnlineUsers] = useState([])
    // The current User
    const user = useSelector((state) => state.userReducer.userData);
    // console.log(user);

    // The params
    const recieverId = useParams().recieverId;
    // console.log(recieverId);

    // Setting socket current
    useEffect(() => {
        socket.current = (io("http://localhost:7000"));
    }, [socket])

    // console.log(socket.current);
    // Listening from srever
    useEffect(() => {
        socket.current.emit("addUser", user?._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers([...users])
            // console.log(users)


        })

        // Recieving the message
        socket.current.on("recieveMessage", ({ senderId, text }) => {
            // console.log("uuuuuuuuuuu")
            setRecievedMessage({
                conversationId: currentChat?._id,
                sender: senderId,
                text: text,
                createdAt: Date.now()
            });
        })

    }, [currentChat, recievedMessage, user])
    // console.log(onlineUsers)
    useEffect(() => {
        if (recievedMessage && currentChat?.members.includes(recievedMessage.sender)) {

            setMessages((prev) => [...prev, recievedMessage]);
        }
        // recievedMessage &&
        // currentChat?.members.includes(recievedMessage.sender) &&
        // setMessages((prev) => [...prev, recievedMessage]);

        // console.log("hgtfc")
    }, [currentChat, recievedMessage])

    // Getting the conversation of params if it is found
    useEffect(() => {
        if (recieverId) {
            usedispatch(setRecieverId(recieverId))
            console.log("oooooooo")
            console.log(conversations)

            const paramConversation = conversations?.find((conversation) => conversation.members.includes(recieverId));
            setCurrentChat(paramConversation);
            console.log(currentChat)
            console.log(paramConversation)
        }
    }, [conversations, currentChat, recieverId, usedispatch])


    // Fething current reciever
    useEffect(() => {
        const currentRecieverId = currentChat?.members.find((id) => id !== user?._id);
        const getCurrentReciever = async () => {
            try {
                const res = await axios.get("http://localhost:7000/client/users/" + currentRecieverId);
                setCurrentReciever(res.data.data)

            } catch (err) {
                console.log(err)
            }
        }

        getCurrentReciever();

    }, [currentChat, user]);

    // Fetching Conversation
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:7000/conversations/" + user?._id);
                // console.log(res.data.data);
                setConversations(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user]);


    // Fetching Messages
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:7000/messages/" + currentChat?._id);
                // console.log(res.data.data)
                setMessages(res.data.data)

            } catch (err) {
                console.log(err)
            }
        }
        getMessages();
    }, [currentChat])

    // On scrolling 
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Creating new message
    const enterKey = async (e) => {
        // console.log(e)
        // console.log(e.charCode)
        if (e.charCode === 13) {
            const message = {
                conversationId: currentChat?._id,
                sender: user?._id,
                text: newMessage
            };

            // Emitting event using socket
            socket.current.emit("sendMessage", {
                senderId: user?._id,
                recieverId: currentChat?.members.find((id) => id !== user?._id),
                // recieverId: currentReciever?._id,
                text: newMessage
            })

            // sending the request
            try {
                const res = await axios.post("http://localhost:7000/messages", message);
                // console.log(res.data.data);
                setMessages([...messages, res.data.data]);
                setNewMessage("");
            } catch (err) {
                console.log(err)
            }
        }
    }


    // Creating new message
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            conversationId: currentChat?._id,
            sender: user?._id,
            text: newMessage
        };

        // Emitting event using socket
        socket.current.emit("sendMessage", {
            senderId: user?._id,
            recieverId: currentChat?.members.find((id) => id !== user?._id),
            // recieverId: currentReciever?._id,
            text: newMessage
        })

        // sending the request
        try {
            const res = await axios.post("http://localhost:7000/messages", message);
            // console.log(res.data.data);
            setMessages([...messages, res.data.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err)
        }
    }

    console.log(user);
    return (
        <>
            {/* <Navpar /> */}
            {/* <div className="chats"> */}
            {/* <div className="container"> */}
            <div className="res-wid">
                {/* Start the Messages */}
                <div className="right-ch">
                    {currentChat && recieverId?
                        (<>
                            <div className="back-sec1">
                                <section className="sec1">
                                    <img src={currentReciever?.img} alt="currentReciever_Image" />

                                    <p>{`${currentReciever?.firstName} ${currentReciever?.lastName}`}</p>
                                </section>
                            </div>
                            {/* main left chat  */}
                            <section className="scrols messages">
                                <ul>
                                    {messages.map((message, index) => (
                                        <div ref={scrollRef} className="col-lg-12 col-md-12 col-sm-12">
                                            <Message own={message.sender === user?._id} key={index} message={message} sender={user} reciever={currentReciever} />
                                        </div>
                                    ))}
                                </ul>
                            </section>
                            {/* <form  className="sec3" action="http://localhost:7000/messages"  enctype="multipart/form-data" method="post"> */}
                            <section className="sec3">
                                <textarea className="col-lg-11 col-md-11 col-sm-11" onKeyPress={enterKey} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="اكتب رسالتك هنا....." ></textarea>
                                <div className="col-lg-1 col-md-1 col-sm-1">
                                    {/* <div>
                                        <label htmlFor="upload-files">
                                            <i
                                                className="fa fa-paperclip attachment"
                                                aria-hidden="true"
                                            ></i>
                                        </label>
                                        <input
                                                type="file"
                                                name="upload"
                                                placeholder="uplaod"
                                                id="upload-files"
                                                onChange={(event) => {
                                                    console.log(event.target.files);
                                                    setMessageImage(event.target.files[0]);
                                                }}
                                            />
                                    </div> */}
                                    <button type="submit" onClick={handleSubmit}>
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                </div>
                            </section>
                            {/* </form> */}
                        {/* </>) : (<span className="noConversation">ابدأ محادثة جديدة</span>) */}
                        </>) : (<img src={hi} alt="hello" className="noConversation"/>)
                    }
                </div>
                {/* End the Messages */}
                {/* Start Conversations */}
                <div className=" left-ch">
                    {/* <div className="search-chat"> */}
                        {/* <i className="fa-solid fa-search"></i> */}
                        {/* <input type="search" placeholder="ابحث هنا" /> */}
                    {/* </div> */}
                    <div className="scrols messages">
                        {conversations.map((conversation, index) => (
                            <div key={index} onClick={() => { navigate(`/chat/${conversation?.members.find((id) => id !== user?._id)}`) ;setCurrentChat(conversation) }}>
                                <Conversation conversation={conversation} currentUser={user} onlineUsers={onlineUsers} />
                            </div>
                        ))}

                    </div>
                </div>
                {/* End Conversations */}
            </div>
            {/* </div> */}
            {/* </div> */}
        </>
    );
}
