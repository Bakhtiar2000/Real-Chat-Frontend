import React, { ReactNode } from "react";
import { useCurrentToken, } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  console.log(token)
  console.log(!token ? "Token Not Found" : "Token Found")
  let user;
  if (token) {
    user = verifyToken(token);
  }
  console.log("From protected layer-> ", user)

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
