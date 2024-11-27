import styles from "./Introduction.module.scss";
import classnames from "classnames/bind";
import Background1 from "../../../assets/images/homepage.introduction.jpeg";
import Background2 from "../../../assets/images/homepage.introduce2.jpeg";
import Avatar2 from "../../../assets/images/homepage.avatar2.jpeg";

import ShapeBackground from "../../../assets/images/homepage.shape.png";
import HomeAvatar from "../../../assets/images/homepage.avatar.jpeg";
import Pattern from "../../../assets/images/homepage.pattern.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { appear, slideInRight } from "../../../utils/animations";

const cx = classnames.bind(styles);

export default function IntroductionSection() {
  const [currentBackground, setCurrentBackground] = useState(Background1);
  const [currentAvatar, setCurrentAvatar] = useState(HomeAvatar);
  const [currentHeadTitle, setCurrentHeadTitle] =
    useState<string>("TRƯỜNG ĐẠI HỌC");
  const [currentTitle, setCurrentTitle] = useState<string[]>([
    "Trường Đại học tư thục",
    "Đầu tiên",
    "Tại miền Trung",
  ]);
  const [currentDescription, setCurrentDescription] = useState<string>(
    "Mang đến cho sinh viên một môi trường học tập hiện đại và năng động"
  );
  const [cycleIndex, setCycleIndex] = useState(0); // 0 là Background1/Avatar1, 1 là Background2/Avatar2

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef(null);

  const leftVariants = {
    visible: {
      x: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1.4,
      },
    },
    hidden: {
      x: -1000,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1.4,
      },
    },
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setCycleIndex((prevIndex) => (prevIndex + 1) % 2); // Tăng cycleIndex và luân phiên giữa 0 và 1
    }
  }, [isVisible]);

  useEffect(() => {
    if (cycleIndex === 0) {
      setCurrentBackground(Background1);
      setCurrentAvatar(HomeAvatar);
      setCurrentHeadTitle("TRƯỜNG ĐẠI HỌC");
      setCurrentTitle(["Trường Đại học tư thục", "Đầu tiên", "Tại miền Trung"]);
      setCurrentDescription(
        "Mang đến cho sinh viên một môi trường học tập hiện đại và năng động"
      );
    } else {
      setCurrentBackground(Background2);
      setCurrentAvatar(Avatar2);
      setCurrentHeadTitle("TÀI LIỆU HỌC TẬP");
      setCurrentTitle([
        "Tổng hợp bài giảng, tài liệu",
        "Đầy đủ nhất",
        "Dành cho sinh viên",
      ]);
      setCurrentDescription(
        "Với hàng ngàn bài giảng sinh động, bài tập thực hành đa dạng và đề thi mẫu sát với chương trình, bạn sẽ dễ dàng nắm vững mọi kiến thức."
      );
    }
  }, [cycleIndex]);

  return (
    <div className={cx("introduction-section")}>
      <div className={cx("background")}>
        <div className={cx("background-color-cover")}>
          <motion.img
            variants={appear}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className={cx("background-img")}
            src={currentBackground}
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
            variants={leftVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            ref={sectionRef}
            className={cx("titles")}
          >
            <h2>
              {currentHeadTitle} <span>DUY TÂN</span>
            </h2>
            <div>
              {currentTitle.map((title, index) => (
                <h1 key={index}>{title}</h1>
              ))}
            </div>
            <p>{currentDescription}</p>
            <button>TÌM HIỂU THÊM</button>
          </motion.div>
          <div className={cx("avatar")}>
            <motion.img
              variants={appear}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              ref={sectionRef}
              src={currentAvatar}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
