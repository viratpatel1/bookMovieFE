import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Admin-CSS/AdminMovies.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

function AdminMovies() {
  return (
    <div className="Movie-Details">
      <Sidebar />
      <MovieDetails />
    </div>
  );
}

const local = "http://localhost:4000/";
const url = "https://books-my-shows.onrender.com/";

function MovieDetails() {
  const [Movie, setMovie] = useState([]);
  // const [modal, setModal] = useState(false);

  const history = useHistory();

  const AutoReload = () => {
    fetch(`${url}u`)
      .then((res) => res.json())
      .then((res) => setMovie(res.reverse()));
  };

  const Delete = async (id) => {
    await axios
      .delete(`${url}${id}`)
      .then((res) => {
        AutoReload();
        toast("Deleted");
        console.log("Deleted");
      })
      .catch(() => {
        toast("Error in the Code");
      });
  };

  useEffect(() => {
    AutoReload();
  }, [Movie, Delete]);

  return (
    <div className="edit">
      <div className="container">
        {Movie.map((data) => {
          const {
            _id,
            contentType,
            movie_name,
            description,
            poster_path,
            release_date,
          } = data;
          // console.log(data)
          return (
            <>
              <div key={_id} className="Card">
                <div>
                  <img src={`data:${contentType};base64,${poster_path}`}></img>
                  <div className="Card-Details">
                    <h2>{movie_name}</h2>
                    <p>{description}</p>
                    {/* <p>{release_date}</p> */}
                    {/* <p>{_id}</p> */}
                    <div className="Button">
                      <button style={{}} onClick={() => Delete(_id)}>
                        Delete
                      </button>
                      <Link style={{}} to={`/admin/updatemovies/${_id}`}>
                        {" "}
                        <button>Edit</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

function Form() {
  <form>
    <input placeholder="Movie Name"></input>
    <input placeholder="Overview"></input>
    <input placeholder="Theater Name"></input>
    <input placeholder="Theater Location"></input>
  </form>;
}

export default AdminMovies;
