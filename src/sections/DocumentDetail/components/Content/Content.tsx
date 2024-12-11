import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import Header from "./Header";
const cx = classNames.bind(styles);

function Content() {
    const pagesTest = Array(5).fill("");

    return (
        <div className={cx("content")}>
            <Header />
            <article className={cx("pages-container")}>
                {pagesTest.map((_, index) => (
                    <div key={index} className={cx("page")}>
                        hello
                    </div>
                ))}
            </article>
        </div>
    );
}

export default Content;
