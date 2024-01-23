"use client";

import { GlobalProvider } from "./globalProvider";

const Provider = ({ children, lang }) => {
  return <GlobalProvider language={lang}>{children}</GlobalProvider>;
};
export default Provider;
