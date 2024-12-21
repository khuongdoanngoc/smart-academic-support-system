import classNames from "classnames/bind";
import styles from "./AISection.module.scss";
import { Head } from "./Head";
const cx = classNames.bind(styles);
import AIBackground from "../../../assets/images/homepage.ai.png";
import AIEmoji from "../../../assets/images/homepage.aiEmoji.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { slideInLeft, slideInRight } from "../../../utils/animations";
export default function AISection() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "100px",
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
        <div id="chatbot" className={cx("ai-section")}>
            <Head />
            <div ref={sectionRef} className={cx("content")}>
                <motion.img
                    variants={slideInLeft}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    src={AIBackground}
                    alt="ai-background"
                />
                <motion.div
                    variants={slideInRight}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}>
                    <h2>
                        <img src={AIEmoji} alt="emoji" />
                        TÍCH HỢP CÁC CÔNG CỤ AI
                    </h2>
                    <h1>Công cụ hỗ trợ cải thiện học tập mới ?</h1>
                    <p>
                        Ngoài những chức năng tìm kiếm truy cập tài liệu như các
                        web thông thường khác, chúng tôi còn chọn lọc các danh
                        sách tài liệu phù hợp với từng môn học có ở trong nhà
                        trường nhằm phục vụ việc học tập cho sinh viên trường
                        Đại học Duy Tân. Ngoài ra, chúng tôi còn tích hợp hệ
                        thống AI hỗ trợ, giúp cải thiện việc học, phân chia lịch
                        học cũng như đề xuất các tài liệu phù hợp cho từng sinh
                        viên. Giúp việc học của sinh viên Duy Tân trở nên một
                        cách dễ dàng, cải thiện được điểm số cũng như nâng cao
                        khả năng tự học cho từng sinh viên.
                    </p>
                    <p>
                        Vậy còn chần chờ gì mà không trải nghiệm các tính năng
                        được tích hợp AI của chúng tôi. Tôi dám chắc bạn sẽ bất
                        ngờ khi trải nghiệm tính năng mới này đó.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
