import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Drawer } from "@mui/material";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BASE_URL } from "../config";

const drawerWidth = 240;

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/admin/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUserEmail(data.username);
        }
      });
  }, []);

  if (userEmail) {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <CustomAppBar position="static" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/" style={{ textDecoration: "none" }}>
                <SchoolIcon fontSize="large" style={{ color: "#ffffff" }} />
              </Link>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                style={{ marginLeft: "10px" }}
              >
                Nudemy
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ marginLeft: "10px" }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </CustomAppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {handleDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {["Add Course", "All Courses"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (text === "Add Course") {
                        window.location = "/AddCourse";
                      } else if (text === "All Courses") {
                        window.location = "/Courses";
                      }
                    }}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <LibraryAddIcon />
                      ) : (
                        <LibraryAddCheckIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      </div>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <SchoolIcon fontSize="large" style={{ color: "#ffffff" }} />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              style={{ marginLeft: "10px" }}
            >
              Nudemy
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate("./signup");
              }}
              style={{ marginRight: "20px" }}
            >
              Register
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("./login");
              }}
            >
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default Appbar;
