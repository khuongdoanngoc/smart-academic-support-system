import { useEffect } from "react";
import { AutoLoginAction } from "../redux/AuthenticationSlice/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const dispatch = useDispatch();
    const { isLogined } = useAppSelector((state) => state.authentication);
    useEffect(() => {
        if (!isLogined) {
            dispatch(AutoLoginAction());
        }
    }, [dispatch, isLogined]);

    return <>{children}</>;
};
export default ProtectedRoute;
