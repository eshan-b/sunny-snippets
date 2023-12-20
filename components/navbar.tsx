const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div>
        {/* Your logo goes here */}
        <span className="text-white font-bold text-xl">Logo</span>
      </div>
      <div>
        {/* Login button goes here */}
        <button className="text-white">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
