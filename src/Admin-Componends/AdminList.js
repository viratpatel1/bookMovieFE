import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const local = "http://localhost:4000/";
const url = "https://books-my-shows.onrender.com/";

function AdminList() {
  const [item, setItems] = useState();
  const history = useHistory();
  const AutoReload = () => {
    fetch(`${url}u`)
      .then((res) => res.json())
      .then((res) => setItems(res));
  };

  useEffect(() => {
    AutoReload();
  }, []);

  return (
    <>
      <Sidebar />
      <div>
        <h3>Todo List</h3>
        {item &&
          item.map((todo) => {
            const { _id, movie_name } = todo;
            return (
              <>
                <div key={_id}>
                  <tr>
                    <td>{movie_name}</td>
                    <td>{_id}</td>
                    <td>
                      <Link to={`/admin/updatemovies/${_id}`}> Edit</Link>
                    </td>
                  </tr>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default AdminList;
// onClick={() => Handle(_id)}
