"use client";

import { useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Avatar, Link } from "@nextui-org/react";

import blankUser from "../assets/blank_user.svg";

function ProfileDropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      <Avatar
        isBordered
        as="button"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="transition-transform"
        color="secondary"
        name={user?.firstName || "User"}
        size="sm"
        src={user?.imageUrl || blankUser}
      />
      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link
              className="block px-4 py-2 text-sm text-gray-700"
              color="foreground"
              href="#"
            >
              Profile
            </Link>
            <SignOutButton>
              <Link
                className="block px-4 py-2 text-sm text-gray-700"
                color="foreground"
                href="#"
              >
                Logout
              </Link>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
