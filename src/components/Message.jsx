import React from "react";

const Message = ({msg}) => {
  return (
    <div >
      <div className={`chat ${msg.sender==="model" ? "chat-start" : "chat-end"}` }>
        <div className="chat-bubble max-w-[50vh]">
          {msg.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
