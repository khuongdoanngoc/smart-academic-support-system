import { Sidebar } from "../Sidebar";

interface PropsType {
    children: React.ReactNode;
}

export default function Main(props: PropsType) {
    return (
        <div style={{ marginTop: "100px", width: "100%", display: "flex" }}>
            <Sidebar />
            {props.children}
        </div>
    );
}
