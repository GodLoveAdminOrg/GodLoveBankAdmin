import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Home";
import Groups from "../Pages/Groups/Groups";
import EmotionPage from "../Pages/Groups/EmotionPage";
import BaseDescriptionPage from "../Pages/Groups/BaseDescriptionPage";
import MediaControl from "../Pages/Media/MediaControl";
import Ecommerce from "../Pages/Dashboard/Orders";
import CoreValues from "../Pages/CoreValues/CoreValues";
import ToolsOfThinking from "../Pages/ToolsOfThinking/ToolsOfThinking";
import ToolsDetailPage from "../Pages/ToolsOfThinking/ToolsDetailPage";
import ChatPage from "../Pages/Chat/ChatPage";
import UserTable from "../Pages/Product/Product";
import SubAdminPage from "../Pages/SubAdminPage/SubAdminPage";
// import JobDetails from "./Pages/JobDetails/JobDetails"; // ✅ import this



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<UserTable />} />
      <Route path="/orders" element={<Ecommerce />} />
      <Route path='/groups' element={<Groups/>}/>
      {/* <Route path="/JobDetails" element={<JobDetails />} />  */}
      <Route path="/emotion/:emotion" element={<EmotionPage />} />
      <Route path="/base-description" element={<BaseDescriptionPage />} />
      <Route path="/media" element={<MediaControl />} />
      <Route path="/core-values" element={<CoreValues />} />
      <Route path="/tools-of-thinking" element={<ToolsOfThinking />} />
      <Route path="/tools-of-thinking/:id" element={<ToolsDetailPage />}  />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/subadminpage" element={<SubAdminPage />} />

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
