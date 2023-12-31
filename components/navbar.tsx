"use client";

// Logo font
import { Pacifico } from "next/font/google";

// Images
import Image from "next/image";
import logoImage from "../assets/sunny-logo.png";

// Clerk authentication
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

// Fonts
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

// NextUI
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

// Client-side Dropdown
import ProfileDropdown from "./profile-dropdown";

export default function App() {
  return (
    <Navbar position="static" maxWidth={"full"} className="bg-peach-orange">
      {/* Brand */}
      <NavbarBrand>
        <Image
          src={logoImage}
          alt="Sunny Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <p
          className={`${pacifico.className} font-bold text-inherit text-white text-2xl`}
        >
          Sunny Snippets
        </p>
      </NavbarBrand>

      {/* Profile Dropdown  */}
      <SignedIn>
        <NavbarContent as="div" justify="end">
          <NavbarItem>
            <ProfileDropdown />
          </NavbarItem>
        </NavbarContent>
      </SignedIn>

      {/* Login Buttons */}
      <SignedOut>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <SignInButton mode="modal">
              <Button variant="light" className="text-white text-xl">
                Login
              </Button>
            </SignInButton>
          </NavbarItem>
          <NavbarItem>
            <SignUpButton mode="modal">
              <Button
                className="text-white text-xl"
                color="primary"
                variant="flat"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </NavbarItem>
        </NavbarContent>
      </SignedOut>
    </Navbar>
  );
}
