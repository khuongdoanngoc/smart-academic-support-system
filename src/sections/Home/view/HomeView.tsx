import { AISection } from "../AISection";
import { Contact } from "../Contact";
import { DocumentCatalog } from "../DocumentCatalog";
import DocumentIntroduce from "../DocumentIntroduce/DocumentIntroduce";
import { IntroductionSection } from "../IntroductionSection";
import { News } from "../News";
import { Outstanding } from "../Outstanding";
import styles from "./HomeView.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
export default function HomeView() {
    return (
        <main className={cx("homepage-wrapper")}>
            <IntroductionSection />
            <DocumentCatalog />
            <DocumentIntroduce />
            <AISection />
            <Outstanding />
            <News />
            <Contact />
        </main>
    );
}
