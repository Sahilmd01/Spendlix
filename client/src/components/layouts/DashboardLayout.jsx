import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import MobileBottomNav from "./MobileBottomNav";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
        overflow: "hidden",
      }}
    >
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div className="sidebar-desktop-wrapper">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <main
            className="app-main-content"
            style={{
              flex: 1,
              padding: "14px 18px",
              width: "100%",
              overflowY: "auto",
              height: "100%",
            }}
          >
            {children}
          </main>
          <MobileBottomNav />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
