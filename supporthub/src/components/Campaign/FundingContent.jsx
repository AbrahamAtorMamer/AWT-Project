import React from 'react'

const FundingContent = () => {
    return (
        <div className="content-container funding-content">
          <h2>Funding</h2>
          <form action="">
            <div className="form-group">
              <label className="label-left">Who are you raising money for?<span className="required">*</span></label>
              <p className="para-left">Choose the type of account that will be receiving your funds.</p>
              <div>
                <input
                  type="radio"
                  id="businessType1"
                  name="businessType"
                  value="type1"
                  onChange={this.handleChange}
                />
                <label className="lll" htmlFor="businessType1">Individual</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="businessType2"
                  name="businessType"
                  value="type2"
                  onChange={this.handleChange}
                />
                <label htmlFor="businessType2">Business or Non Profit</label>
              </div>
            </div>
            <div className="form-group">
              <label>Location<span className="required">*</span></label>
              <select
                className="form-control"
                id="fundingLocation"
                name="fundingLocation"
                value={this.state.fundingLocation}
                onChange={this.handleChange}
              >
                <option value="">Select Country</option>
                {this.state.countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
  
            </div>
            <div className="form-group">
              <label>Bank Account Location<span className="required">*</span></label>
              <select
                className="form-control"
                id="bankAccountLocation"
                name="bankAccountLocation"
                value={this.state.bankAccountLocation}
                onChange={this.handleChange}
              >
                <option value="">Select Country</option>
                {this.state.countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      );
}

export default FundingContent