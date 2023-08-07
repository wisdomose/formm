/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        // primary colors
        "primary-marine": "hsl(213, 96%, 18%)",
        "primary-purple": "#6861A2",
        "primary-purplish": "hsl(243, 100%, 62%)",
        "primary-pastel": "hsl(228, 100%, 84%)",
        "primary-light": "hsl(206, 94%, 87%)",
        "primary-strawberry": "hsl(354, 84%, 57%)",

        // neutral colors
        "neutral-cool": "hsl(231, 11%, 63%)",
        "neutral-light": "hsl(229, 24%, 87%)",
        "neutral-magnolia": "hsl(217, 100%, 97%)",
        "neutral-alabaster": "hsl(231, 100%, 99%)",
        "neutral-white": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        ubuntu: "Ubuntu",
      },
      maxWidth: {
        max: "1440px",
      },
      boxShadow: {
        custom: "0px 4px 80px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
