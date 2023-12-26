// Logo font
import { Pacifico } from "next/font/google";

// Images
import Image from "next/image";
import blankUserImage from "../assets/blank_user.svg";
import logoImage from "../assets/sunny-logo-white.svg";

// Clerk authentication
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const dropdownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h8m-8 6h16"
    />
  </svg>
);

const Navbar = async () => {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        {/* Mobile Navigation */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {dropdownIcon}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>ABOUT</a>
            </li>
            <li>
              <a>NEWS</a>
            </li>
            <li>
              <a>CONTACT</a>
            </li>
          </ul>
        </div>
        <Image src={logoImage} alt="Logo Image" width={40} height={40} />
        <a
          className={`${pacifico.className} text-white btn btn-ghost text-2xl`}
          href="/"
        >
          Sunny Snippets
        </a>
      </div>
      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-white text-lg">ABOUT</a>
          </li>
          <li>
            <a className="text-white text-lg">NEWS</a>
          </li>
          <li>
            <a className="text-white text-lg">CONTACT</a>
          </li>
        </ul>
      </div>
      {/* Profile picture and dropdown fo sign in */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          {userId ? (
            <div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <Image
                    src={user?.imageUrl || blankUserImage}
                    alt="User Image"
                    fill={true}
                    className="rounded-full"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <SignOutButton>
                      <a>Sign Out</a>
                    </SignOutButton>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <a className="btn btn-secondary">Sign In</a>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
