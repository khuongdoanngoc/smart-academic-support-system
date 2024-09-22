interface PropsType{
    children: React.ReactNode
}

export default function Main(props: PropsType) {
    return (
        <>
            {props.children}
        </>
    )
}