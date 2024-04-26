import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";
import logo from '../../assets/images/S.png';
import LogoutButton from '../Auth/Login/LoginButton';

const NavBar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" style={{ position: 'sticky', top: 0 }}>
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="mr-4 cursor-pointer py-1.5" style={{ width: '7.5rem', height: '6.5rem', maxHeight: '6.5rem' }} />
          </NavLink>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
            <NavLink to="/create-campaign" className="flex items-center">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Campaign</span>
            </Button>
            </NavLink>
            <NavLink to="/login" className="flex items-center">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            </NavLink>
            <NavLink to="/registration" className="flex items-center">
            {/* <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button> */}
            <LogoutButton/>
            </NavLink>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="flex items-center gap-x-1">
          <NavLink to="/create-campaign" className="flex items-center">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Campaign</span>
            </Button>
            </NavLink>
            <NavLink to="/login" className="flex items-center">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            </NavLink>
            <NavLink to="/registration" className="flex items-center">
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
            </NavLink>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar