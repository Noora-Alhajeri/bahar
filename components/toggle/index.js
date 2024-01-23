'use client';
import React from 'react';
import Image from 'next/image';
import { LightIcon } from '@/app/icons/svg-icons';
import { ThemeContext } from '@/context/themeContext';

export const Toggle = () => {
   const { theme, setTheme } = React.useContext(ThemeContext);
   const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
   };

   return (
      <div
         className={`bg-themeSeptenary dark:bg-darkModeColor border border-themeOctonary dark:border-gray-200/60 rounded-xl self-end w-full h-16 p-1.5 flex items-center justify-between`}>
         {/* Dark */}
         <div
            onClick={toggleTheme}
            className={`text-[22px] font-normal text-themeSecondary flex items-center gap-3 cursor-pointer pl-3 ${
               theme === 'dark' ? 'order-2' : 'order-1'
            }`}>
            Dark
            <Image src='/dark.png' width={43} height={27} alt='dark' />
         </div>
         {/* Light */}
         <div
            onClick={toggleTheme}
            className={`text-[22px] font-normal text-themeSecondary py-3 px-5 bg-themeOctonary rounded-xl flex items-center gap-3 cursor-pointer h-[51px] ${
               theme === 'dark' ? 'order-1' : 'order-2'
            }`}>
            <LightIcon />
            Light
         </div>
      </div>
   );
};
