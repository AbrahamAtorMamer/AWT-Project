// import React from 'react'

// const BasicContent = () => {
//     return (
//         <div className="container" >
//           <h2>Basics</h2>
//           <p className="para-left">
//             Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.
//           </p>
//           <form>
//             <div className="form-group">
//               <label className="label-left" htmlFor="campaignName">Campaign Title<span className="required">*</span></label>
//               <p className="para-left">What is the title of your campaign?</p>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="campaignName"
//                 name="campaignName"
//                 value={this.state.campaignName}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label className="label-left" htmlFor="campaignDescription">Campaign Description<span className="required">*</span></label>
//               <p className="para-left">Provide a short description that best describes your campaign to your audience.</p>
//               <textarea
//                 className="form-control"
//                 id="campaignDescription"
//                 name="campaignDescription"
//                 value={this.state.campaignDescription}
//                 onChange={this.handleChange}
//               ></textarea>
//             </div>
//             <div className="form-group">
//               <label htmlFor="campaignCardImage" className="label-left">
//                 Campaign Card Image<span className="required">*</span>:
//               </label>
//               <div className="square-box">
//                 <label htmlFor="campaignCardImage" className="upload-label">
//                   <i className="fas fa-camera"></i>
//                   Upload Image
//                   <input
//                     type="file"
//                     id="campaignCardImage"
//                     name="campaignCardImage"
//                     onChange={this.handleImageChange}
//                   />
//                 </label>
//               </div>
//             </div>
  
  
//             <div className="form-group">
//               <label className="label-left" htmlFor="campaignLocation">
//                 Location<span className="required">*</span>
//               </label>
//               <p className="para-left">
//                 Choose the location where you are running the campaign. This location will
//                 be visible on your campaign page for your audience to see.
//               </p>
//               <select
//                 className="form-control"
//                 id="campaignLocation"
//                 name="campaignLocation"
//                 value={this.state.campaignLocation}
//                 onChange={this.handleChange}
//               >
//                 <option value="">Select Location</option>
//                 {/* Populate the options with the list of countries */}
//                 {this.state.countries.map((country, index) => (
//                   <option key={index} value={country}>
//                     {country}
//                   </option>
//                 ))}
//               </select>
//             </div>;
  
//             <div className="form-group">
//               <label className="label-left" htmlFor="campaignCategory">Category<span className="required">*</span></label>
//               <p className="para-left">To help backers find your campaign, select a category that best represents your project.</p>
//               <select
//                 className="form-control"
//                 id="campaignCategory"
//                 name="campaignCategory"
//                 value={this.state.campaignCategory}
//                 onChange={this.handleChange}
//               >
//                 <option value="">Select Category</option>
//                 <option value="Category 1">Category 1</option>
//                 <option value="Category 2">Category 2</option>
//                 {/* Add more options for categories */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label className="label-left" htmlFor="campaignDuration">Campaign Duration (in days)<span className="required">*</span></label>
//               <p className="para-left">How many days will you be running your campaign for? You can run a campaign for any number of days, with a 60 day duration maximum.</p>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="campaignDuration"
//                 name="campaignDuration"
//                 value={this.state.campaignDuration}
//                 onChange={this.handleChange}
//               />
//             </div>
//             {/* Add more input fields for other basic information */}
//           </form>
//         </div>
//       );
// }

// export default BasicContent