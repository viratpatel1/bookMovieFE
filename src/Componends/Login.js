import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import ErrorMsg from "./ErrorMsg";
import "../CSS/Login.css";
import { SwitchContext } from "../App";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const { state, dispatch } = useContext(SwitchContext);
  const history = useHistory();
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [error, SetError] = useState(false);
  const [loading, SetLoading] = useState(false);

  const local = "http://localhost:4000/";
  const url = "https://books-my-shows.onrender.com/";

  const Submit = async (e) => {
    // console.log("first");
    e.preventDefault();
    try {
      SetLoading(true);

      const { data } = await axios.post(`${url}login`, { Email, Password });
      console.log("33 ", data);
      console.log("34 ", data.Role);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userInfo", JSON.stringify(data));
      const token = localStorage.getItem("token");

      if (token === "undefined" || token === "" || token === null)
        return history.push("/");
      if (
        data.Role == "1" &&
        token !== "undefined" &&
        token !== "" &&
        token !== null
      ) {
        console.log("43");
        dispatch({ type: "User", payload: true });
        console.log("Admin");
        history.push("/admin/viewmovies");
      } else if (
        data.Role == "0" &&
        token !== "undefined" &&
        token !== "" &&
        token !== null
      ) {
        dispatch({ type: "User", payload: true });
        console.log("User");
        history.push("/");
      }
      SetLoading(false);
    } catch (error) {
      SetError(error.response.data.message);
      SetLoading(false);
    }
  };

  return (
    <div className="Loginform">
      {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
      {loading && <LoadingScreen />}
      <h2>LOGIN</h2>
      <Form method="POST" onSubmit={Submit} className="login">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            placeholder="Enter email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            placeholder="Password"
            value={Password}
            onChange={(e) => SetPassword(e.target.value)}
          />
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              SetEmail("dummy@gmail.com");
              SetPassword("dummy");
            }}
          >
            Demo Login
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              SetEmail("admin@gmail.com");
              SetPassword("admin");
            }}
          >
            Admin Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
