import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { getProfileDetails, updateProfile } from "../utils/API";


const General = () => {
  const [profileData, setProfileData] = useState({
    email: '',
    gender: '',
    name: '',
    phoneNumber: '',
  });
  const loggedIn = Auth.isLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      return <Navigate to="/login" />;
    }

    const token = Auth.getJwtToken();

    try {
      getProfileDetails(token).then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong!")
        }
        response.json().then((data) => {          
          setProfileData({
            email: data.email,
            gender: data.gender,
            name: data.name,
            phoneNumber: data.phoneNumber,
          });
        });
      })

    }
    catch (e) {
      console.log(e)
    }
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {

    event.preventDefault();
    try {
      const token = Auth.getJwtToken();
      if (!token) {
        alert("Token is missing!");
        return;
      }
      const details = {
        "details": profileData
      }
      const response = await updateProfile(token, details);

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      alert("Profile Updated!");

    } catch (err) {
      console.error(err);
      alert("Failed to update data!");
    }
  };

  return (
    <div className="container my-3"> {/* Added container class and margin top */}
      <div className="d-flex flex-column align-items-center justify-content-center ">
        <div className="tab-pane fade active show" id="account-general">
          <div className="card-body media align-items-center">
            <h3 className="text-center mb-3">Change Details</h3>
            <img
              src="https://static.vecteezy.com/system/resources/previews/013/146/221/non_2x/athlete-athletics-avatar-fitness-gym-blue-dotted-line-line-icon-free-vector.jpg"
              alt="Avatar"
              className="d-block mx-auto mb-3"
              style={{ maxWidth: '150px', height: 'auto' }}
            />
          </div>
          <hr className="border-light m-0" style={{ width: "100%" }} />
          <form onSubmit={onSubmit}>
            <div className="card-body" style={{ width: "100%" }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="text" className="form-control mb-1" id='email' name='email' onChange={onChange} value={profileData.email} />
              </div>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-control mb-1" id='name' name='name' onChange={onChange} value={profileData.name} />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <input type="text" className="form-control" id='gender' name='gender' onChange={onChange} value={profileData.gender} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" id='phno' name='phoneNumber' onChange={onChange} value={profileData.phoneNumber} />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary mr-4">
                Save Profile
              </button>
            </div>
          </form>
          <h2 className="text-center mt-3 mb-4"></h2>
        </div>
      </div>
    </div>
  );
}

export default General;
