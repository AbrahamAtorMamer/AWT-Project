import React, {useEffect, useState} from 'react';
import cybertruck from '../../assets/images/powerwall.jpeg';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import NavBarHook from '../../components/NavBarHook/NavBarHook';
import axios from "axios";

const Dashboard = () => {


  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Function to fetch campaigns from the database
  const fetchCampaigns = () => {
    axios.get('http://localhost:3000/campaign/campaigns')
      .then(response => {
        setCampaigns(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  }

  const paymentHandler = async (e) => {
    const paymentPayload = {
      amount: 500,
      currency: "INR",
      receipt:"qwsaq1"
    };
    const response = await axios.post('http://localhost:3000/payment/orders',paymentPayload);
    //const order = await response.json();
    console.log(response);
    var options = {
      key: "rzp_test_ZcomdhWidLhFkU", 
      amount:500, 
      currency:"INR",
      name: "SupportHub", 
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: response.data.id, 
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:3000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Abraham Ator", 
        email: "ator@gmail.com",
        contact: "9000000000", 
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();

  }

  return (
    <>
      <NavBarHook />
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {campaigns.map((campaign, id) => (
          <Card key={campaign.campaign_id} className="w-full">
            <CardHeader shadow={false} floated={false} className="h-96">
              <img
                src={campaign.campaign_image}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                {campaign.campaign_title}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  Capital:
                ${campaign.campaign_amount}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {campaign.campaign_description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
              onClick={paymentHandler}
                variant="white"
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Dashboard