import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar.tsx";
import ContextObj from "./context/ContextObj.tsx";
import Signup from "./component/Signup.tsx";
import Login from "./component/Login.tsx";
import { Toaster } from 'react-hot-toast';

import Media from "./component/Media.tsx";
function App() {
  // console.log(arr)
  return (
    <>
      <ContextObj>
        <Navbar/>
        <Toaster />
        <Routes>
          <Route path="/" element={<Media />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ContextObj>
    </>
  );
}

export default App;
