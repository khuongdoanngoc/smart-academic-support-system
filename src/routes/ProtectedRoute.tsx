import { useEffect } from "react";
import { AutoLoginAction } from "../redux/AuthenticationSlice/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { CountNotificationAction } from "../redux/Notication/NoticationSlice";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const {isLogined,listRoles} = useAppSelector((state) => state.authentication);
  useEffect(() => {
    if (!isLogined) {
      dispatch(AutoLoginAction());
    }else if(listRoles.length>0 && listRoles[0]!=="ADMIN"){
      dispatch(CountNotificationAction());
    }
  }, [dispatch, isLogined, listRoles]);
    return <>{children}</>;
};
export default ProtectedRoute;
