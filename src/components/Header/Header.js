/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { NavLink, useParams } from "react-router-dom";
import "./Header.scss";
import "react-pro-sidebar/dist/css/styles.css";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import logo from "../../assets/img/logo.svg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleLogout } from "../../store/actions/authAction";
import { useDispatch } from "react-redux";
const Header = (props) => {
  const location = useLocation();
  const menu = useSelector((state) => state);
  const { menuCollapse } = menu.menu;
  const { pathname } = location;
  const dispatch = useDispatch();
  const splitLocation = pathname.split("/");

  const Logout = () => {
    dispatch(handleLogout());
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logo"></div>
            <div className="logotext">
              <p>{menuCollapse ? "" : "Avoo"}</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={location.pathname == "/" ? true : false}
                icon={<FiHome />}
              >
                <NavLink exact={true} to="/">
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem
                icon={<FaList />}
                active={splitLocation[1] == "subscriptions" ? true : false}
              >
                <NavLink to="/subscriptions">Subscriptions</NavLink>
              </MenuItem>

              <MenuItem
                icon={<BiCog />}
                active={location.pathname == "/settings" ? true : false}
              >
                <NavLink to="/settings">Settings</NavLink>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={Logout}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
