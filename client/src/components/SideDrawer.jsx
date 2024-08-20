import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import AssistantIcon from "@mui/icons-material/Assistant";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

export default function SideDrawer() {
  const [state, setState] = React.useState({
    open: false,
  });
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ open });
  };

  const list = () => (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
      role="presentation"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          toggleDrawer(false)(event);
        }
      }}
    >
      <Typography variant="h6" gutterBottom>
        Hey User, Welcome to MythicalRealms AI!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Get some inspiration here, explore mythical ideas, and let your
        imagination run wild.
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "2px 4px",
          marginTop: 2,
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        onClick={(event) => event.stopPropagation()} // Prevent drawer from closing when clicking inside the form
        onKeyDown={(event) => event.stopPropagation()} // Prevent drawer from closing when interacting with the form
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter your prompt..."
          inputProps={{ "aria-label": "enter your prompt" }}
        />
        <Button
          type="submit"
          sx={{
            padding: "10px",
            color: "#2ECC71",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );

  return (
    <div style={{ position: "absolute", top: 1, right: 0 }}>
      <Button disabled sx={{ color: "#2ECC71" }} onClick={toggleDrawer(true)}>
        <AssistantIcon />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: {
            width: isMobile ? "80vw" : "40vw", // Set the width to 40% of the viewport width on larger screens, 80% on mobile
          },
        }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
