import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import { SwitchContext } from "../App.js";
// import { reducer } from "../useRuducer/reducer";

function Navbar() {
  const userInfo = localStorage.getItem("userInfo");
  const res = JSON.parse(userInfo);
  const [check, setCheck] = useState("");
  const [user, setUser] = useState("");
  const { state, dispatch } = useContext(SwitchContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setCheck(token);
    setUser(JSON.parse(userInfo));
  }, [token, userInfo, check]);

  console.log("UR ", user?.Role);
  const Rendering = () => {
    if (check && userInfo) {
      return (
        <>
          <li>
            {user?.Role === 1 ? null : (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                exact
                to="/"
              >
                Home
              </Link>
            )}
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => {
                dispatch({ type: "User", payload: false });
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");
              }}
              exact
              to="/login"
            >
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              exact
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              exact
              to="/sign-up"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              exact
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>{/* <h4>{res.Name}</h4> */}</li>
        </>
      );
    }
  };

  useEffect(() => {
    Rendering();
  }, []);

  return (
    <div className="nav-menu">
      <div>
        <h2>Book Movie Ticket</h2>
      </div>
      <ul>
        <Rendering />
      </ul>
    </div>
  );
}

export default Navbar;
