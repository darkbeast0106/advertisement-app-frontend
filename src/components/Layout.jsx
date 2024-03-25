import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const authContext = useContext(AuthContext);
  const { authToken, logout } = authContext;
  const navbarLeftSide = [];
  const navbarRightSide = [];
  const navbarRightSideOthers = [];

  navbarLeftSide.push({to: "/", text: "Főoldal"});
  if (authToken) {
    navbarLeftSide.push({to: "/my-advertisements", text: "Saját hirdetéseim"});
    navbarLeftSide.push({to: "/create-advertisement", text: "Új hirdetés felvétele"});
    navbarRightSide.push({to: "/user-profile", text: "Saját profil"});
    navbarRightSideOthers.push(
      <button className="nav-link" onClick={() => logout()}>Kijelentkezés</button>
    );
  } else {
    navbarRightSide.push({to: "/register", text: "Regisztráció"});
    navbarRightSide.push({to: "/login", text: "Bejelentkezés"});
  }
  
  return (
    <>
      <Navbar leftSide={navbarLeftSide} rightSide={navbarRightSide} rightSideOthers={navbarRightSideOthers}/>
      <main className="container mt-2">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
