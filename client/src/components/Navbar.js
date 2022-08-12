import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtnLink } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src={require("../images/Logo.png")}
            alt="logo"
            style={{ height: "5rem" }}
          />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/signup" activeStyle>
            Sign Up
          </NavLink>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
