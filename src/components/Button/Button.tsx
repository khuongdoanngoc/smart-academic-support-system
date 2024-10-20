import styles from "./Button.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

interface submitButton {
  titleButton: string;
  isSubmitting: boolean;
  padding: number;
  fontsize: number;
  borderRadius: number;
}

const Button: React.FC<submitButton> = ({
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

export default Button;
