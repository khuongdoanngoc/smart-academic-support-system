import { useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar";

interface PropsType {
  children: React.ReactNode;
}

export default function Main(props: PropsType) {
  const location = useLocation();

  return (
    <>
      <div style={{ marginTop: "100px", width: "100%", display: "flex" }}>
        {location.pathname !== "/document/uploadfile" && <Sidebar />}
        {props.children}
      </div>
    </>
  );
}
