import React from 'react'

const Changepass = () => {
  return (
    <div className="tab-pane fade active show" id="change-pass">

    <hr className="border-light m-0" />
    <div className="card-body">
      <div className="form-group">
        <label className="form-label">Old Password</label>
        <input type="text" className="form-control mb-1" />
      </div>
      <div className="form-group">
        <label className="form-label">New Password</label>
        <input type="text" className="form-control mb-1" />
      </div>

    </div>
    <button type="button" className="btn btn-primary">
              Update Password
            </button>
            <button type="button" className="btn btn-secondary">
              Revert changes
            </button>
  </div>
  )
}

export default Changepass