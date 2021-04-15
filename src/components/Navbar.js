import React from "react";
// import "../media/CoLab.css";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';


import logo from "../media/sivitus_logo_blue-01.png";

const Navbar = () => {
  return (
    <AppBar position="static">
      <ToolBar>
        <Typography variant="h5" style={{flexGrow: 1}} color="secondary">
          SynchroCise
        </Typography>
        <Button>Sign In</Button>
        <Button color="secondary">Sign Up</Button>
      </ToolBar>
    </AppBar>
  );
};

export default Navbar;
