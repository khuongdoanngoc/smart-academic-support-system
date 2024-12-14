import classNames from "classnames/bind";
import styles from "./RouterTitle.module.scss";
const cx = classNames.bind(styles);

interface TitleDops {
  title: string;
}

const RouterTitle: React.FC<TitleDops> = ({ title }: TitleDops) => {
  return (
    <div className={cx("router-title")}>
      <span>DTUDOCUMENT /</span>
      <span className={cx("link")}> {title}</span>
    </div>
  );
};

export default RouterTitle;
