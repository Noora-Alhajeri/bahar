// localStorage.js

export const getChatHistoryFromLocalStorage = () => {
    const storedChatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    console.log("Stored Chat History:", storedChatHistory);
    return storedChatHistory;
  };

  export const setChatHistoryToLocalStorage = (chatHistory) => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };
