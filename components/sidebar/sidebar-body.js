import { DeleteIcon, PlusIcon, SidebarIcon } from "@/app/icons/svg-icons";
import React, { useState, useEffect } from "react";
import { Toggle } from "../toggle";
// Import the local storage utility functions
import { getChatHistoryFromLocalStorage, setChatHistoryToLocalStorage } from '../utils/localStorage';

export const SidebarBody = ({ activeChat, setActiveChat, dictionaries }) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const storedChatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(storedChatHistory);
  }, []);



  const handleNewChat = () => {
    const newChat = {
      content: `Chat with ${new Date().getTime()}`,
      messages: [], // Start with an empty array
    };

    setChatHistory((prevChatHistory) => [...prevChatHistory, newChat]);
    setChatHistoryToLocalStorage([...chatHistory, newChat]);
    setActiveChat(newChat);
  };



  // Helper function to extract the first two words from a message as the chat name
  const getChatNameFromMessage = (message) => {
    if (!message) {
      return "Untitled Chat";
    }

    const words = message.split(' ');
    const title = words.length >= 2 ? words.slice(0, 2).join(' ') : message;
    return title;
  };



  const handleDeleteChat = (index) => {
    const updatedChatHistory = [...chatHistory];
    updatedChatHistory.splice(index, 1);
    // Update chat history and save to local storage
    setChatHistory(updatedChatHistory);
    setChatHistoryToLocalStorage(updatedChatHistory);
  };

  useEffect(() => {
    // Fetch chat history from local storage on component mount
    const storedChatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    console.log("Stored Chat History:", storedChatHistory);

    setChatHistory(storedChatHistory);
  }, []);

  const handleOpenChat = (chat) => {
    setActiveChat(chat);
  };



  return (
    <>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-1">
        <h4 className="text-xl font-bold text-themeSecondary">
          {dictionaries?.chat?.sidebarTitle}
        </h4>
        <div className="flex items-center gap-4">
          <PlusIcon
            onClick={handleNewChat}
            className="cursor-pointer transition ease-in-out duration-300 hover:opacity-60"
          />
          <SidebarIcon
            onClick={() => setActiveChat(!activeChat)}
            className="cursor-pointer transition ease-in-out duration-300 hover:opacity-60"
          />
        </div>
      </div>


      {/* Chat History */}
      <div className="pt-10 pb-8 h-full flex flex-col gap-1">
      <div className="grow h-auto overflow-y-scroll scrollbar-thumb">
      {chatHistory.map((chat, index) => (
  <div key={index} className="flex items-center gap-4 transition ease-in-out duration-300 first:bg-themeQuinary/60 hover:bg-themeQuinary/60 rounded-2xl px-3.5 py-2.5">
    <div onClick={() => handleOpenChat(chat)}>
      {/* Display chat details here */}
    </div>
    <DeleteIcon
      onClick={() => handleDeleteChat(index)}
      className="cursor-pointer text-themeSecondary hover:text-red-400 transition ease-in-out duration-300"
    />
    <p className="text-xl font-normal text-themeSecondary capitalize">
      {getChatNameFromMessage(chat?.messages[0]?.content) || "Untitled Chat"}
    </p>
  </div>
))}



        </div>
        {/* Dark Toggle */}
        <Toggle />
      </div>
    </>
  );
};