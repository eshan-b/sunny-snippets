// NextUI
import { Button, Link, Navbar, NavbarBrand } from "@nextui-org/react";

// Icons
import { IoArrowBack } from "react-icons/io5";

const ProfileNavbar = () => {
  return (
    <Navbar position="static" maxWidth={"full"}>
      <NavbarBrand className="gap-2">
        <Button as={Link} isIconOnly variant="light" aria-label="Back" href="/">
          <IoArrowBack />
        </Button>
        <p>My Account</p>
      </NavbarBrand>
    </Navbar>
  );
};

export default ProfileNavbar;
