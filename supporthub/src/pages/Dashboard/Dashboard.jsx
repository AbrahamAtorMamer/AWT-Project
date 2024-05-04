import React, {useEffect, useState} from 'react';
import transport from '../../assets/images/Transport.jpg';
import logo from '../../assets/images/S.png';
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


  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://localhost:3000/payment/getkey")

    const { data: { order } } = await axios.post("http://localhost:3000/payment/checkout", {
        amount
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "SupportHub",
        description: "SupportHub Payment Gateway",
        image: logo,
        order_id: order.id,
        callback_url: "http://localhost:3000/payment/paymentverification",
        prefill: {
            name: "Ator Abraham",
            email: "atoragau@gmail.com",
            contact: "9624343593"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
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
                src={transport}
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
              onClick={() => checkoutHandler(100)}
                variant="white"
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Make Contribution
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Dashboard