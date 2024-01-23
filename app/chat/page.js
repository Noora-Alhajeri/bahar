"use client";
// Importing necessary modules and components
import React from "react";
import { ChatBody } from "@/components/chatBody";
import { Sidebar } from "@/components/sidebar";
import { useGlobalContext } from "@/context/globalProvider";

// Chat component
export default function Chat() {
  // State for managing the visibility of the chat and chat mobile
  const [activeChat, setActiveChat] = React.useState(true);
  const [activeChatMobile, setActiveChatMobile] = React.useState(false);

  // Destructuring properties from the global context
  const { dictionaries, direction } = useGlobalContext();

  // JSX structure for the Chat component
  return (
    <>
      <div className='flex flex-col xl:flex-row min-h-screen'>
        <Sidebar
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          activeChatMobile={activeChatMobile}
          setActiveChatMobile={setActiveChatMobile}
          dictionaries={dictionaries}
          direction={direction}
        />
        <section className='grow bg-white dark:bg-darkModeColor min-h-screen transition duration-500 ease-in-out'>
          <ChatBody
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            activeChatMobile={activeChatMobile}
            setActiveChatMobile={setActiveChatMobile}
          />
        </section>
      </div>

      {/* Overlay */}
      <div
        className={`xl:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  h-full w-full backdrop-blur-sm ${
          activeChatMobile ? 'left-0' : '-left-full'
        }`}
        onClick={() => setActiveChatMobile(false)}
      />
    </>
  );
}

