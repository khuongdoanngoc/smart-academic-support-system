import classNames from "classnames/bind";
import styles from "./DocumentIntroduce.module.scss";
const cx = classNames.bind(styles);
import IMG1 from "../../../assets/images/homepage.introduce1.jpeg";
import IMG2 from "../../../assets/images/homepage.introduce2.jpeg";
import IMG3 from "../../../assets/images/homepage.introduce3.jpeg";
import IMG4 from "../../../assets/images/homepage.introduce4.png";
import ArticleIcon from "@mui/icons-material/Article";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button } from "../../../components/Button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { slideInLeft, slideInRight } from "../../../utils/animations";
import { useNavigate } from "react-router-dom";
export default function DocumentIntroduce() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef(null);
  const navigate= useNavigate();

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

  return (
    <div id="introduction" ref={sectionRef} className={cx("document-introduce-wrapper")}>
      <div>
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={cx("leftContent")}
        >
          <div className={cx("imgs")}>
            <div className={cx("img1")}>
              <img src={IMG1} alt="img1" />
            </div>
          </div>
          <div className={cx("img2")}>
            <h1>
              10k<span>+</span>
            </h1>
            <p>
              TÀI LIỆU, BÀI GIẢNG CHẤT LƯỢNG CHO SINH VIÊN
              <span> DUY TÂN</span>
            </p>
          </div>
          <div className={cx("img3")}>
            <img src={IMG3} alt="img3" />
          </div>
          <div className={cx("img4")}>
            <img src={IMG4} alt="img4" />
          </div>
        </motion.div>
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={cx("rightContent")}
        >
          <h2>
            <ArticleIcon sx={{ color: "#bd282e" }} />
            GIỚI THIỆU
          </h2>
          <h1>Chào Mừng Bạn Đến Với Duy Tan Document</h1>
          <p>
            Bạn muốn nâng cao kiến thức và kỹ năng của mình? Bạn muốn tham khảo
            những bài giảng, tài liệu chất lượng từ những giáo viên chuyên môn
            của Ngàng bạn đang học? Hãy truy cập ngay vào tải liệu học tập của
            Duy Tan Document.
          </p>
          <p>
            Chúng tôi là một kho tàng tài liệu trực tuyến cung cấp một loạt các
            tài liệu, bải giảng đa dạng và chất lượng, từ marketing, kinh doanh,
            CNTT, thiết kế đến kỹ năng sống và nhiều ngành, lĩnh vực khác. Với
            lượng tài liệu phong phú từ các nguồn uy tín, chúng tôi cam kết mang
            đến cho bạn những tài liệu chất lượng cao và mang tính thực tiễn,
            giúp bạn đạt hiệu quả cao trong học tập hơn.
          </p>
          <div className={cx("infor")}>
            <img src={IMG2} alt="img2" />
            <div className={cx("items")}>
              <div>
                <CheckBoxIcon sx={{ color: "#DC4342" }} />
                Đầy đủ hơn 10000 tài liệu chất lượng
              </div>
              <div>
                <CheckBoxIcon sx={{ color: "#DC4342" }} />
                Các chủ đề tài liệu đa dạng
              </div>
              <div>
                <CheckBoxIcon sx={{ color: "#DC4342" }} />
                Phù hợp cho việc học & ôn tập
              </div>
            </div>
          </div>
          <Button
            text="CHUYỂN ĐẾN TRANG TÀI LIỆU"
            fontSize={16}
            paddingY={23}
            paddingX={76}
            onClick={()=>{
              navigate("/document");
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
