// Logo font
import { Pacifico } from "next/font/google";

// Images
import Image from "next/image";
import blankUserImage from "../assets/blank_user.svg";

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
  console.log(userId);
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
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {userId ? (
              <img
                alt="Profile Icon"
                src={user?.imageUrl}
                className="w-10 rounded-full"
              />
            ) : (
              // insert a blank user icon
              <Image
                src={blankUserImage}
                width={10}
                height={10}
                alt="Profile Icon"
                className="rounded-full"
              />
            )}
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {userId ? (
              <>
                <li>
                  <a className="justify-between">
                    {currentUser.name ?? "Profile"}
                  </a>
                </li>
                <li>
                  {/* TODO: change to logout button */}
                  <SignOutButton>
                    <button className="btn btn-primary">Sign out</button>
                  </SignOutButton>
                </li>
              </>
            ) : (
              <>
                <li>
                  {/* TODO: change to login button */}
                  <SignInButton mode="modal" afterSignInUrl="/">
                    <button className="btn btn-primary">Sign in</button>
                  </SignInButton>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
