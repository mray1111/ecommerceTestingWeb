import React, { Fragment,useState } from 'react';
import "./styles.css" ;
import { SpeedDial, SpeedDialAction, speedDialActionClasses } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";

const UserOptions = ({ user }) => {
  const [open,setOpen]= useState(false) ;
  const navigate = useNavigate();
  const alert = useAlert();


 const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    // dispatch(logout());
    alert.success("Logout Successfully");
  }


  return <Fragment>
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              onClose={() => setOpen(false)}
              onOpen ={() =>setOpen(true) }
              open ={open}
              direction ="down"
              icon = {
                  <img
                    className="speedDialIcon" 
                    src={user.avatar.url ? user.avatar.url: "/Profile.png"} 
                    alt = "Profile"
                  />  
              }>
    
    {options.map((item) => (
          <SpeedDialAction 
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
               
            </SpeedDial>
        </Fragment>
}

export default UserOptions;