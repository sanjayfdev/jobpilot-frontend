import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        btn btn-ghost btn-circle
        transition-transform duration-200
        hover:scale-105
        active:scale-95
      "
      aria-label="Toggle theme"
    >
      {theme === "light" ? " 🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
