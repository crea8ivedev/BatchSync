import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useManufacturingStore } from "../../stores/manufacturingStore";

const PrivateRoute = () => {
  const operator = useManufacturingStore((state) => state.operator);

  return operator ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
