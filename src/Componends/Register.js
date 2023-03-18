import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./LoadingScreen";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ErrorMsg from "./ErrorMsg";
import "../CSS/Register.css";

const local = "http://localhost:4000/";
const url = "https://books-my-shows.onrender.com/";

function Register() {
  // const [data, setData] = useState([]);
  const history = useHistory();
  const [error, SetError] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    CPassword: "",
  });

  let name, value;
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Submit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      SetLoading(true);
      const { Name, Email, Password, CPassword } = user;

      axios
        .post(`${url}sign-up`, user)
        .then((res) => {
          toast("Register Successfully");
          history.push("/login");
          setUser({
            Name: "",
            Email: "",
            Password: "",
            CPassword: "",
          });
        })
        .catch((error) => toast(error.response.data.message));
      SetLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      SetLoading(false);
    }
  };

  return (
    <div className="Register">
      <div className="form-background">
        {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
        {loading && <LoadingScreen />}
        <h2>Register</h2>
        <div className="">
          <form method="POST" onSubmit={Submit}>
            <input
              type="text"
              name="Name"
              placeholder="Enter Your Name"
              value={user.Name}
              onChange={handleInput}
            ></input>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={user.Email}
              onChange={handleInput}
            ></input>
            <input
              type="password"
              name="Password"
              placeholder="Passoword"
              value={user.Password}
              onChange={handleInput}
            ></input>
            <input
              type="password"
              name="CPassword"
              placeholder="Confirm Password"
              value={user.CPassword}
              onChange={handleInput}
            ></input>
            <input
              onClick={Submit}
              style={{
                padding: "5px 10px ",
                borderRadius: "5px",
                color: "white",
                backgroundColor: " #0d6efd",
                textAlign: "center",
                justifyContent: "center",
              }}
              type="Submit"
            ></input>
          </form>
        </div>
        <ToastContainer />
      </div>
      {/* <MovieDetails /> */}
    </div>
  );
}

export default Register;
