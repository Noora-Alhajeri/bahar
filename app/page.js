"use client";

import Link from "next/link";
import Image from "next/image";
import { SubmitSVG } from "./icons/svg-icons";
import { useState } from "react";
import { useGlobalContext } from "@/context/globalProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { chatRoom, setChatRoom } = useGlobalContext();
  const [messageValue, setMessageValue] = useState("");

  //=========start chat handler=======
  const startChatHandler = async (Message) => {
    const dateToday = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    const timeNow = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    try {
      setChatRoom([
        ...chatRoom,
        {
          title: "newChat",
          id: chatRoom?.length + 1,
          messages: [
            {
              sender: "self",
              text: Message,
              date: dateToday,
              time: timeNow,
            },
            {
              sender: "bahar",
              text: "Hello! I'm doing well, thank you for asking.  Bahar means ocean in Arabic. I'm your innovative AI companion powered by JAIS. Together, we're here to dive deep into the sea of knowledge",
              date: dateToday,
              time: timeNow,
            },
          ],
        },
      ]);
      router.push("/chat");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <main className="min-h-screen bg-[url('/images/Background.png')] bg-no-repeat	bg-center	bg-cover">
      <div className="container mx-auto py-8 px-4 sm:px-0">
        {/* Logo */}
        <div className="grid justify-center">
          <Link href="/">
            <Image src="/images/logo.png" width={119} height={121} alt="logo" />
            <h3 className="text-[32px] text-center font-bold text-themeTertiary">
              Bahar
            </h3>
          </Link>
        </div>
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-themePrimary text-center pt-5">
          Welcome to BAHAR - The Sea of Knowledge!
        </h1>
        {/* Grid Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-5 lg:gap-7 mt-16">
          {data?.map((item, index) => (
            <div className="bg-themeQuaternary/60 rounded-3xl p-7" key={index}>
              <Image
                src={item?.icon}
                width={60}
                height={60}
                alt="icons"
                className="mx-auto"
              />
              <h4 className="text-xl sm:text-2xl font-bold text-themeSecondary pt-5 line-clamp-2">
                {item?.title}
              </h4>
              <p className="text-sm sm:text-base font-normal text-themeSecondary pt-3 line-clamp-5">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
        {/* Input Section  */}
        <div className="max-w-[862px] mx-auto pt-32">
          <p className="text-themePrimary text-[20px] pb-9">
            Ready to embark on a journey of words and innovation? Ask me
            anything to start your first Flash Chat!{" "}
          </p>
          <div className="relative">
            {/* <form action=""> */}
            <input
              value={messageValue}
              onChange={(e) => {
                setMessageValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  startChatHandler(messageValue);
                }
              }}
              type="text"
              placeholder="Ask me anything..."
              className="w-full focus:outline-none rounded-xl border-[3px] border-themePrimaryLight h-16 placeholder:text-themeSecondaryLight placeholder:text-[20px] placeholder:font-bold pl-5 pr-10"
            />
            <button
              onClick={() => startChatHandler(messageValue)}
              className="absolute right-5 top-5"
            >
              <SubmitSVG />
            </button>
            {/* </form> */}
          </div>
        </div>
        {/* footer message */}
        <p className="text-[17px] font-normal text-themePrimary text-center pt-12">
          Powered by <span className="font-bold">JAIS</span>
        </p>
      </div>
    </main>
  );
}

const data = [
  {
    title: "Start a Chat",
    description:
      "Ask BAHAR anything! Whether you're curious, seeking information, or just want a friendly chat, BAHAR is ready.",
    icon: "/icons/chat 1.png",
  },
  {
    title: "Explore Commands",
    description:
      "Try out commands like 'Tell me a joke,' 'Translate,' or 'Recommend a movie.' BAHAR is loaded with lightning-fast responses.",
    icon: "/icons/Explore Commands.png",
  },
  {
    title: "Customize Your Experience",
    description:
      "Vibe- match with light / dark modes.Switch languages like a breeze with our English - Arabic toggle.",
    icon: "/icons/Customize.png",
  },
  {
    title: "Global Experience",
    description:
      "BAHAR speaks both English and Arabic fluently, providing you with a truly global conversational experience.",
    icon: "/icons/global.png",
  },
  {
    title: "Rate Your Experience",
    description:
      "Your feedback matters! Share your thoughts and help us enhance your experience with BAHAR.",
    icon: "/icons/rating 1.png",
  },
];
