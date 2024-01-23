import { SidebarBody } from './sidebar-body';
import { Fragment } from 'react';


const fetchData = () => {
   try {
     // Fetch chat history from local storage
     const storedChatHistory = getChatHistoryFromLocalStorage();
     console.log('Stored Chat History:', storedChatHistory);
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 };

export const Sidebar = ({
   activeChat,
   setActiveChat,
   activeChatMobile,
   setActiveChatMobile,
   dictionaries,
   direction,
}) => {
   const translate =
      direction === 'rtl' ? 'translate-x-96 w-0' : '-translate-x-96 w-0';
   return (
      <Fragment>
         {/* For Desktop View */}
         <section
            className={`hidden xl:block bg-themeSenary dark:bg-darkModeColor py-10 max-h-screen transition duration-500 ease-in-out ${
               activeChat
                  ? '-translate-x-px max-w-[359px] w-full px-5'
                  : translate
            }`}>
            <SidebarBody
               activeChat={activeChat}
               setActiveChat={setActiveChat}
               dictionaries={dictionaries}
            />
         </section>

         {/* For Responsive View */}
         <section
            className={`z-40 flex xl:hidden p-8 top-0 flex-col h-screen max-w-[359px] w-full fixed bg-themeSenary dark:bg-darkModeColor duration-500 ease-in  gap-2 md:gap-0 shadow-xl  ${
               activeChatMobile ? 'left-0' : '-left-full'
            }`}>
            <SidebarBody
               activeChat={activeChatMobile}
               setActiveChat={setActiveChatMobile}
               dictionaries={dictionaries}
            />
         </section>
      </Fragment>
   );
};

const demoData = [
   {
      content: 'Hello',
   },
   {
      content: 'New Chat',
   },
   {
      content: 'UAE Insights',
   },
   {
      content: 'JAIS Journeys',
   },
];



