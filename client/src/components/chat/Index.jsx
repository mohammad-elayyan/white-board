import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chat";

const Index = ({ setOpenedChatTap, socket }) => {
  const [message, setMessage] = useState("");
  const { chat, setChat } = useContext(ChatContext);

  useEffect(() => {
    // Listen for new messages from the server
    const handleMessageResponse = (data) => {
      setChat((prevChat) => {
        // Prevent duplicate messages
        if (!prevChat.some((msg) => msg.id === data.id)) {
          return [...prevChat, data];
        }
        return prevChat;
      });
    };

    socket.on("messageResponse", handleMessageResponse);

    // Cleanup the socket listener on unmount
    return () => {
      socket.off("messageResponse", handleMessageResponse);
    };
  }, [socket, setChat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messageId = Date.now(); // Unique ID for the message
      const newMessage = { id: messageId, message, name: "You" };

      // Send the message to the server
      socket.emit("message", newMessage);

      // Optimistically update the chat
      setChat((prevChat) => [...prevChat, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="col-md-4 position-fixed top-0 start-0 h-100 text-secondary bg-dark w-25 overflow-y-auto">
      <button
        className="btn btn-light w-100 my-4"
        onClick={() => setOpenedChatTap(false)}
      >
        Close
      </button>
      <div className="w-100 h-75 mt-5 p-2 border border-1 border-white rounded-3 overflow-auto bg-body-tertiary">
        {chat?.map((msg) => (
          <p
            key={msg.id}
            className="fw-bold my-2 w-100 text-center"
            style={{
              borderRadius: "6px",
              padding: "6px 0px",
              border: "1px solid #ccc",
              color: "#4e47ff",
              fontSize: "1.08rem",
              background:
                "linear-gradient(90deg,rgba(0, 100, 148, 0.1) 0%,rgba(36, 123, 160, 0.05) 100%)",
              boxShadow:
                "44.833px -44.833px 44.833px 0px rgba(14, 85, 117, 0.1) inset,-44.833px 44.833px 44.833px 0px rgba(255, 255, 255, 0.1) inset",
              backdropFilter: "blur(44.83333206176758px)",
            }}
          >
            {msg.name}: {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-100 mt-4 d-flex rounded-3">
        <input
          type="text"
          className="form-control h-100 border-0 rounded-0 py-2 px-4"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn btn-primary w-25 h-100 rounded-0 border-0"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Index;
