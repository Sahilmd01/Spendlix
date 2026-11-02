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
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div style={{ display: "flex", width: "100%" }}>
          <div className="sidebar-desktop-wrapper">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <main
            className="app-main-content"
            style={{
              flex: 1,
              padding: "14px 18px",
              width: "100%",
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
