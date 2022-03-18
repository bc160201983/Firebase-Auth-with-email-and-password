import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context";

export default function PrivateRoute() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate replace to="/login" />;
}
