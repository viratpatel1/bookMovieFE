import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import "./Admin-CSS/EditMovieFrom.css";
import Sidebar from './Sidebar';
// import { Link } from 'react-router-dom';



function EditMovieFrom({ todo, onSubmit })
{
    const history = useHistory()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            movie_name: todo ? (todo.movie_name) : "",
            release_date: todo ? (todo.release_date) : "",
            description: todo ? (todo.description) : "",
            // poster_path: todo ? todo.poster_path : "",
        },
    });

    const submitHandler = handleSubmit((data) =>
    {
        onSubmit(data)
        alert(JSON.stringify(data))
        history.push("/admin/viewmovies")
    });

    // const Back = () =>
    // {
    // }
    return (
        <>
            {/* <Sidebar /> */}
            <div className="Edit">
                <form onSubmit={submitHandler}>
                    <input {...register("movie_name")} type="text" name="movie_name" id="text" placeholder="Movie name"></input>
                    {/* <input {...register("release_date")} type="text" name="release_date" id="text" placeholder="Release date"></input> */}
                    <input {...register("description")} type="text" name="description" id="text" placeholder="Description"></input>
                    <button type="submit">Edit</button>
                    {/* <Link to={"/admin/viewmovies"} ><button>Edit</button></Link> */}

                </form>
            </div>
        </>
    )
}

export default EditMovieFrom
