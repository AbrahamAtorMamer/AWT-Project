import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Campaign.css"
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Row,
} from "@material-tailwind/react";
import NavBarHook from "../../components/NavBarHook/NavBarHook";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const [activeItem, setActiveItem] = useState("basic");
  const [campaign_title, setCampaignName] = useState("");
  const [campaign_description, setCampaignDescription] = useState("");
  const [campaign_amount, setCampaignAmount] = useState("");
  const [campaign_image, setCampaignCardImage] = useState("");
  const [campaign_location, setCampaignLocation] = useState("");
  const [campaign_category, setCampaignCategory] = useState("");
  const [campaign_duration, setCampaignDuration] = useState("");
  const [teamFirstName, setTeamFirstName] = useState("");
  const [teamLastName, setTeamLastName] = useState("");
  const [teamDOB, setTeamDOB] = useState("");
  const [teamPhoneNumber, setTeamPhoneNumber] = useState("");
  const [teamCountry, setTeamCountry] = useState("");
  const [teamAddress, setTeamAddress] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [storyContent, setStoryContent] = useState('');
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchCountries();
  }, []);

  const fetchCategories = () => {
    axios.get("http://localhost:3000/category")
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }

  const fetchCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        countryNames.sort();
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }


  const sendCampaignDetails = async (e) => {

    e.preventDefault()

    const formData = new FormData()

    formData.append('campaign_title', campaign_title);
    formData.append('campaign_description', campaign_description);
    formData.append('campaign_amount', campaign_amount);
    formData.append('campaign_location', campaign_location);
    formData.append('campaign_category', campaign_category);
    formData.append('campaign_duration', campaign_duration);
    formData.append('campaign_image', campaign_image);

    await axios.post("http://localhost:3000/campaign", formData, {
    })
      .then(response => {
        console.log("Campaign details sent successfully:", response.data.data);
      })
      .catch(error => {
        console.error("Error sending campaign details:", error);
      });
      navigate("/dashboard");
}

  const handleStoryChange = (content) => {
    setStoryContent(content);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleChange = (e) => {
    // Use a single handler function for all input changes
    const { name, value } = e.target;
    switch (name) {
      case "campaign_title":
        setCampaignName(value);
        break;
      case "campaign_description":
        setCampaignDescription(value);
        break;
      case "campaign_amount":
        setCampaignAmount(value);
        break;
      case "campaign_image":
        setCampaignCardImage(e.target.files[0]);
        break;
      case "campaign_location":
        setCampaignLocation(value);
        break;
      case "campaign_category":
        setCampaignCategory(value);
        break;
      case "campaign_duration":
        setCampaignDuration(value);
        break;
      case "teamFirstName":
        setTeamFirstName(value);
        break;
      case "teamLastName":
        setTeamLastName(value);
        break;
      case "teamDOB":
        setTeamDOB(value);
        break;
      case "teamPhoneNumber":
        setTeamPhoneNumber(value);
        break;
      case "teamCountry":
        setTeamCountry(value);
        break;
      case "teamAddress":
        setTeamAddress(value);
        break;
      case "fundingAmount":
        setFundingAmount(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (event) => {
    setCampaignCardImage(event.target.files[0]);
  };

  const renderBasicContent = () => {
    return (
      <div className="container" >
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Basic Details</h1>
        {/* <p className="para-left">
          Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.
        </p> */}
        <form onSubmit={sendCampaignDetails} method="POST" encType='multipart/form-data'>
          <div className="form-group" style={{ width: '700px' }}>
            <label className="label-left" htmlFor="campaign_title">Campaign Title<span className="required">*</span></label>
            <p className="para-left">What is the title of your campaign?</p>
            <input
              type="text"
              className="form-control"
              id="campaign_title"
              name="campaign_title"
              value={campaign_title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ width: '700px' }}>
            <label className="label-left" htmlFor="campaign_description">Campaign Description<span className="required">*</span></label>
            <p className="para-left">Provide a short description that best describes your campaign to your audience.</p>
            <textarea
              className="form-control"
              id="campaign_description"
              name="campaign_description"
              value={campaign_description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group" style={{ width: '700px' }}>
            <label className="label-left" htmlFor="campaign_description">Campaign Description<span className="required">*</span></label>
            <p className="para-left">Provide a short description that best describes your campaign to your audience.</p>
            <input
             type="number"
              className="form-control"
              id="campaign_amount"
              name="campaign_amount"
              value={campaign_amount}
              onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="campaign_image" className="label-left">
              Campaign Card Image<span className="required">*</span>:
            </label>
            <div className="square-box">
              <label htmlFor="campaign_image" className="upload-label">
                <i className="fas fa-camera"></i>
                Upload Image
                <input
                  type="file"
                  id="campaign_image"
                  name="campaign_image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>


          <div className="form-group" style={{ width: '700px' }}>
            <label className="label-left" htmlFor="campaign_location">
              Location<span className="required">*</span>
            </label>
            <p className="para-left">
              Choose the location where you are running the campaign. This location will
              be visible on your campaign page for your audience to see.
            </p>
            <select
              className="form-control"
              id="campaign_location"
              name="campaign_location"
              value={campaign_location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              {/* Populate the options with the list of countries */}
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ width: '400px' }}>
            <label className="label-left" htmlFor="campaign_category">Category<span className="required">*</span></label>
            <p className="para-left">To help backers find your campaign, select a category that best represents your project.</p>

            <select
              className="form-control"
              id="campaign_category"
              name="campaign_category"
              value={campaign_category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category, id) => (
                <option key={category.category_id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" >
            <label className="label-left" htmlFor="campaign_duration">Campaign Duration (in days)<span className="required">*</span></label>
            {/* <p className="para-left">How many days will you be running your campaign for? You can run a campaign for any number of days, with a 60 day duration maximum.</p> */}
            <div style={{ width: '200px', height: '100px' }}>
              <input
                type="number"
                className="form-control"
                id="campaign_duration"
                name="campaign_duration"
                value={campaign_duration}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Add more input fields for other basic information */}
        </form>
        <Button color="blue" onClick={sendCampaignDetails}>Save & Continue</Button>
      </div>
    );
  };

  const renderContentContent = () => {
    return (
      <div className="content-container">
        <h2>Content</h2>
        {/* Add content section */}
        <div>
          <label className="label-left" htmlFor="">Story<span className="required">*</span></label>
          <p className="para-left">Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
          <ReactQuill
            theme="snow"
            value={this.state.storyContent}
            onChange={this.handleStoryChange}
            placeholder="Write something amazing..."
            className="story-input"
            style={{ marginTop: '3rem' }}
          />
        </div>
        {/* Save Button */}
        <Button color="blue" ripple="light" onClick={this.handleSaveContent}>Next</Button>
      </div>
    );
  };

  const renderTeamContent = () => {
    return (
      <div className="container">
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
        <Button color="blue" ripple="light">Next</Button>
      </div>
    );
  };

  const renderFundingContent = () => {
    return (
      <div className="container">
        <h2>Funding</h2>
        <form action="">
          <div className="form-group">
            <label className="label-left">Who are you raising money for?<span className="required">*</span></label>
            <p className="para-left">Choose the type of account that will be receiving your funds.</p>
            <div className="row">
              <div style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  id="businessType1"
                  name="businessType"
                  value="type1"
                  onChange={this.handleChange}
                />
                <label className="lll" htmlFor="businessType1">Individual</label>
              </div>
              <div style={{ marginRight: '10px' }}>
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
          </div>
          <div className="form-group" style={{ width: '200px' }}>
            <label>Location<span className="required">*</span></label>
            <select
              className="form-control"
              id="fundingLocation"
              name="fundingLocation"
              value={this.state.fundingLocation}
              onChange={this.handleChange}
              style={{ fontSize: '14px', padding: '5px' }}
            >
              <option value="">Select Country</option>
              {this.state.countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

          </div>
          <div className="form-group" style={{ width: '200px' }}>
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
        <Button color="blue" >Save & Continue</Button>
      </div>
    );
  };

  return (
    <>
      <NavBarHook />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideBar
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
          </div>
          <div className="col-md-9">
            {activeItem === "basic" && renderBasicContent()}
            {activeItem === "content" && renderContentContent()}
            {activeItem === "team" && renderTeamContent()}
            {activeItem === "funding" && renderFundingContent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCampaign;
