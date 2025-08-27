// /** @type {import('tailwindcss').Config} */
// module.exports = {
  
//   content: [ "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {
//       colors:{
//         background : "#F7F7F7",
//         border :'#EBEBEB',
//         input:'#F3F4F1',
//         text:'#1A1D1C',
//         button_bg:'#1A1D1C',
//         button_text:'#D5D7D8',
//         non_active_icon:'#919598',
//         primary_text:'#1A1D1C',
//         primary_card:'#FFFFFF',
//         primary_bg:'#F8F8F8',
//         secondary_text:'#1A1D1C',
//         secondary_bg:'#FFF4D7',
//         tertiary_text:'#1A1D1C',
//         tertiary_bg:'#F4E5F7',
//         quaternary_text:'#D8EF6F',
//         quaternary_bg:'#EAF7B1',
      
//       }
//     },
//   },
//   plugins: [],
// }



const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} \*/
module.exports = {
darkMode: 'class',
content: [ "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
presets: [require('nativewind/preset')],
theme: {
extend: {
colors: {
border: 'hsl(var(--border))',
input: 'hsl(var(--input))',
ring: 'hsl(var(--ring))',
background: 'hsl(var(--background))',
foreground: 'hsl(var(--foreground))',
primary: {
DEFAULT: 'hsl(var(--primary))',
foreground: 'hsl(var(--primary-foreground))',
},
secondary: {
DEFAULT: 'hsl(var(--secondary))',
foreground: 'hsl(var(--secondary-foreground))',
},
destructive: {
DEFAULT: 'hsl(var(--destructive))',
foreground: 'hsl(var(--destructive-foreground))',
},
muted: {
DEFAULT: 'hsl(var(--muted))',
foreground: 'hsl(var(--muted-foreground))',
},
accent: {
DEFAULT: 'hsl(var(--accent))',
foreground: 'hsl(var(--accent-foreground))',
},
popover: {
DEFAULT: 'hsl(var(--popover))',
foreground: 'hsl(var(--popover-foreground))',
},
card: {
DEFAULT: 'hsl(var(--card))',
foreground: 'hsl(var(--card-foreground))',
},
},
borderWidth: {
hairline: hairlineWidth(),
},
keyframes: {
'accordion-down': {
from: { height: '0' },
to: { height: 'var(--radix-accordion-content-height)' },
},
'accordion-up': {
from: { height: 'var(--radix-accordion-content-height)' },
to: { height: '0' },
},
},
animation: {
'accordion-down': 'accordion-down 0.2s ease-out',
'accordion-up': 'accordion-up 0.2s ease-out',
},
},
},
plugins: [require('tailwindcss-animate')],
};