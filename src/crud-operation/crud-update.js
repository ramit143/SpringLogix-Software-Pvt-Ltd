
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import './crud-update.css'
import React, { useState, useEffect } from 'react';


export function CrudUpdate() {
  
  const navigate = useNavigate();
  const params = useParams();
  const [pincode, setPincode] = useState('');
  const [cityState, setCityState] = useState({});

  
  // Handle form submission on update button click

  function handleUpdate(event) {
   
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const mergedData = { ...data, city: cityState.city, state: cityState.state };
    console.log(mergedData);
   

    // Make API request to update user data

    axios.put(`http://localhost:5000/users/${params.id}`,  mergedData)
      .then((res) => {
        console.log(res.data);
      });
    alert("Updated successfully");
  // Navigate to user list page after successful update
    navigate("/getUser");
  }

   // Handle API request on pincode input blur
  const handlePincode = () => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
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
  
  // Set city and state values when fetched from API
  useEffect(() => {
    if (cityState.city && cityState.state) {
      document.getElementsByName('city')[0].value = cityState.city;
      document.getElementsByName('state')[0].value = cityState.state;
    }
  }, [cityState]);

 

  return (
    <div className="container mx-auto">
      <form onSubmit={handleUpdate} className="needs-validation col-md-6" noValidate>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            name="username"
            type="text"
            className="form-control custom-input ms-5"
            id="username"
            placeholder="Enter user name"
            required
           
          />
        
          <div className="invalid-feedback">Please provide a user name.</div>
        </div>
        <div className="form-group">
          <label htmlFor="pincode" className=''>Pincode</label>
          <input
            name="pincode"
            type="number"
            className="form-control custom-input ms-5"
            id="pincode"
            placeholder="Enter pincode"
            required
            onBlur={handlePincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <div className="invalid-feedback">Please provide a valid pincode.</div>
        </div>
        <div className="form-group">
              <label htmlFor="city">City</label>
              <input name="city" type="text" className="form-control custom-input ms-5" value={cityState.city} disabled placeholder="City" />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input name="state" value={cityState.state} type="text" className="form-control custom-input ms-5" disabled placeholder="State" />
            </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update
        </button>
        <Link to="/getUser" className="btn btn-secondary ms-3 mt-3">
          Back to User List
        </Link>
      </form>
    </div>
  );
}
