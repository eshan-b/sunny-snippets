// Logo font
import { Pacifico } from "next/font/google";

// Images
import Image from "next/image";
import logoImage from "../assets/sunny-logo.png";

// Clerk authentication
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

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
  Link,
  Button,
} from "@nextui-org/react";

// Client-side Dropdown
import ProfileDropdown from "./profile-dropdown";

export default async function App() {
  const { userId } = auth();

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

      {/* Main Links */}
      <NavbarContent className="hidden sm:flex gap-16" justify="center">
        <NavbarItem>
          <Link className="text-white text-xl" color="foreground" href="#">
            ABOUT
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white text-xl" href="#">
            NEWS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white text-xl" color="foreground" href="#">
            CONTACT
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Login Buttons */}
      {userId ? (
        <NavbarContent as="div" justify="end">
          <ProfileDropdown />
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <SignInButton mode="modal">
              <Link className="text-white text-xl">Login</Link>
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
      )}
    </Navbar>
  );
}
