import React, { useEffect , useState } from "react";
import Image from "next/image";
import { EditIcon } from "../icons";

export const MessageItems = ({ allMessage }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
    // State to store the fetched messages
    const [messages, setMessages] = useState([]);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch("/api/messages");
       const data = await response.json();
       setMessages(data);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

   fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditedText(text);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedText('');
  };

  const handleEdit = (index) => {
    // Implement the logic to handle the edited message
    // You can use a function passed from the parent component to update the state
    // e.g., handleEditMessage(index, editedText);
    // After handling the edit, you can cancel the editing state
    cancelEditing();
  };

  return (
    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-thumb min-h-[calc(100vh-15rem)]">
           {/* Display messages from the fetched data */}
      {allMessage?.map((singleMessage, index) => {
        return (
          <div key={index}>
            {/* self-message  */}
            {singleMessage?.sender === 'self' && (
              <div className='flex justify-end'>
                <div className='flex flex-col gap-2'>
                  <div className='pl-5'>
                    <p className='text-sm	 text-[#A7A7A7] font-semibold'>
                      You
                      <span className='ml-2 font-normal text-[10px] '>
                        {singleMessage?.date} ▪ {singleMessage?.time}
                      </span>
                    </p>
                  </div>
                  <div className='w-fit'>
                    <div className='py-5 pl-10 pr-7 bg-[#46BFAD] dark:bg-black/40 text-white rounded-[20px] flex items-center justify-between drop-shadow-lg '>
                      {editingIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="w-full md:min-w-[721px] text-base"
                          />
                          <button onClick={() => handleEdit(index)}>Save</button>
                          <button onClick={cancelEditing}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <p className='w-full md:min-w-[721px] text-base'>
                            {singleMessage?.text}
                          </p>
                          <button onClick={() => startEditing(index, singleMessage?.text)}>
                            <EditIcon />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* bahar-message  */}
            {singleMessage?.sender === 'bahar' && (
              <div className='flex items-center justify-start gap-4'>
                <div className='relative'>
                  <div className='absolute -top-1 left-0'>
                    <Image
                      src='/images/logo.png'
                      width={58}
                      height={60}
                      alt='logo'
                    />
                  </div>
                  <div className='pl-16'>
                    <p className='text-xl	text-themeTertiary dark:text-white font-bold text-base-content/60'>
                      Bahar
                      <span className='ml-2 font-normal text-[10px] text-[#A7A7A7]'>
                        {singleMessage?.date} ▪ {singleMessage?.time}
                      </span>
                    </p>
                  </div>
                  <div className='bg-[#F4FFFD] dark:bg-black/20 border border-[#D7D7D7] dark:border-gray dark:border-gray-200/20 rounded-[20px] p-10  '>
                    <p className='text-base font-normal leading-8	 text-black dark:text-white w-full md:max-w-[721px]  md:min-w-[721px]'>
                      {singleMessage?.text}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
