// import React, { Component } from "react";
// import SideBar from "../SideBar/SideBar";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "./Campaign.css"
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";



// class CreateCampaign extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeItem: "basic", // Default active item is 'basic'
//       // Your state variables here for each section
//       campaignName: "",
//       campaignDescription: "",
//       campaignCardImage: "",
//       campaignLocation: "",
//       campaignCategory: "",
//       campaignDuration: "",
//       teamFirstName: "",
//       teamLastName: "",
//       teamDOB: "",
//       teamPhoneNumber: "",
//       teamCountry: "",
//       teamAddress: "",
//       fundingAmount: "",
//       storyContent: '',
//       countries: [], // Array to store the list of countries
//     };
//   }
  

//   componentDidMount() {
//     // Fetch the list of countries when the component mounts
//     fetch("https://restcountries.com/v3.1/all")
//       .then((response) => response.json())
//       .then((data) => {
//         // Extract country names from the data and store them in the state
//         const countryNames = data.map((country) => country.name.common);
//         // Sort the country names alphabetically
//         countryNames.sort();
//         this.setState({ countries: countryNames });
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       });
//   }
//   handleStoryChange = (content) => {
//     this.setState({ storyContent: content });
//   };
//   handleItemClick = (itemName) => {
//     this.setState({ activeItem: itemName });
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   renderBasicContent = () => {
//     return (
//       <div className="container" >
//         <h2>Basics</h2>
//         <p className="para-left">
//           Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.
//         </p>
//         <form>
//           <div className="form-group">
//             <label className="label-left" htmlFor="campaignName">Campaign Title<span className="required">*</span></label>
//             <p className="para-left">What is the title of your campaign?</p>
//             <input
//               type="text"
//               className="form-control"
//               id="campaignName"
//               name="campaignName"
//               value={this.state.campaignName}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label className="label-left" htmlFor="campaignDescription">Campaign Description<span className="required">*</span></label>
//             <p className="para-left">Provide a short description that best describes your campaign to your audience.</p>
//             <textarea
//               className="form-control"
//               id="campaignDescription"
//               name="campaignDescription"
//               value={this.state.campaignDescription}
//               onChange={this.handleChange}
//             ></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="campaignCardImage" className="label-left">
//               Campaign Card Image<span className="required">*</span>:
//             </label>
//             <div className="square-box">
//               <label htmlFor="campaignCardImage" className="upload-label">
//                 <i className="fas fa-camera"></i>
//                 Upload Image
//                 <input
//                   type="file"
//                   id="campaignCardImage"
//                   name="campaignCardImage"
//                   onChange={this.handleImageChange}
//                 />
//               </label>
//             </div>
//           </div>


//           <div className="form-group">
//             <label className="label-left" htmlFor="campaignLocation">
//               Location<span className="required">*</span>
//             </label>
//             <p className="para-left">
//               Choose the location where you are running the campaign. This location will
//               be visible on your campaign page for your audience to see.
//             </p>
//             <select
//               className="form-control"
//               id="campaignLocation"
//               name="campaignLocation"
//               value={this.state.campaignLocation}
//               onChange={this.handleChange}
//             >
//               <option value="">Select Location</option>
//               {/* Populate the options with the list of countries */}
//               {this.state.countries.map((country, index) => (
//                 <option key={index} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           </div>;

//           <div className="form-group">
//             <label className="label-left" htmlFor="campaignCategory">Category<span className="required">*</span></label>
//             <p className="para-left">To help backers find your campaign, select a category that best represents your project.</p>
//             <select
//               className="form-control"
//               id="campaignCategory"
//               name="campaignCategory"
//               value={this.state.campaignCategory}
//               onChange={this.handleChange}
//             >
//               <option value="">Select Category</option>
//               <option value="Category 1">Category 1</option>
//               <option value="Category 2">Category 2</option>
//               {/* Add more options for categories */}
//             </select>
//           </div>
//           <div className="form-group">
//             <label className="label-left" htmlFor="campaignDuration">Campaign Duration (in days)<span className="required">*</span></label>
//             <p className="para-left">How many days will you be running your campaign for? You can run a campaign for any number of days, with a 60 day duration maximum.</p>
//             <input
//               type="number"
//               className="form-control"
//               id="campaignDuration"
//               name="campaignDuration"
//               value={this.state.campaignDuration}
//               onChange={this.handleChange}
//             />
//           </div>
//           {/* Add more input fields for other basic information */}
//         </form>
//       </div>
//     );
//   };

//   renderContentContent = () => {
//     return (
//       <div className="content-container">
//         <h2>Content</h2>
//         {/* Add content section */}
//         <div>
//         <label className="label-left" htmlFor="">Story<span className="required">*</span></label>
//         <p className="para-left">Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
//         <ReactQuill
//           theme="snow"
//           value={this.state.storyContent}
//           onChange={this.handleStoryChange}
//           placeholder="Write something amazing..."
//           className="story-input"
//           style={{ marginTop: '3rem' }} 
//         />
//         </div>
//         {/* Save Button */}
//         <Button color="blue" ripple="light" onClick={this.handleSaveContent}>Save</Button>
//       </div>
//     );
//   };
  

//   renderTeamContent = () => {
//     return (
//       <div className="content-container team-content">
//         <h2>Team</h2>
//         {/* Add team section */}
//         <form>
//           <div className="form-group">
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="label-left" htmlFor="firstName">First Name<span className="required">*</span></label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     name="firstName"
//                     value={this.state.firstName}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name<span className="required">*</span></label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     name="lastName"
//                     value={this.state.lastName}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6" >
//                 <div className="form-group">
//                   <label className="label-left" htmlFor="dob">Date of Birth<span className="required">*</span></label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="dob"
//                     name="dob"
//                     value={this.state.dob}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6" >
//                 <div className="form-group">
//                   <label htmlFor="phoneNumber">Phone Number<span className="required">*</span></label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={this.state.phoneNumber}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label className="label-left" htmlFor="country">Country<span className="required">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="country"
//                 name="country"
//                 value={this.state.country}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label className="label-left" htmlFor="address">Address<span className="required">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="address"
//                 name="address"
//                 value={this.state.address}
//                 onChange={this.handleChange}
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   };

//   renderFundingContent = () => {
//     return (
//       <div className="content-container funding-content">
//         <h2>Funding</h2>
//         <form action="">
//           <div className="form-group">
//             <label className="label-left">Who are you raising money for?<span className="required">*</span></label>
//             <p className="para-left">Choose the type of account that will be receiving your funds.</p>
//             <div>
//               <input
//                 type="radio"
//                 id="businessType1"
//                 name="businessType"
//                 value="type1"
//                 onChange={this.handleChange}
//               />
//               <label className="lll" htmlFor="businessType1">Individual</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="businessType2"
//                 name="businessType"
//                 value="type2"
//                 onChange={this.handleChange}
//               />
//               <label htmlFor="businessType2">Business or Non Profit</label>
//             </div>
//           </div>
//           <div className="form-group">
//             <label>Location<span className="required">*</span></label>
//             <select
//               className="form-control"
//               id="fundingLocation"
//               name="fundingLocation"
//               value={this.state.fundingLocation}
//               onChange={this.handleChange}
//             >
//               <option value="">Select Country</option>
//               {this.state.countries.map((country, index) => (
//                 <option key={index} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>

//           </div>
//           <div className="form-group">
//             <label>Bank Account Location<span className="required">*</span></label>
//             <select
//               className="form-control"
//               id="bankAccountLocation"
//               name="bankAccountLocation"
//               value={this.state.bankAccountLocation}
//               onChange={this.handleChange}
//             >
//               <option value="">Select Country</option>
//               {this.state.countries.map((country, index) => (
//                 <option key={index} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </form>
//       </div>
//     );
//   };


//   render() {
//     return (
//       <div className="container-fluid">
//         {/* Include the sidebar component */}
//         <div className="row">
//           <div className="col-md-3">
//             <SideBar
//               activeItem={this.state.activeItem}
//               onItemClick={this.handleItemClick}
//             />
//           </div>
//           <div className="col-md-9">
//             {/* Render content based on active item */}
//             {this.state.activeItem === "basic" && this.renderBasicContent()}
//             {this.state.activeItem === "content" && this.renderContentContent()}
//             {this.state.activeItem === "team" && this.renderTeamContent()}
//             {this.state.activeItem === "funding" && this.renderFundingContent()}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default CreateCampaign;
import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, Typography, Chip, Button } from "@material-tailwind/react";
import { HomeIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, CogIcon } from "@heroicons/react/24/solid";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "basic", // Default active item is 'basic'
      // Your state variables here for each section
      campaignName: "",
      campaignDescription: "",
      campaignCardImage: "",
      campaignLocation: "",
      campaignCategory: "",
      campaignDuration: "",
      teamFirstName: "",
      teamLastName: "",
      teamDOB: "",
      teamPhoneNumber: "",
      teamCountry: "",
      teamAddress: "",
      fundingAmount: "",
      storyContent: '',
      countries: [], // Array to store the list of countries
    };
  }

  componentDidMount() {
    // Fetch the list of countries when the component mounts
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Extract country names from the data and store them in the state
        const countryNames = data.map((country) => country.name.common);
        // Sort the country names alphabetically
        countryNames.sort();
        this.setState({ countries: countryNames });
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }

  handleStoryChange = (content) => {
    this.setState({ storyContent: content });
  };

  handleItemClick = (itemName) => {
    this.setState({ activeItem: itemName });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderBasicContent = () => {
    return (
      <div className="container">
        <h2>Basics</h2>
        <p className="para-left">
          Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.
        </p>
        <form>
          <div className="form-group mb-4">
            <label htmlFor="campaignName">Campaign Title<span className="required">*</span></label>
            <input
              type="text"
              className="input mb-2 border-0"
              id="campaignName"
              name="campaignName"
              value={this.state.campaignName}
              onChange={this.handleChange}
              placeholder="Enter campaign title"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="campaignDescription">Campaign Description<span className="required">*</span></label>
            <textarea
              className="textarea mb-2 border-0"
              id="campaignDescription"
              name="campaignDescription"
              value={this.state.campaignDescription}
              onChange={this.handleChange}
              placeholder="Enter campaign description"
            ></textarea>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="campaignCardImage" className="label-left">
              Campaign Card Image<span className="required">*</span>:
            </label>
            <input
              type="file"
              id="campaignCardImage"
              name="campaignCardImage"
              onChange={this.handleImageChange}
              className="border-0"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="campaignLocation">Location<span className="required">*</span></label>
            <select
              className="input mb-2 border-0"
              id="campaignLocation"
              name="campaignLocation"
              value={this.state.campaignLocation}
              onChange={this.handleChange}
            >
              <option value="">Select Location</option>
              {this.state.countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="campaignCategory">Category<span className="required">*</span></label>
            <select
              className="input mb-2 border-0"
              id="campaignCategory"
              name="campaignCategory"
              value={this.state.campaignCategory}
              onChange={this.handleChange}
            >
              <option value="">Select Category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
            </select>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="campaignDuration">Campaign Duration (in days)<span className="required">*</span></label>
            <input
              type="number"
              className="input mb-2 border-0"
              id="campaignDuration"
              name="campaignDuration"
              value={this.state.campaignDuration}
              onChange={this.handleChange}
              placeholder="Enter campaign duration"
            />
          </div>
          <Button color="blue" ripple="light">Save</Button>
        </form>
      </div>
    );
  };

  renderContentContent = () => {
    return (
      <div className="content-container">
        <h2>Content</h2>
        {/* Add content section */}
        <label htmlFor="">Story<span className="required">*</span></label>
        <ReactQuill
          theme="snow"
          value={this.state.storyContent}
          onChange={this.handleStoryChange}
          placeholder="Write something amazing..."
          className="story-input"
        />
        <Button color="blue" ripple="light">Save</Button>
      </div>
    );
  };

  renderTeamContent = () => {
    return (
      <div className="content-container team-content">
        <h2>Team</h2>
        {/* Add team section */}
        <form>
          {/* Add input fields for team information using Material Tailwind */}
          <Button color="blue" ripple="light">Save</Button>
        </form>
      </div>
    );
  };

  renderFundingContent = () => {
    return (
      <div className="content-container funding-content">
        <h2>Funding</h2>
        <form action="">
          {/* Add input fields for funding details using Material Tailwind */}
          <Button color="blue" ripple="light">Save</Button>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className="container-fluid">
        {/* Include the sidebar component */}
        <div className="row">
          <div className="col-md-3">
            <SideBar
              activeItem={this.state.activeItem}
              onItemClick={this.handleItemClick}
            />
          </div>
          <div className="col-md-9">
            {/* Render content based on active item */}
            {this.state.activeItem === "basic" && this.renderBasicContent()}
            {this.state.activeItem === "content" && this.renderContentContent()}
            {this.state.activeItem === "team" && this.renderTeamContent()}
            {this.state.activeItem === "funding" && this.renderFundingContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCampaign;
