import React from 'react'

const Updateprof = () => {
  return (
    <div className="tab-pane fade active show" id="change-pass">

    <hr className="border-light m-0" />
    <div className="card-body">
      <div className="form-group">
        <label className="form-label">Edit Name</label>
        <input type="text" className="form-control mb-1" />
      </div>
      <div className="form-group">
        <label className="form-label">Edit Phone Number</label>
        <input type="text" className="form-control mb-1" />
      </div>

    </div>
    <button type="button" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary">
              Revert Changes
            </button>
  </div>
  )
}

export default Updateprof