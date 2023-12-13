/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontSize:{
        headerFontSize:'18px',
        txtFontSize:'28px',
        txtbodyFontsize:'16px',
        txtbFontsize:'24px',
        loginFontsize:'32px',
        dashFontsize:'30px',
      },
      fontFamily:{
        headerFontFamily:'Inter',
        txtFontFamily:'Poppins',
      },
   fontWeight:{
    headerFontWeight:700,
    txtbodyFontWeight:700,
    txtbodyFontWeight:400,
    ttttttxtbodyFontWeight:500,
   },
   lineHeight:{
    headerLineHeight:'22px',
    txtlineHeight:'42px',
    txtbodylineHeight:'24px',
    txttttLineHeight:'27px',
    tttttttttxtbodylineHeight:'36px',
    loginLineHeight:'48px',
    dashLineHeight:'45px',
    anotherLineHeight:'19px',
   },
   letterSpacing:{
    txtLetterSpacing:'0.05em',
    txtbodyLetterspacing:'0em',
    txttttttttttttttttttbodyLetterspacing:'0.02em',
    dashLetterSpacing:'0.03em',
   },
   colors:{
    mycolor:'#01499B',
    txtecolor:'#01499B',
    txthecolor:'#303030',
   },

    },
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),
    // ... other plugins
  ]
}

