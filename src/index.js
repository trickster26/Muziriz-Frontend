import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import Register from "views/Register";
import EndpointDetail from "views/EndpointDetail";
import { AuthProvider } from "variables/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/endpoint/:id" element={<EndpointDetail />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/Register/" element={<Register />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
