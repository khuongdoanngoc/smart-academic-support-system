import { DocumentHeader } from "./DocumentHeader";
import styles from "./DocumentLayout.module.scss";
import classnames from "classnames/bind";
import { Main } from "./main";
import { Footer } from "../../layouts/footer";

const cx = classnames.bind(styles);

interface PropsType {
    children: React.ReactNode;
}

export default function DocumentLayout(props: PropsType) {
    return (
        <div className={cx("layout-wrapper")}>
            <DocumentHeader />
            <Main>{props.children}</Main>
            <Footer />
        </div>
    );
}
