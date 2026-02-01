import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const {theme} = useTheme();
  return (
    <nav
      className="
        flex items-center justify-between
        px-6 py-3
        shadow-sm
        transition-colors duration-300
        
      "
      style={{
        backgroundColor: "var(--navbar-bg)",
        color: "var(--text-color)",
      }}
    >
      {/* Left */}
      <h1 className="text-xl font-bold tracking-tight">JobPilot</h1>

      {/* Right */}
      <div className="flex items-center gap-3">
       <span className="text-sm">{theme}</span> <ThemeToggle />

        <div className="dropdown dropdown-end">
          {/* The clickable circle image */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          {/* The Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                className="text-error font-semibold"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
