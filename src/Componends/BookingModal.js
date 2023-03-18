import React, { useEffect, createContext, useReducer, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const local = "http://localhost:4000/";
const url = "https://books-my-shows.onrender.com/";

const BookingModal = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [movie, setMovie] = useState();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  // useEffect(() =>
  // {
  //     if (!token)
  //     {
  //         history.push("/login");
  //     } else
  //     {
  //         history.push(`/book/${id}`);
  //     }
  // }, []);

  // useEffect(() =>
  // {
  //     fetch(`${url}u`)
  //         .then(res => res.json())
  //         .then(res => setMovie(res));

  // }, [Movie])

  const onSubmit = handleSubmit(async (data) => {
    // { Movie._id === id ? setCheck(Movie.movie_name) : null }
    // console.log("Mo ", id)

    try {
      const { text, number, email } = data;
      console.log(data);
      // setMovie(id);
      console.log(id);
      await axios
        .post(`${url}book-ticket`, { text, number, email, id })
        .then((res) => toast(res.data.message))
        .catch((error) => toast(error.response.data.message));
      // history.push("/");
    } catch (error) {
      console.log("Error");
    }
  });

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Col>
          <Row>
            <Form.Control
              {...register("text")}
              name="text"
              type="text"
              placeholder="Names"
            />
          </Row>
          <br />

          <Form.Control
            {...register("email")}
            name="email"
            type="email"
            placeholder="Email"
          />
          <br />
          <Row>
            <Form.Control
              {...register("number")}
              name="number"
              type="number"
              placeholder="Number of Ticket"
            />
          </Row>
          <Button variant="info" type="submit">
            Book now
          </Button>
        </Col>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default BookingModal;
