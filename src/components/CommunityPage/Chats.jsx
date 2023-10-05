import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./CommunityPage.css";
import ChatContext from "../../context/ChatContext";
function Chats() {
  const [userMsg, setUserMsg] = useState("");
  const { authToken } = useContext(AuthContext);
  const {room_name} = useContext(ChatContext)
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    const newChat = new WebSocket(`ws://${window.location.hos}/ws/api/${room_name}/`);
    
    newChat.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };

    newChat.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // Handle incoming messages, e.g., update the state to display them
      setCurrentMessages((prevMessages) => [...prevMessages, data.message]);
    };

    newChat.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Handle WebSocket error, e.g., display an error message to the user
    };

    newChat.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      // Handle WebSocket closure, e.g., attempt to reconnect if needed
    };

    // Store the WebSocket instance in state
    setChat(newChat);

    // Clean up the WebSocket when the component unmounts
    return () => {
      if (newChat && newChat.readyState === WebSocket.OPEN) {
        newChat.close();
      }
    };
  }, [room_name]);
  const handleMessageSend = () => {
    if (chat && chat.readyState === WebSocket.OPEN) {
      chat.send(userMsg);
      // Optionally, clear the input field or update the UI
      setUserMsg("");
    }
  }
  // const getMessage = async () => {
  //   let response = await fetch(`${process.env.REACT_CHATAPP_API}getMessages/`, {
  //     method:"GET",
  //     headers:{
  //       'Authorization':`Bearer ${authToken.refresh}`,
  //     }
  //   })
  //   let ddata = await response.json()
  //   console.log(ddata);
  //   setAllMessages(ddata)
  // }

  
  return (
    <div className="main-chat-box font-Inter">
      <div className="my-2 mx-4 flex flex-col h-[300px]  bg-[#0B222C] rounded-[20px] px-6 py-2 text-white">
        <div className="chats flex-grow pt-4">Chat data here</div>
        <div className="msg-inputbox">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <input
                type="text"
                className="text-white bg-[#0F2A36] h-[36px] w-full px-2 my-2 rounded-[8px] text-md message-input"
                placeholder="Message.."
                onChange={(e) => {
                  setUserMsg(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                onClick={handleMessageSend}
                className="text-white bg-green-600 hover:bg-green-700 px-2 mx-2 h-[36px] rounded-[10px]"
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;