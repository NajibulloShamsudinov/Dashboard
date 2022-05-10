import { IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const navbarTitles = {
  "/panel": "Dashboard",
  "/panel/orders": "Orders",
  "/panel/customers": "Customers",
  "/panel/reports": "Reports",
};
function NavBar(props) {
  const { open, toggleDrawer } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    sessionStorage.setItem("isLogged", false);
    navigate("/signIn");
  };

  console.log(location.pathname);

  return (
    <AppBar style={{ backgroundColor: "#000" }} position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {navbarTitles[location.pathname]}
        </Typography>
        <IconButton onClick={logout} color="inherit">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
