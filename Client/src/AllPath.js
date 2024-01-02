import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from "./Home/Home";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Chatpage from './Chat-page/Chatpage';



function AllPath()  {
    return (
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home />} >
          </Route>
        <Route exact path="/login" element={<Login />} >
        </Route>
        <Route exact path="/signup" element={<Signup />} >
        </Route>
        <Route exact path="/chat" element={<Chatpage />} >
        </Route>
        </Routes>
      </BrowserRouter>
  
  );
    }
    
  
  export default AllPath;