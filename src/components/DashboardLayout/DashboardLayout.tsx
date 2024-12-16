import { DocumentHeader } from "./DashboardHeader";
import styles from "./DashboardLayout.module.scss";
import classnames from "classnames/bind";
import { Main } from "./main";
import { useLocation } from "react-router-dom";
import { Footer } from "../../layouts/footer";

const cx = classnames.bind(styles);

interface PropsType {
    children: React.ReactNode;
}

export default function DashboardLayout(props: PropsType) {
    const location = useLocation();

    return (
        <div className={cx("layout-wrapper")}>
            <DocumentHeader />
            <Main>{props.children}</Main>
            {location.pathname !== "/document/uploadfile" && <Footer />}
        </div>
    );
}
