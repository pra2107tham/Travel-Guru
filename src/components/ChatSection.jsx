import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import axios from "axios";

const ChatSection = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return; // Avoid empty submissions

    try {
      setLoading(true);
      const response = await axios.post("/api/home/getAnswer", {input});
      console.log(response.data);

      // Update state with the new message and AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", message: input },
        { sender: "model", message: response.data.aiResponse },
      ]);
      setInput(""); // Clear input field
    } catch (error) {
      console.error("Error getting answer: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/home/");
        console.log(response.data);
        setMessages(response.data.messages);
      } catch (error) {
        console.log("Error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div id="chat-section" className="bg-black flex-grow p-4 overflow-y-auto">
      <div className="bg-zinc-950 hover:bg-zinc rounded-lg shadow-lg p-4 flex flex-col flex-grow h-full">
        {/* Messages */}
        <div id="messages" className="flex-grow overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
              <Message msg={msg} />
            </div>
          ))}
          {loading && (
            <div className="text-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12c0 5.523 4.477 10 10 10v-4a6 6 0 100-12V0c-6.627 0-12 5.373-12 12h2z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        {/* Input Box */}
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Plan your first trip with us! 🚀"
                value={input}
                onChange={handleChange}
                disabled={loading} // Disable input while loading
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
