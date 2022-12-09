import React, { useState } from "react";
import Context from "./CreateContext.tsx";
import img from "../img/music.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import song from "../song/128-Dil De Diya Hai - Thank God 128 Kbps.mp3";
import toast from "react-hot-toast";

export default function ContextObj(props) {
  const navigate = useNavigate();

  const [songname, setSongname] = useState<string>(song);
  const [cover, setCover] = useState<string>(img);
  const submitData = async (user) => {
    const name = user.name;
    const email = user.email;
    const password = user.password;
    const cpassword = user.cpassword;
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const reg =  /([!@#$%^&*0-9a-zA-Z]+){8,15}/;
    if (name === "" || email === "" || password == "") {
      return toast.error("Field Cannot Be Empty", {
        duration: 2000,
      });
    } else if (!regex.test(email)) {
      return toast.error("Please Put Valid Email", {
        duration: 2000,
      });
    } else if(!reg.test(password)){
      return toast.error("Password Must Contain Min 8 Character", {
        duration: 2000,
      });
    }
    try {
      const { data } = await axios.post("http://localhost:5000/api/post", {
        name,
        email,
        password,
        cpassword,
      });
      if (data === "password does not match") {
        toast.error("password does not match", {
          duration: 2000,
        });
      } else if (data === "Email already exists") {
        toast.error("Email already exists", {
          duration: 2000,
        });
      } else {
        toast.success("Sign up Successfully", {
          duration: 2000,
        });
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("username", data.data.name);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [playSong,setPlaySong] = useState<boolean>(false)
  const loginUser = async (login) => {
    const email = login.email;
    const password = login.password;
    try {
      const { data } = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (data === "invalid informations") {
        toast.error("Please Put Valid Information", {
          duration: 2000,
        });
      } else {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("username", data.data.name);
        navigate("/");
        toast.success("Login Successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Context.Provider
      value={{
        songname,
        cover,
        setSongname,
        setCover,
        submitData,
        loginUser,
        alert,
        playSong,
        setPlaySong
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
