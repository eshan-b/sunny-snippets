"use client";

// Clerk Authentication
import { useUser, SignOutButton } from "@clerk/nextjs";

// NextUI
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";

// Fallback Avatar
import blankUser from "../assets/blank_user.svg";

function ProfileDropdown() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={user?.firstName || "User"}
            size="sm"
            src={user?.imageUrl || blankUser}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{`${user.primaryEmailAddress}`}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="logout" color="danger">
            <SignOutButton></SignOutButton>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default ProfileDropdown;