import "./GlobalStyles.module.scss";

interface IGlobalStyle {
    children: React.ReactNode;
}

export default function GlobalStyles({ children }: IGlobalStyle) {
    return <div>{children}</div>;
}
