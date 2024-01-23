"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Locale } from "../i18n-config";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import en from "@/dictionaries/en";
import ar from "@/dictionaries/ar";

// NOTE: Global context store
const GlobalContext = createContext({
  lang: "en",
  changeLang: () => {},
  direction: "ltr",
  changeDirection: () => {},
});

// NOTE: Global provider for context store
export const GlobalProvider = ({ children, language }) => {
  const [chatRoom, setChatRoom] = useState([]);
  const [lang, setLang] = useState(language ?? "en");
  const [direction, setDirection] = useState("ltr");
  const [dictionaries, setDictionaries] = useState(
    lang === "en" ? en : lang === "ar" ? ar : en
  );

  const router = useRouter();

  // Region for setting the language
  useEffect(() => {
    const getLang = getCookie("lang");
    if (getLang) {
      setLang(getLang);
    }

    const getDirection = getCookie("direction");
    if (getDirection) {
      setDirection(getDirection);
    }

    // NOTE: Set the lang cookie if it doesn't exist
    const internalId = setInterval(() => {
      const getLang = getCookie("lang");
      if (!getLang) {
        setCookie("lang", lang);
        setDictionaries(lang === "en" ? en : lang === "ar" ? ar : en);
      }

      // NOTE: Set the direction cookie if it doesn't exist
      const getDirection = getCookie("direction");
      if (!getDirection) {
        setCookie("direction", direction);
      }
    }, 500);

    return () => {
      clearInterval(internalId);
    };
  }, []);

  // NOTE: Change the language function handler
  const changeLang = (lang) => {
    setLang(lang);
    setDictionaries(lang === "en" ? en : lang === "ar" ? ar : en);
    setDirection(lang === "ar" ? "rtl" : "ltr");
    setCookie("lang", lang, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    setCookie("direction", lang === "ar" ? "rtl" : "ltr", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    router.refresh();
  };

  // NOTE: Change the direction function handler
  const changeDirection = (direction) => {
    setDirection(direction);
    setCookie("direction", direction);
  };

  // NOTE: Automatically change the language based on the cookie lang value
  useEffect(() => {
    const getLang = getCookie("lang");
    if (getLang) {
      setLang(getLang);
      setDictionaries(getLang === "en" ? en : getLang === "ar" ? ar : en);
    } else {
      setCookie("lang", lang, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  }, []);

  // NOTE: Return the global context provider
  return (
    <GlobalContext.Provider
      value={{
        lang,
        changeLang,
        direction,
        changeDirection,
        dictionaries,
        setDictionaries,
        chatRoom,
        setChatRoom,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// NOTE: Global context hook
export const useGlobalContext = () => useContext(GlobalContext);

// NOTE: Global context consumer
export const GlobalConsumer = GlobalContext.Consumer;
