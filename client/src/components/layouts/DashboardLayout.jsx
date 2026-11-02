import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

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
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <main
            style={{
              flex: 1,
              padding: "24px 28px",
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
