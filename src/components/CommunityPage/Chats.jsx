import React from 'react'

function Chats() {
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