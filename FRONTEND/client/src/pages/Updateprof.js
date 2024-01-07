import React from 'react';

const UpdateProfile = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="tab-pane fade active show" id="update-profile">
        <h2 className="text-center mt-3 mb-4">Update Profile</h2>
        <hr className="border-light m-0" />
        <div className="card-body text-center">
          <div className="form-group mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary mr-2">
              Update Profile
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
