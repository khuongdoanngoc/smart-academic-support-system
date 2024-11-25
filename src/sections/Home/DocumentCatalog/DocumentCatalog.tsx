import styles from "./DocumentCatalog.module.scss";
import classnames from "classnames/bind";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Line from "../../../assets/images/homepage.line.png";
import { Catalog } from "./Catalog";
const cx = classnames.bind(styles);
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { slideInBottom } from "../../../utils/animations";

export default function DocumentCatalog() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "400px",
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Cập nhật trạng thái isVisible thành true khi section vào viewport
                    observer.unobserve(entry.target); // Dừng quan sát section này
                }
            });
        }, options);
        if (sectionRef.current) {
            observer.observe(sectionRef.current); // Bắt đầu quan sát section
        }
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            variants={slideInBottom}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            ref={sectionRef}
            className={cx("document-catalog-wrapper")}>
            <div>
                <img src={Line} alt="line" />
                <div className={cx("titles")}>
                    <h3>
                        <AutoStoriesIcon /> DANH MỤC TÀI LIỆU
                    </h3>
                    <h1>Khám phá mục tài liệu bạn có thể xem</h1>

                    <button className={cx("btn-showCatalogs")}>
                        XEM TẤT CẢ CÁC DANH MỤC
                    </button>
                </div>
                <div className={cx("right-content")}>
                    <div className={cx("catalogs")}>
                        <Catalog />
                        <Catalog />
                        <Catalog />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
