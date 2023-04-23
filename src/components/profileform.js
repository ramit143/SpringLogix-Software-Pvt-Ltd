
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ProfileForm() {
  // initialize navigate hook to redirect to another page after submission
  const navigate = useNavigate();
  // initialize state for pincode and city/state object
  const [pincode, setPincode] = useState('');
  const [cityState, setCityState] = useState({});

  // function to handle form submission

  const handleSubmit = (event) => {
    event.preventDefault();
    // convert form data to an object
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    // merge city and state from API to the form data object
    const mergedData = { ...data, city: cityState.city, state: cityState.state };
    console.log(mergedData);
    // send POST request to server to save data
    axios.post('http://localhost:5000/users', mergedData).then((res) => {
      console.log(res.data);
    });
    // show success message and navigate to user list page
    alert('Inserted successfully');
    navigate('/getUser');
  };

  // function to handle API call for pincode
  const handlePincode = () => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
        // check if response has data and set city/state accordingly
        if (res.data && res.data[0] && res.data[0].PostOffice) {
          const postOffice = res.data[0].PostOffice[0];
          setCityState({ city: postOffice.District, state: postOffice.State });
        } else {
          console.log('Invalid pincode');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };


  // useEffect hook to set city and state values in form input fields

  useEffect(() => {
    if (cityState.city && cityState.state) {
      document.getElementsByName('city')[0].value = cityState.city;
      document.getElementsByName('state')[0].value = cityState.state;
    }
  }, [cityState]);

  // return the JSX for the profile form

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input name="username" type="text" className="form-control" placeholder="user name" />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <div className="input-group">
                <input
                  name="pincode"
                  type="number"
                  className="form-control"
                  placeholder="pincode"
                  value={pincode}
                  onBlur={handlePincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input name="city" type="text" className="form-control" value={cityState.city} disabled placeholder="City" />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input name="state" value={cityState.state} type="text" className="form-control" disabled placeholder="State" />
            </div>
            <button type="submit" className="btn btn-success mr-2 mt-4 ms-2">
              Save
            </button>
            <Link to="/getUser" className="btn btn-secondary ms-2 mt-4">
              Back To User List
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;



