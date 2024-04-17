import React from 'react';
import { Card, Typography, List, ListItem, Chip } from "@material-tailwind/react";
import { HomeIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, CogIcon } from "@heroicons/react/24/solid"; 
const SideBar = ({ onItemClick }) => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => onItemClick("dashboard")}>
          <HomeIcon className="h-5 w-5" />
          Home
        </ListItem>
        <ListItem onClick={() => onItemClick("basic")}>
          <ShoppingBagIcon className="h-5 w-5" />
          Basic Content
        </ListItem>
        <ListItem onClick={() => onItemClick("content")}>
          <InboxIcon className="h-5 w-5" />
          Content Description
          <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
        </ListItem>
        <ListItem onClick={() => onItemClick("team")}>
          <UserCircleIcon className="h-5 w-5" />
          Team Information
        </ListItem>
        <ListItem onClick={() => onItemClick("funding")}>
          <CogIcon className="h-5 w-5" />
          Funding Details
        </ListItem>
      </List>
    </Card>
  );
};

export default SideBar;
