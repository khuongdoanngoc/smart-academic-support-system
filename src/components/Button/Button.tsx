import styles from "./Button.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

interface IButton {
    text: string;
    paddingY: number;
    paddingX: number;
    fontSize: number;
}
interface submitButton {
  titleButton: string;
  isSubmitting: boolean;
  padding: number;
  fontsize: number;
  borderRadius: number;
}
export default function Button({
    text,
    paddingY,
    paddingX,
    fontSize,
}: IButton) {
    return (
        <button
            style={{
                padding: `${paddingY}px ${paddingX}px`,
                fontSize: `${fontSize}px`,
            }}
            className={cx("button-wrapper")}>
            {text}
        </button>
    );
}



export const ButtonSubmit: React.FC<submitButton> = ({
  titleButton,
  isSubmitting,
  padding,
  fontsize,
  borderRadius,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={cx("button")}
      style={{
        padding: `${padding}px`,
        fontSize: `${fontsize}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {titleButton}
    </button>
  );
};

