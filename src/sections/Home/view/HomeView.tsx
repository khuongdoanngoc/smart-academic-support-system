import { DocumentCatalog } from "../DocumentCatalog";
import { IntroductionSection } from "../IntroductionSection";
import styles from "./HomeView.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
export default function HomeView() {
    return (
        <main className={cx("homepage-wrapper")}>
            <IntroductionSection />
            <DocumentCatalog />
        </main>
    );
}
