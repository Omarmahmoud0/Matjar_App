const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        'hero-form': "url('https://media.istockphoto.com/id/1405760376/vector/online-shopping-design-graphic-elements-signs-symbols-mobile-marketing-and-digital-marketing.jpg?s=612x612&w=0&k=20&c=2DSpkY9ktsAfzBOcZUMkZThW3B6kvGYG1cHQ3yeaPJg=')",
      },
      colors: {
        primary: "#f42c37",
        secondary: "#f42c37",
        brandYellow: "#fdc62e",
        brandGreen: "#2dcc6f",
        brandBlue: "#1376f4",
        brandWhite: "#eeeeee",
      },
      container: {
        center: "true",
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
	  screens: {
		xs:"480px",
	  },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(45deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
};
