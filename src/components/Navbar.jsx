import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div
      className="
        navbar bg-base-100
        shadow-md px-6
      "
    >
      {/* Left */}
      <div className="flex-1">
        <h1 className="text-xl font-bold">
          JobPilot
        </h1>
      </div>

      {/* Right */}
      <div className="flex-none">
        <ThemeToggle />
        <button onClick={()=> {
          localStorage.clear();
          window.location.href = "/login";
        }} className="btn btn-ghost">LogOut</button>
      </div>
    </div>
  );
};

export default Navbar;
