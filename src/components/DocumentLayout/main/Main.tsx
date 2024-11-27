import { useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAppSelector } from "../../../redux/store";
import Loader from "../../Loader/Loader";

interface PropsType {
  children: React.ReactNode;
}

export default function Main(props: PropsType) {
  const location = useLocation();
  const {loading}= useAppSelector(state=>state.authentication);

  return (
    <>
      <div style={{ marginTop: "100px", width: "100%", display: "flex" }}>
        {location.pathname !== "/document/uploadfile" && <Sidebar />}
        {/* <Loader /> */}
        {loading?<Loader height={100}/>:props.children}
      </div>
    </>
  );
}
