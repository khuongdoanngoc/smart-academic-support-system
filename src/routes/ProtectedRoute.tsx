import { useEffect } from "react";
import { AutoLoginAction } from "../redux/AuthenticationSlice/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { CountNotificationAction } from "../redux/Notication/NoticationSlice";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const {isLogined} = useAppSelector((state) => state.authentication);
  useEffect(() => {
    if (!isLogined) {
      dispatch(AutoLoginAction());
    }else{
      dispatch(CountNotificationAction());
    }
  }, [dispatch, isLogined]);

    return <>{children}</>;
};
export default ProtectedRoute;
