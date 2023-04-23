
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export function CrudDetails() {
// Set state for details and retrieve params

  const [details, setDetails] = useState(null);
  const params = useParams();

// UseEffect to get details for the user

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/users/${params.id}`,
    }).then((res) => {
      setDetails(res.data);
    });
  }, [params.id]);

// Show a loading message if details are not available yet

  if (!details) {
    return <div>Loading...</div>;
  }

// Display the user details and a link to go back to user list


  return (
    <div className="container-fluid mt-3">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h4 className="mt-5">User Details</h4>
            </div>
            <div className="col-6">
              <div className="col-md-6">
                <dl className="row">
                  <dt className="col-sm-3 fw-bold">UserName</dt>
                  <dd className="col-sm-9">{details.username}</dd>
                  <dt className="col-sm-3 fw-bold">Pincode</dt>
                  <dd className="col-sm-9">{details.pincode}</dd>
                  <dt className="col-sm-3 fw-bold">City</dt>
                  <dd className="col-sm-9">{details.city}</dd>
                  <dt className="col-sm-3 fw-bold">State</dt>
                  <dd className="col-sm-9">{details.state}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/getUser" className="btn btn-primary mt-3">
        Back To User List
      </Link>
    </div>
  );
}


