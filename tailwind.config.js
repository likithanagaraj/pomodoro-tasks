/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [ "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        background : "#F7F7F7",
        border :'#EBEBEB',
        input:'#F3F4F1',
        text:'#1A1D1C',
        button_bg:'#1A1D1C',
        button_text:'#D5D7D8',
        non_active_icon:'#919598',
        primary_text:'#1A1D1C',
        primary_card:'#FFFFFF',
        primary_bg:'#F8F8F8',
        secondary_text:'#1A1D1C',
        secondary_bg:'#FFF4D7',
        tertiary_text:'#1A1D1C',
        tertiary_bg:'#F4E5F7',
        quaternary_text:'#D8EF6F',
        quaternary_bg:'#EAF7B1',
      
      }
    },
  },
  plugins: [],
}