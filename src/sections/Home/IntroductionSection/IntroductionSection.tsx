import styles from "./Introduction.module.scss";
import classnames from "classnames/bind";
import Background from "../../../assets/images/homepage.introduction.jpeg";
import ShapeBackground from "../../../assets/images/homepage.shape.png";
import HomeAvatar from "../../../assets/images/homepage.avatar.jpeg";
import Pattern from "../../../assets/images/homepage.pattern.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { appear, slideInLeft, slideInRight } from "../../../utils/animations";

const cx = classnames.bind(styles);

export default function IntroductionSection() {
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
        <div className={cx("introduction-section")}>
            <div className={cx("background")}>
                <div className={cx("background-color-cover")}>
                    <img
                        className={cx("background-img")}
                        src={Background}
                        alt="bg"
                    />
                </div>
                <img
                    className={cx("background-shape")}
                    src={ShapeBackground}
                    alt="bg"
                />
                <motion.img
                    variants={slideInRight}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    ref={sectionRef}
                    className={cx("pattern-img")}
                    src={Pattern}
                    alt="pattern"
                />
            </div>
            <div className={cx("content-wrapper")}>
                <div className={cx("content")}>
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        ref={sectionRef}
                        className={cx("titles")}>
                        <h2>
                            TRƯỜNG ĐẠI HỌC <span>DUY TÂN</span>
                        </h2>
                        <div>
                            <h1>Trường Đại học tư thục</h1>
                            <h1>Đầu tiên</h1>
                            <h1>Tại miền Trung</h1>
                        </div>
                        <p>
                            Mang đến cho sinh viên một môi trường học tập hiện
                            đại và năng động.
                        </p>
                        <button>TÌM HIỂU THÊM</button>
                    </motion.div>
                    <div className={cx("avatar")}>
                        <motion.img
                            variants={appear}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            ref={sectionRef}
                            src={HomeAvatar}
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
