// import './CSS/App.css';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
// import Movies from '../Admin/Movies';
import Moviess from "./Movies"
import EditMovie from './EditMovie';
import AdminMovies from "./AdminMovies";



function Apps()
{
    const history = useHistory();
    const token = localStorage.getItem("token");
    useEffect(() =>
    {
        try
        {

            if ((token !== "undefined") && (token !== "") && (token !== null))
            {
                history.push("/admin/viewmovies");

            } else
            {
                history.push("/login");
            }


        } catch (err)
        {
            console.log("Something went wrong")

        }

    }, [token])

    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route exact path='/admin/uploadmovies' component={Moviess} />
                <Route exact path='/admin/viewmovies' component={AdminMovies} />
                <Route exact path='/admin/updatemovies/:id' component={EditMovie} />
            </Switch>
        </Router>
    );
}

export default Apps;
