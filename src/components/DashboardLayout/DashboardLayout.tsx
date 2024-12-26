import { DocumentHeader } from "./DashboardHeader";
import styles from "./DashboardLayout.module.scss";
import classnames from "classnames/bind";
import { Main } from "./main";
import { useLocation } from "react-router-dom";
import { Footer } from "../../layouts/footer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LogoutAction } from "../../redux/AuthenticationSlice/AuthenticationSlice";
import Loader from "../Loader/Loader";

const cx = classnames.bind(styles);

interface PropsType {
  children: React.ReactNode;
}

export default function DashboardLayout(props: PropsType) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading,setLoading]= useState(false);
  const { isLogined, listRoles } = useAppSelector(
    (state) => state.authentication
  );
  useEffect(() => {
    if (isLogined && listRoles.length > 0 && listRoles[0] !== "ADMIN") {
      toast.error("Bạn không có quyền truy cập vào trang này");
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
        dispatch(LogoutAction());
      },3000);
    }
  }, [dispatch, isLogined, listRoles]);
  return (
    <div className={cx("layout-wrapper")}>
      <DocumentHeader />
      {loading?<Loader height={20} /> : <Main>{props.children}</Main>}
      
      {location.pathname !== "/document/uploadfile" && <Footer />}
    </div>
  );
}
