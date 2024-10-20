import styles from "./Catalog.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
import CatalogICON from "../../../../assets/images/homepage.catalog-icon.png";
import { Button } from "../../../../components/Button";

export default function Catalog() {
    return (
        <div className={cx("catalog-wrapper")}>
            <div className={cx("catalog")}>
                <div className={cx("icon")}>
                    <img src={CatalogICON} alt="" />
                </div>
                <h2>Tên danh mục 1</h2>
                <p>80+ Tài liệu</p>
                <Button text="XEM THÊM" paddingY={3} paddingX={20} fontSize={13}/>
            </div>
        </div>
    );
}
