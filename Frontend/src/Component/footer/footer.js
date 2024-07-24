// src/components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "7%",
        color: "whitesmoke",
        backgroundColor: "#8ecae6",
        position: "fixed",
        bottom: 0,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        paddingLeft: 2,
      }}
    >
      <Typography variant="body1" sx={{ position: "absolute", top: "40%",fontSize:"80%" }}>
        ©2024 Pozent. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
