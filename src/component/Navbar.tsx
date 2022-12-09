import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link ,useNavigate} from "react-router-dom";

interface Props {
  window?: () => Window;
}

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate()
  const logout = (): void => {
    localStorage.removeItem("auth-token");
    navigate("/login")
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ background: "#3f3f3f" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/">
              <img
                src="https://cdn3.vectorstock.com/i/1000x1000/35/17/girl-with-headphone-listening-to-music-logo-icon-vector-36233517.jpg"
                height="65rem"
                width="65rem"
                alt=""
                style={{
                  marginTop: "8px",
                  marginLeft: "3rem",
                  borderRadius: "50%"
                }}
              />
            </Link>
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "5rem" }}
          >
            {localStorage.getItem("auth-token") === null ? (
              <Link to="/Login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#fff", margin: "0.4rem" }}>Login</Button>
              </Link>
            ) : (
              <Button sx={{ color: "#fff", margin: "0.1rem" }}>
                Hi {localStorage.getItem("username")}
              </Button>
            )}
            {localStorage.getItem("auth-token") === null ? (
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#fff", margin: "0.3rem" }}>
                  Sign Up
                </Button>
              </Link>
            ) : (
              <Button sx={{ color: "#fff", margin: "0.3rem" }} onClick={logout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
        
      </AppBar>
      
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
