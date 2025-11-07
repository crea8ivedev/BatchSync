import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useManufacturingStore } from "../../stores/manufacturingStore";

const PublicRoute = () => {
  const operator = useManufacturingStore((state) => state.operator);

  return operator ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
