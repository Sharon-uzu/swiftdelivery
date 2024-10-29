import React, { useState } from "react";
import "../App.css";
import { AiFillHome } from "react-icons/ai";
import { FaUsers,FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar2 = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [open1, setOpen1] = useState(false);

  const handleClick = () => {
    setOpen1(!open1);
    setDropdownOpen(!isDropdownOpen);
    document.body.style.overflow = open1 ? "auto" : "hidden"; // Disable or enable scrolling
  };

  return (
    <div>
      <div className="media-bar" onClick={handleClick}>
        {open1 ? (
          <IoCloseSharp id="close" style={{ color: "#fff" }} />
        ) : (
          <FaBars id="bar" style={{ color: "#ee2a7b" }} />
        )}
      </div>

      <div className="side" style={{ width: isOpen ? "70px" : "250px" }}>
        <div className="bar">
          <div className="logo-div">
            <h1 onClick={toggle} style={{ cursor: "pointer" }}>
              HH
            </h1>
          </div>
        </div>

        <NavLink to="/" className="link" activeclassName="active"></NavLink>

        <NavLink
          to="/adminproperties"
          className="link"
          activeclassName="active"
        >
          <div>
            <AiFillHome className="icon" />
            <h4 style={{ display: isOpen ? "none" : "block" }}>Properties</h4>
          </div>
        </NavLink>

        <NavLink to="/user" className="link" activeclassName="active">
          <div>
            <FaUsers className="icon" />
            <h4 style={{ display: isOpen ? "none" : "block" }}>User</h4>
          </div>
        </NavLink>
       

        <NavLink to="/clients" className="link" activeclassName="active">
          <div>
            <FaUsers className="icon" />
            <h4 style={{ display: isOpen ? "none" : "block" }}>Clients</h4>
          </div>
        </NavLink>

        <NavLink to="/vendor" className="link" activeclassName="active">
          <div>
            <FaUsers className="icon" />
            <h4 style={{ display: isOpen ? "none" : "block" }}>Vendors</h4>
          </div>
        </NavLink>

        {/* <NavLink to="/payment" className="link" activeclassName="active">
          <div>
            <GrShop className="icon" />
            <h4 style={{ display: isOpen ? "none" : "block" }}>Payments</h4>
          </div>
        </NavLink> */}
      </div>

      <div className={`side2 ${open1 ? " active" : "inactive"}`}>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Sidebar2;
