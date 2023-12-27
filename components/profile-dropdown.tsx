"use client";

// Clerk Authentication
import { useUser, SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  const { signOut } = useClerk();
  const router = useRouter();

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
            <>
              <button onClick={() => signOut(() => router.push("/"))}>
                Sign Out
              </button>
            </>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default ProfileDropdown;
