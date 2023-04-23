
import axios from "axios";
import { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

export function CrudIndex() {
  const [userDetails, setUserDetails] = useState([]);

  // Fetch user data from server
  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/users",
    })
      .then((res) => {
        setUserDetails(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Delete user record
  function deleteClick(e) {
    const flag = window.confirm("Are you sure you want to delete?");
    if (flag===true) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:5000/users/${e.currentTarget.value}`
      })
        .then(() => {
          alert("Record Deleted");
          // navigate("/home");
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Render user data table
  return (
    <div className="container-fluid">
      <h2 className="mt-3">User List</h2>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Pincode</th>
            <th>City</th>
            <th>State</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user) => (
            <tr key={user._id}>
              <td key={user.username}>{user.username}</td>
              <td key={user.pincode}>{user.pincode}</td>
              <td key={user.city}>{user.city}</td>
              <td key={user.state}>{user.state}</td>
              <td>
                <Link
                  to={"/getOneUser/"+user._id}
                  className="btn btn-info"
                >
                  <span className="bi bi-eye"></span>
                </Link>
              </td>
              <td>
                <Link
                  to={"/updateUser/" + user._id}
                  className="btn btn-warning"
                >
                  <span className="bi bi-pen"></span>
                </Link>
              </td>
              <td>
                <button
                  value={user._id}
                  className="btn btn-danger"
                  onClick={deleteClick}
                >
                  <span className="bi bi-trash"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>   
      </table>
      <div className="mt-3">
         <Link to="/" className="btn btn-primary" >Create New User Details</Link>
      </div>
    </div>
  );
}
