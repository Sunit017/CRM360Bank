import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const SideDrawer = ({ isDrawerOpen, drawerOpen, Component }) => {
  /* istanbul ignore next */
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    isDrawerOpen(open);
  };

  return (
    <Drawer
      data-testid="drawer-slide"
      anchor={"right"}
      open={drawerOpen}
      onClose={toggleDrawer("right", false)}
    >
      <Box
        sx={{
          width: 650,
        }}
        role="presentation"
      >
        <IconButton
          data-testid="close-button"
          title="Close"
          onClick={toggleDrawer("right", false)}
          style={{ position: "absolute", right: 0, top: 0, color: "#000" }}
        >
          <Close />
        </IconButton>
        {Component}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
