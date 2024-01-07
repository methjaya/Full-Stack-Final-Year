import React from 'react';

const Changepass = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="tab-pane fade active show" id="change-pass">
        <h2 className="text-center mt-3 mb-4">Update Password</h2>
        <hr className="border-light m-0" />
        <div className="card-body text-center">
          <div className="form-group mb-3">
            <label className="form-label">Old Password</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">New Password</label>
            <input type="text" className="form-control" />
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary mr-2">
              Update Password
            </button>
            <button type="button" className="btn btn-secondary">
              Revert Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changepass;
