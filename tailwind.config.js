/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   darkMode: 'class',
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         colors: {
            themePrimary: '#0B4870',
            themePrimaryLight: '#18C6AD',
            themeSecondary: '#FFFFFF',
            themeSecondaryLight: '#8E8EA0',
            themeTertiary: '#0D365A',
            themeQuaternary: '#009D87',
            themeQuinary: '#3E3F4A',
            themeSenary: '#44BFAD',
            themeSeptenary: '#28776A',
            themeOctonary: '#18C6AD',
            darkModeColor: '#343541',
            themeNonary: '#0A0760',
             // darkModeColor: '#2B2B2D',
            // themeDenary: '#FFBFC6',
            // themeDenaryLight: '#F5F7FB',
            // themeElevenary: '#333333',
            // themeTwelveary: '#FFE3E8',
            // themeGreen: '#2B7C1D',
            // themeGreenLight: '#CCF4E3',
            // themeOrange: '#FFFF00',
         },
      },
   },
   plugins: [],
};
