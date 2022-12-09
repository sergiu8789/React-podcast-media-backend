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
export default function Signup() {
    const {submitData} = useContext<{
        submitData: Function
    }>(Context)
    const [user,setUser] = useState<object>({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    })
    const handleChange = (e): void =>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit = (): void =>{
        submitData(user)
    }
  return (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "35%",
        height: "35rem",
        background: "#30343b",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <span>
          <h3
            style={{
              marginLeft: "35%",
              color: "#FFFFFF",
            }}
          >
            Sign up Here
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
            label="Name"
            variant="filled"
            name="name"
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
            label="Confirm Password"
            variant="filled"
            name="cpassword"
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
          <Button variant="contained" onClick={handleSubmit} >Sign Up</Button>
          
        </Stack>
      </CardActions>
      <div style={{color: "#FFFFFF", marginTop: "5rem", marginLeft: "30%"}} >
            <span>Have already Account ? </span>
            <Link to="/login" style={{textDecoration: "none"}} ><span style={{cursor: "pointer",color: "#FFFFFF"}} >Login</span></Link>
          </div>
    </Card>
  );
}
