import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";


const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-300 bg-white dark:bg-gray-900 transition-colors duration-500">
      
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-500">
        CivicApp
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:bg-gray-700 transition-all"
        >
          {theme === "light" ? (
            <Moon className="text-gray-900" size={20} />
          ) : (
            <Sun className="text-yellow-300" size={20} />
          )}
        </button>

        <Link
          to="/"
          className="font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-colors duration-500"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
