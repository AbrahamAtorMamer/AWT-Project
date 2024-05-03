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
  return (
    <>
      <NavBarHook />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {campaigns.map((campaign, id) => (
          <Card key={campaign.campaign_id} className="w-full">
            <CardHeader shadow={false} floated={false} className="h-96">
              <img
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
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
                  $95.00
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
                variant="gradient"
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