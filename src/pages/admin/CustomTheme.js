export const customStyles = (themeMode) => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: themeMode === "dark" ? "#1f2937" : "#fff", // Tailwind: gray-800 vs white
    borderColor: state.isFocused ? "#6366f1" : "#d1d5db", // indigo-500 vs gray-300
    color: themeMode === "dark" ? "#fff" : "#000",
    boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: themeMode === "dark" ? "#1f2937" : "#fff",
    color: themeMode === "dark" ? "#fff" : "#000",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? themeMode === "dark"
        ? "#374151" // gray-700
        : "#e5e7eb" // gray-200
      : "transparent",
    color: themeMode === "dark" ? "#fff" : "#000",
    "&:active": {
      backgroundColor: themeMode === "dark" ? "#4b5563" : "#d1d5db", // slightly darker on click
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: themeMode === "dark" ? "#fff" : "#000",
  }),
  input: (base) => ({
    ...base,
    color: themeMode === "dark" ? "#fff" : "#000",
  }),
});
