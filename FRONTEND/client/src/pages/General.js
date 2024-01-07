import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

const General = () => {
  return (
    <div className="container my-5"> {/* Added container class and margin top */}
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="tab-pane fade active show" id="account-general">
          <h2 className="text-center mt-3 mb-4"> </h2>
          <h2 className="text-center mt-3 mb-4"> </h2>
          <h2 className="text-center mt-3 mb-4"> </h2>
          <h2 className="text-center mt-3 mb-4"> </h2>
          <h2 className="text-center mt-3 mb-4"> </h2>
          <div className="card-body media align-items-center">
             <h2 className="text-center mt-3 mb-4"></h2>
            <h3 className="text-center mb-3">General</h3>
            <img
  src="https://static.vecteezy.com/system/resources/previews/013/146/221/non_2x/athlete-athletics-avatar-fitness-gym-blue-dotted-line-line-icon-free-vector.jpg"
  alt="Avatar"
  className="d-block mx-auto mb-3" // Added mx-auto for centering and mb-3 for bottom margin
  style={{ maxWidth: '150px', height: 'auto' }} // Set max-width to control the image size
/>

            <div className="media-body ml-4">
              <label className="btn btn-outline-primary">
                Upload new photo
                <input type="file" className="account-settings-fileinput" />
              </label>
              &nbsp;
              <button type="button" className="btn btn-default md-btn-flat">
                Reset
              </button>
              <div className="text-light small mt-1">Allowed JPG, GIF, or PNG. Max size of 800K</div>
            </div>
          </div>
          <hr className="border-light m-0" />
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="form-control mb-1" />
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="text" className="form-control mb-1" />
            </div>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input type="text" className="form-control mb-1" />
              <div className="alert alert-warning mt-3">
                Your email is not confirmed. Please check your inbox.<br />
                <a href="javascript:void(0)">Resend confirmation</a>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-primary mr-4">
              Save Profile
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
          <h2 className="text-center mt-3 mb-4"></h2>
        </div>
      </div>
    </div>
  );
}

export default General;
