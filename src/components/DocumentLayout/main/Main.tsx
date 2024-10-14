interface PropsType {
    children: React.ReactNode;
}

export default function Main(props: PropsType) {
    return <div style={{ marginTop: "100px" }}>{props.children}</div>;
}
