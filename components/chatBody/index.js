// Importing necessary modules and components
import React, { useState } from 'react';
import { EarthIcon, SendIcon } from '../icons';
import { MessageItems } from '../MessageItems';
import { useGlobalContext } from '@/context/globalProvider';
import { LeftArrow } from '@/app/icons/svg-icons';

// ChatBody component
export const ChatBody = ({
  activeChat,
  setActiveChat,
  activeChatMobile,
  setActiveChatMobile,
}) => {
  // Destructuring properties from the global context
  const { lang, changeLang, dictionaries, direction, chatRoom, setChatRoom } = useGlobalContext();

  // State for managing message input and displayed messages
  const [messageValue, setMessageValue] = useState('');
  const [allMessageData, setAllMessageData] = useState(chatRoom?.[0]?.messages || []);
  const [activeChatId, setActiveChatId] = useState(chatRoom?.[0]?.id);

  // Finding the active chat room based on ID
  const activeChatRoom = chatRoom?.find((item) => item?.id === activeChatId);

  // Handling language change
  const handleLanguageChange = () => {
    if (lang === 'en') {
      changeLang('ar');
    } else if (lang === 'ar') {
      changeLang('en');
    }
  };

  // Handling sending a chat message
  const sendChatHandler = async (Message) => {
    try {
      const dateToday = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
      });
      const timeNow = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      // Updating the displayed messages with the new message
      setAllMessageData([
        ...allMessageData,
        {
          sender: 'self',
          text: Message,
          date: dateToday,
          time: timeNow,
        },
        {
          sender: 'bahar',
          text: "Hello! I'm doing well, thank you for asking.  Bahar means ocean in Arabic. I'm your innovative AI companion powered by JAIS. Together, we're here to dive deep into the sea of knowledge",
          date: dateToday,
          time: timeNow,
        },
      ]);

      // Clearing the message input
      setMessageValue('');
    } catch (error) {
      console.log('error', error);
    }
  };

  // JSX structure for the ChatBody component
  return (
    <div className='px-10 pt-10 w-full flex flex-col justify-between max-h-screen'>
      <>
        <div className='flex items-center justify-between pb-3'>
          {/* For Desktop  */}
          <div onClick={() => setActiveChat(!activeChat)} className='hidden xl:block'>
            <LeftArrow
              className={`text-themePrimaryLight dark:text-white cursor-pointer hover:opacity-60 transition duration-300 ease-in-out  ${
                activeChat ? '' : 'rotate-180'
              }`}
            />
          </div>
          {/* For Mobile  */}
          <div onClick={() => setActiveChatMobile(!activeChatMobile)} className=' block xl:hidden'>
            <LeftArrow
              className={`text-themePrimaryLight dark:text-white cursor-pointer hover:opacity-60 transition duration-300 ease-in-out ${
                activeChatMobile ? '' : 'rotate-180'
              }`}
            />
          </div>
          <button onClick={handleLanguageChange} className='flex items-center justify-end gap-3'>
            <EarthIcon className='text-themeNonary dark:text-white' />
            <h4 className='text-2xl	text-themeNonary dark:text-white font-normal uppercase'>
              {lang}
            </h4>
          </button>
        </div>
        {/* Chat display body  */}
        <MessageItems allMessage={allMessageData} />
      </>
      <div className='mt-auto bg-transparent'>
        {/* Chat input  */}
        <div className='mt-7 flex items-center relative'>
          <input
            type='text'
            placeholder={dictionaries?.chat?.buttonPlaceholder}
            className='px-6 py-5 input w-full focus:outline-none placeholder:text-xl placeholder:font-bold placeholder:text-themeSecondaryLight border-2 rounded-xl border-themePrimaryLight'
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendChatHandler(messageValue);
              }
            }}
          />
          <button
            onClick={() => sendChatHandler(messageValue)}
            className={`${
              direction === 'rtl' ? ' left-4' : 'right-4'
            } absolute inset-y-0`}>
            <SendIcon className={`${direction === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      {/* Footer message */}
      <p className='text-[17px] font-normal text-themePrimary dark:text-white text-center py-8'>
        Powered by <span className='font-bold'>JAIS</span>
      </p>
    </div>
  );
};

// Example message data
const allMessageData2 = [
  {
    sender: 'self',
    text: 'Hello! How are you? What does "BAHAR" mean?',
  },
  {
    sender: 'bahar',
    text: "Hello! I'm doing well, thank you for asking.  Bahar means ocean in Arabic. I'm your innovative AI companion powered by JAIS. Together, we're here to dive deep into the sea of knowledge, providing you with a fluid conversational experience. How can I assist you today? 🌊💬",
  },
  {
    sender: 'self',
    text: "Hey! I've heard a lot about your capabilities. What makes JAIS stand out in the world of AI-powered language models?",
  },
  {
    sender: 'bahar',
    text: 'JAIS is more than just an AI language model; it represents the pinnacle of innovation in the realm of Arabic natural language processing. It leverages cutting-edge deep learning techniques to understand and generate human-like text, with a particular emphasis on the nuances and complexities of the Arabic language.',
  },
];
