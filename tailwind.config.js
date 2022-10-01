/** @type {{yellow: string}} */
// eslint-disable-next-line no-undef

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "310px": "310px"
      }
    }
  },
  shadows: {
    default: "0 2px 4px 0 rgba(0,0,0,0.10)",
    md: "0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)",
    lg: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.9)",
    outline: "0 0 0 3px rgba(52,144,220,0.5)",
    "outline-green": "0 0 0 3px rgba(5,202,160, 0.8)",
    none: "none"
  },
  modules: {
    shadows: ["responsive", "hover", "focus"]
  },
  // shadows: {
  //   'outline-sky': '0 0 3px #93c5fd'
  // }

  darkMode: "class",
  plugins: [],
  options: {
    prefix: "",
    important: false,
    separator: ":"
  }
};
