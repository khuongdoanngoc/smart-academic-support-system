import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { RootState } from "../redux/store";
import { useEffect } from "react";
import { logout } from "../redux/AuthenticationSlice/AuthenticationSlice";
import { axiosInstance } from "../utils/AxiosInterceptor";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const decodeToken = (token: string) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
const checkAndRefreshToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) return false;

  const decoded = decodeToken(accessToken);
  if (!decoded) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = decoded.exp - currentTime;
  if (timeRemaining < 120) {
    try {
      const response = await axiosInstance.post("/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  }

  return true;
};
// const checkTokenExpiration = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     const decoded = decodeToken(accessToken);
//     if (decoded) {
//       const currentTime = Math.floor(Date.now() / 1000);
//       const timeRemaining = decoded.exp - currentTime;
//       // console.log("Token info:", {
//       //   email: decoded.sub,
//       //   roles: decoded.roles,
//       //   expiresIn: `${Math.floor(timeRemaining / 60)} minutes`,
//       //   isExpired: timeRemaining <= 0,
//       // });
//       // if (timeRemaining > 0 && timeRemaining < 120) {
//       //   console.warn("Token sắp hết hạn!");
//       // }
//     }
//   }
// };
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // checkTokenExpiration();
    const checkAuth = async () => {
      const isValid = await checkAndRefreshToken();
      if (!isValid) {
        dispatch(logout());
        navigate("/login");
      }
    };
    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  return <>{children}</>;
};
export default ProtectedRoute;
