import styles from "./Button.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

interface IButton {
    text: string;
    paddingY: number;
    paddingX: number;
}

export default function Button({ text, paddingY, paddingX }: IButton) {
    return (
        <button
            style={{ padding: `${paddingY}px ${paddingX}px` }}
            className={cx("button-wrapper")}>
            {text}
        </button>
    );
}
