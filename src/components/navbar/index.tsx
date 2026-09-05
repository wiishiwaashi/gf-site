import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  height: 50px;
  width: auto;
  background: rgb(120, 120, 120);
  position: sticky;
  top: 0;
  z-index: 10000;
`;

const NavbarList = styled.ul`
  align-items: center;
  padding: 0;
  display: flex;
  list-style-type: none;
`;

const NavbarItem = styled.li`
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  font-size: 20px;

  a {
    color: white;
  }

  a:hover {
    color: lightblue;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/gallery">Gallery</Link>
        </NavbarItem>
      </NavbarList>
      <div className="navbar-hamburger" onClick={toggleMenu} ref={hamburgerRef}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
