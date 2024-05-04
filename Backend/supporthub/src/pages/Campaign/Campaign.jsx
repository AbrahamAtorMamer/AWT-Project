// import React, { Component } from "react";

// import toast from 'react-hot-toast'
// let jwt = require('jsonwebtoken')

// class Campaign extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             campaign: {
//                 campaign_name: "Sample Campaign",
//                 campaign_description: "This is a sample campaign description.",
//                 campaign_target: 100, // Dummy target amount
//                 creator: "sample@example.com", // Dummy creator email
//                 campaign_contributors: ["contributor1@example.com", "contributor2@example.com"] // Dummy contributors
//             },
//             donation_amount: 0,
//             current_campaign_donation: 50, // Dummy current donation
//             vendor_address: '',
//             vendor_donation: '',
//             email: '',

//             // campaign requests
//             current_requests: []
//         }
//     }

//     componentDidMount = async () => {
//         // Simulate fetching data from API or blockchain
//         // Set dummy data for demonstration purposes
//         let token = (localStorage.getItem("token"))
//         if (token) {
//             let { email } = jwt.decode(JSON.parse(token))
//             this.setState({ email })
//         } else {
//             alert('Please Sign in to donate')
//             window.location.href = '/login'
//         }

//         // Simulate fetching campaign details
//         // Set dummy campaign data
//         // Simulate fetching withdrawal requests
//         // Set dummy withdrawal requests data
//     }

//     donate = async () => {
//         // Simulate donation functionality
//         // Display toast message
//         toast.success(`Thank you for supporting, ${this.state.campaign.campaign_name}`);
//     }

//     render() {
//         let campaign = this.state.campaign;
//         return (
//             <div className="container-fluid">
//                 <div className="row">
//                     <div
//                         className="col-sm-9 mx-auto card my-3 p-2"
//                         style={{ borderRadius: '14px', boxShadow: '0px 0px 10px 0px black' }}
//                     >
//                         <h3 className="mt-3">
//                             {campaign.campaign_name}
//                         </h3>
//                         <h5 className="mt-3">
//                             {campaign.campaign_description}
//                         </h5>
//                         <hr />
//                         <div className="row mx-1">
//                             <div
//                                 className="col-sm-5 card my-2"
//                                 style={{ borderRadius: '14px', boxShadow: '0px 0px 10px 0px black' }}
//                             >
//                                 <h5 className="text-center my-auto">
//                                     Current Donation: {this.state.current_campaign_donation} Ether
//                                     <br />
//                                 </h5>
//                                 <p style={{ color: 'red' }}>{Math.trunc(this.state.current_campaign_donation / campaign.campaign_target * 100)}%</p>
//                                 <hr />
//                                 <h5 className="text-center mb-0">
//                                     Goal: {campaign.campaign_target} Ether
//                                 </h5>
//                             </div>
//                             <div
//                                 className="col-sm-6 card mx-auto my-2"
//                                 style={{ borderRadius: '14px', boxShadow: '0px 0px 10px 0px black' }}
//                             >
//                                 <h5>
//                                     <u>
//                                         Donate
//                                     </u>
//                                 </h5>
//                                 <input
//                                     type="number"
//                                     placeholder='Enter Amount In Ether'
//                                     className="col-sm-11 mx-auto"
//                                     onChange={(e) => {
//                                         let amount = 0;
//                                         if (e.target.value !== '') {
//                                             amount = e.target.value; // No conversion needed for dummy data
//                                         }
//                                         this.setState({ donation_amount: amount })
//                                     }}
//                                 />
//                                 <br />
//                                 <button
//                                     className="btn btn-primary my-2 col-6 mx-auto"
//                                     onClick={this.donate}
//                                 >
//                                     Donate
//                                 </button>
//                                 <hr />
//                             </div>
//                         </div>
//                         <hr />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Campaign;
