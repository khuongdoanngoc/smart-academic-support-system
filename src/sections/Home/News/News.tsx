import classNames from "classnames/bind";
import styles from "./News.module.scss";
const cx = classNames.bind(styles);
import DescriptionIcon from "@mui/icons-material/Description";
import { Button } from "../../../components/Button";
import News1 from "../../../assets/images/homepage.news1.png";
import News2 from "../../../assets/images/homepage.new2.png";
import News3 from "../../../assets/images/homepage.news3.jpeg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowToLeft from "../../../assets/images/icons/ArrowToLeftIcon.png";
import ArrowToRight from "../../../assets/images/icons/ArrowToRightIcon.png";
import { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
import { motion } from "framer-motion";
import {
    fromInsideOut,
    slideInLeft,
    slideInRight,
} from "../../../utils/animations";

export default function News() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const sectionRef = useRef(null);

    // var carouselSettings = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     pauseOnHover: true,
    // };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div id="news" ref={sectionRef} className={cx("news")}>
            <div>
                <div className={cx("head")}>
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        className={cx("titles")}>
                        <h2>
                            <DescriptionIcon />
                            TIN TỨC VÀ THÔNG BÁO NỔI BẬT CỦA CHÚNG TÔI
                        </h2>
                        <h1>TIN TỨC VÀ THÔNG BÁO MỚI NHẤT</h1>
                    </motion.div>
                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}>
                        <Button
                            text="XEM TẤT CẢ TIN TỨC"
                            fontSize={20}
                            paddingX={25}
                            paddingY={11}
                        />
                    </motion.div>
                </div>
                <motion.div
                    variants={fromInsideOut}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className={cx("content")}>
                    <div className={cx("slider")}>
                        <div className={cx("card")}>
                            <img src={News1} alt="news1" />
                            <div>
                                <p>
                                    <PersonOutlineIcon
                                        sx={{ color: "#DC4342" }}
                                    />
                                    Bởi C1SE.07
                                </p>
                                <p>
                                    <AccessTimeIcon sx={{ color: "#DC4342" }} />
                                    23/09/2024
                                </p>
                            </div>
                            <p>
                                Nâng cấp, cập nhật các chức năng và tính năng
                                mới cho trang web hỗ trợ học tập sinh viên Duy
                                Tân
                            </p>
                            <a href="#">
                                Đọc thêm <ArrowRightAltIcon />
                            </a>
                        </div>
                        <div className={cx("card")}>
                            <img src={News2} alt="news2" />
                            <div>
                                <p>
                                    <PersonOutlineIcon
                                        sx={{ color: "#DC4342" }}
                                    />
                                    Bởi Mr.Mận
                                </p>
                                <p>
                                    <AccessTimeIcon sx={{ color: "#DC4342" }} />
                                    23/09/2024
                                </p>
                            </div>
                            <p>
                                Họp báo cáo kết quả triển khai hoạt động
                                Capstone 1 của sinh viên cùng với Mentor...
                            </p>
                            <a href="#">
                                Đọc thêm <ArrowRightAltIcon />
                            </a>
                        </div>
                        <div className={cx("card")}>
                            <img src={News3} alt="news3" />
                            <div>
                                <p>
                                    <PersonOutlineIcon
                                        sx={{ color: "#DC4342" }}
                                    />
                                    Bởi C1SE.07
                                </p>
                                <p>
                                    <AccessTimeIcon sx={{ color: "#DC4342" }} />
                                    23/09/2024
                                </p>
                            </div>
                            <p>
                                Giảng viên ĐH Duy Tân nhận Chứng chỉ Chuyển giao
                                Chương trình Đào tạo từ ĐH Purdue Northwest
                            </p>
                            <a href="#">
                                Đọc thêm <ArrowRightAltIcon />
                            </a>
                        </div>
                    </div>
                    <div className={cx("control")}>
                        <div>
                            <img src={ArrowToRight} alt="control" />
                        </div>
                        <div>
                            <img src={ArrowToLeft} alt="control" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
