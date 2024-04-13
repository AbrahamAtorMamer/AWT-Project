import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

const TeamContent = () => {
    return (
        <div className="content-container team-content">
          <h2>Team</h2>
          {/* Add team section */}
          <form>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label-left" htmlFor="firstName">First Name<span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6" >
                  <div className="form-group">
                    <label className="label-left" htmlFor="dob">Date of Birth<span className="required">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6" >
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number<span className="required">*</span></label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="label-left" htmlFor="country">Country<span className="required">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="label-left" htmlFor="address">Address<span className="required">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      );
}

export default TeamContent