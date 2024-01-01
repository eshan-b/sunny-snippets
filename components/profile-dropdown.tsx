"use client";

// Clerk Authentication
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// NextUI
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
} from "@nextui-org/react";

// Fallback Avatar
import blankUser from "../assets/blank_user.svg";

// Icons
import { FaRegNewspaper } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

function ProfileDropdown() {
  // Clerk Authentication & Router
  const { signOut, user } = useClerk();
  const router = useRouter();

  // Icon Styles
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

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
          <DropdownSection showDivider>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{`${user?.primaryEmailAddress}`}</p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              startContent={<FaRegNewspaper className={iconClasses} />}
            >
              My Articles
            </DropdownItem>
            <DropdownItem
              key="account"
              href="/account"
              startContent={<IoPersonOutline className={iconClasses} />}
            >
              My Account
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<IoLogOutOutline className={iconClasses} />}
            >
              <>
                <button onClick={() => signOut(() => router.push("/"))}>
                  Sign Out
                </button>
              </>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default ProfileDropdown;
