import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Home";
import Groups from "../Pages/Groups/Groups";
// import InProgress from "../Pages/InProgress/InProgress";
// import Completed from "../Pages/Completed/Completed";
// import Shopowner from "../Pages/Shopowner/Shopowner";
// import Jobs from "../Pages/Jobs/Jobs";
// import JobDetails from "../Pages/JobDetails/JobDetails";
// import DriverDetails from "../Pages/DriverDetails/DriverDetails";
// import ProductDetails from "../Pages/ProductDetails/ProductDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/groups' element={<Groups/>}/>
      <Route path="/emotion/:emotion" element={<EmotionPage />} />

      {/* 
      <Route path='/inprogress' element={<InProgress/>}/>
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/home/shopowner' element={<Shopowner/>}/>
      <Route path='/home/Jobs' element={<Jobs/>}/>
      <Route path='/JobDetails' element={<JobDetails/>}/>
      <Route path='/DriverDetails' element={<DriverDetails/>}/>
      <Route path='/ProductDetails' element={<ProductDetails/>}/> */}
    </Routes>
  );
}
