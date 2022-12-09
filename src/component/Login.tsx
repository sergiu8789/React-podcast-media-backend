import React,{useState,useContext} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Context from "../context/CreateContext.tsx";
import { Link } from "react-router-dom";
import "./style.css";

export default function Login() {
    const {loginUser} = useContext<{
        loginUser: Function
    }>(Context)
    const [login,setLogin] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        setLogin({...login,[e.target.name]:e.target.value})
    }
    
    const handleLogin = ()=>{
        loginUser(login)
    }
  return (
    <Card
      className="card-container"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "35%",
        height: "25rem",
        background: "#30343b",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <span>
          <h3
            style={{
              marginLeft: "33%",
              color: "#FFFFFF",
            }}
          >
            Login Your Account
          </h3>
        </span>
        
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80%", marginLeft: "10%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            type="email"
            name="email"
            onChange={handleChange}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{ input: { color: "white" } }}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80%", marginLeft: "10%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            name="password"
            type= "password"
            onChange={handleChange}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{ input: { color: "white" } }}
          />
        </Box>
        
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: "absolute",
            top: "75%",
            right: "5%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Button variant="contained" onClick={handleLogin} >Login</Button>
          
        </Stack>
      </CardActions>
      <div style={{color: "#FFFFFF", marginTop: "5rem", marginLeft: "30%"}} >
            <span>Don't have an Account ? </span>
            <Link to="/signup" style={{textDecoration: "none"}} ><span style={{cursor: "pointer",color: "#FFFFFF"}} >Sign Up</span></Link>
          </div>
    </Card>
  )
}
