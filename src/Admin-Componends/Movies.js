import axios from "axios";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Admin-CSS/Movies.css";
import { FaAudioDescription } from "react-icons/fa";
import Sidebar from "./Sidebar";
// import { initialState } from '../useRuducer/reducer';

const initialState = {
  movie_name: "",
  release_date: "",
  poster_path: "",
};

const local = "http://localhost:4000/";
const url = "https://books-my-shows.onrender.com/";

const reducer = (state, action) => {
  return { ...state, [action.input]: action.value };
};

const Moviess = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [poster_img, setPoster_Img] = useState();
  const [moviename, setMovieName] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const history = useHistory();

  // console.log(state);
  const handleChange = (e) => {
    setPoster_Img(e.target.files[0]);
  };

  const MoviesData = (e) => {
    try {
      e.preventDefault();
      // console.log(state)
      // console.log(poster_img, moviename, date, desc);
      const formData = new FormData();
      formData.append("photo", poster_img);
      formData.append("movie_name", moviename);
      formData.append("release_date", date);
      formData.append("description", desc);

      const congir = {
        Headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios
        .post(`${url}admin/movies`, formData, congir)
        .then((res) => console.log(res));
      history.push("/admin/viewmovies");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="home">
        <Form method="POST" onSubmit={MoviesData}>
          <Row className="mb-3 px-5">
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Movie Name</Form.Label>
              <Form.Control
                type="text"
                name="movie_name"
                placeholder="Enter Name of the Movie"
                onChange={(e) => setMovieName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formFile" className="mb-3">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release_date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 px-5">
            <Form.Group as={Col} controlId="formFile" className="mb-3">
              <Form.Label>Movie Poster</Form.Label>
              <Form.Control
                type="file"
                name="poster_path"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group
            className="mb-3 px-5"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Description About Movie</Form.Label>
            <Form.Control
              type="textarea"
              rows={3}
              name="description"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write about the movie"
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Moviess;
