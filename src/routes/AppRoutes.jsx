import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Home";
import Groups from "../Pages/Groups/Groups";
import EmotionPage from "../Pages/Groups/EmotionPage";
import MediaControl from "../Pages/Media/MediaControl";
import Ecommerce from "../Pages/Dashboard/Orders";
import CoreValues from "../Pages/CoreValues/CoreValues";
import ToolsOfThinking from "../Pages/ToolsOfThinking/ToolsOfThinking";
import ToolsDetailPage from "../Pages/ToolsOfThinking/ToolsDetailPage";
import ChatPage from "../Pages/Chat/ChatPage";
import UserTable from "../Pages/Product/Product";
import SubscriptionPage from "../Pages/Subscription/SubscriptionPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected (require a logged-in admin) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<UserTable />} />
        <Route path="/orders" element={<Ecommerce />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/emotion/:emotion" element={<EmotionPage />} />
        <Route path="/media" element={<MediaControl />} />
        <Route path="/core-values" element={<CoreValues />} />
        <Route path="/tools-of-thinking" element={<ToolsOfThinking />} />
        <Route path="/tools-of-thinking/:id" element={<ToolsDetailPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
