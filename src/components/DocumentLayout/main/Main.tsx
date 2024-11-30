import { useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAppSelector } from "../../../redux/store";
import Loader from "../../Loader/Loader";
import { useState } from "react";

interface PropsType {
    children: React.ReactNode;
}

export default function Main(props: PropsType) {
  const location = useLocation();
  const {loading}= useAppSelector(state=>state.authentication);
    const regex = /^\/document\/[^\/]+\/[^\/]+\/\d+$/;
    const [isOpen, setIsOpen] = useState<boolean>(
        !regex.test(location.pathname)
    );

    const hasOverlay = regex.test(location.pathname) && isOpen;

    const overlayStyles: any = {
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 8,
    };

    const toggleSideBar = () => {
        setIsOpen(false);
    };

  return (
    <>
      <div style={{ marginTop: "100px", width: "100%", display: "flex" }}>
        {location.pathname !== "/document/uploadfile" && <Sidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isModal={regex.test(location.pathname)}
                    />}
                    {hasOverlay && (
                    <div style={overlayStyles} onClick={toggleSideBar} />
                )}
                <div
                    style={{
                        width: "100%",
                        ...(hasOverlay ? { marginLeft: "80px" } : {}),
                    }}
                    className="main">
                    {props.children}
                </div>
      </div>
    </>
  );
}
