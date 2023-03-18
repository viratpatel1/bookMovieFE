import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { format } from "timeago.js";
// import * as React from 'react';
import { Box, Typography, Modal } from "@material-ui/core";
// import { Button } from '@material-ui/icons/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import "../CSS/MovieDetails.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const StyledModal = styled(ModalUnstyled)`
//   position: fixed;
//   z-index: 1300;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Backdrop = styled('div')`
//   z-index: -1;
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   -webkit-tap-highlight-color: transparent;
// `;

// const style = {
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     p: 2,
//     px: 4,
//     pb: 3,
// };

const MovieDetails = () => {
  const [Movie, setMovie] = useState([]);
  const [val, setVal] = useState();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const handleChoose = () => setOpen(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleCheck = (e, movie_name) => {
    e.preventDefault();
    if (!val) {
      alert("Select your seat");
    } else {
      // onClose = { handleSubmit }
      history.push(`/selectseat/${movie_name}/${val}`);
    }
  };

  // const [loading, SetLoading] = useState(false);

  const local = "http://localhost:4000/";
  const url = "https://books-my-shows.onrender.com/";

  // console.log(token)
  useEffect(() => {
    if (token === "undefined" || token === "" || token === null) {
      history.push("/login");
    } else {
      fetch(`${url}u`)
        .then((res) => res.json())
        .then((res) => setMovie(res));
    }
    // // SetLoading(true)
    // fetch(`${url}u`)
    //   .then((res) => res.json())
    //   .then((res) => setMovie(res));
    // // SetLoading(false)
  }, [Movie]);
  return (
    <>
      {Movie.map((data, i) => {
        const {
          _id,
          contentType,
          movie_name,
          description,
          poster_path,
          release_date,
        } = data;

        return (
          <>
            {id === movie_name ? (
              <>
                <div className="MovieDetails">
                  <div className="LeftImg">
                    <img
                      src={`data: ${contentType}; base64, ${poster_path} `}
                    />
                  </div>
                  <div className="RightDetails">
                    <div className="AboutMovie">
                      <h1>{movie_name}</h1>
                      {/* <p>{format(release_date)}</p> */}
                      <p>Description: {description}</p>
                      <p>Cost: 200 Per Person</p>
                      <input
                        onClick={handleChoose}
                        type="button"
                        value="Book tickets"
                      />
                      {/* <Button onClick={handleOpen}>Open modal</Button> */}
                      <Modal
                        open={open}
                        onClose={handleSubmit}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Select Number of Ticket?
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <form method="post">
                              <div className="RadioBtn">
                                <label for="html">1</label>
                                <input
                                  type="radio"
                                  id="html"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="1"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="css">2</label>
                                <input
                                  type="radio"
                                  id="css"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="2"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="javascript">3</label>
                                <input
                                  type="radio"
                                  id="javascript"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="3"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="age1">4</label>
                                <input
                                  type="radio"
                                  id="age1"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="4"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="age2">5</label>
                                <input
                                  type="radio"
                                  id="age2"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="5"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="age3">6</label>
                                <input
                                  type="radio"
                                  id="age3"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="6"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="age3">7</label>
                                <input
                                  type="radio"
                                  id="age3"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="7"
                                />
                              </div>

                              <div className="RadioBtn">
                                <label for="age3">8</label>
                                <input
                                  type="radio"
                                  id="age3"
                                  name="amt"
                                  onClick={(e) => setVal(e.target.value)}
                                  value="8"
                                />
                              </div>

                              <div className="BtnBox">
                                {/* {!val ? (null) : <><Link to={"/selectseat/" + val} ><input onClose={handleSubmit} type="submit" value="Submit" /></Link></>} */}
                                <input
                                  onClick={(e) => handleCheck(e, movie_name)}
                                  type="submit"
                                  value="Submit"
                                />
                              </div>
                            </form>
                          </Typography>
                        </Box>
                      </Modal>
                      {/* <Link to={"/book/" + movie_name} ><input type="button" value="Book tickets" /></Link> */}
                    </div>
                    {/* <button></button> */}
                    {/* <div className='DescMovie'>
                                        </div> */}
                  </div>
                </div>
              </>
            ) : null}
          </>
        );
      })}
    </>
  );
};

export default MovieDetails;
