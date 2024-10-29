import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
const cx = classNames.bind(styles);

import AddressICON from "../../../assets/images/icons/AddressIcon.png";
import PhoneICON from "../../../assets/images/icons/PhoneIcon.png";
import EmailICON from "../../../assets/images/icons/EmailIcon.png";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideInBottom, slideInRight } from "../../../utils/animations";
export default function Contact() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

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
        <div ref={sectionRef} className={cx("contact")}>
            <div>
                <h1>THÔNG TIN LIÊN HỆ</h1>
                <div className={cx("contact-content")}>
                    <motion.div
                        variants={slideInBottom}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        className={cx("titles")}>
                        <div>
                            <img src={AddressICON} alt="icon" />
                            <p>
                                Đại học Duy Tân - CS Hòa Khánh Nam 120 Hoàng
                                Minh Thảo, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng ,
                                Việt Nam
                            </p>
                        </div>
                        <div>
                            <img src={PhoneICON} alt="icon" />
                            <p>
                                (+84) 236.3650403
                                <br />
                                (+84) 236.3827111
                            </p>
                        </div>
                        <div>
                            <img src={EmailICON} alt="icon" />
                            <p>duytanforyou.c1se07@gmail.com</p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className={cx("contact-us")}>
                            <h2>Liên hệ với chúng tôi</h2>
                            <input type="text" placeholder="Họ và tên" />
                            <input type="text" placeholder="Email của bạn" />
                            <textarea
                                name="content"
                                id="textarea-content"
                                placeholder="Nội dung"></textarea>
                            <button>Gửi liên hệ</button>
                        </form>
                    </motion.div>
                    <motion.iframe
                        variants={slideInRight}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.3119965770084!2d108.1575216760426!3d16.049291584627255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421938d61a3ce5%3A0x29d80f3ebbdcb44a!2zxJDhuqFpIEjhu41jIER1eSBUw6JuIEjDsmEgS2jDoW5oIE5hbQ!5e0!3m2!1svi!2s!4v1728326898002!5m2!1svi!2s"
                        width="578"
                        height="565"
                        style={{ border: "none" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></motion.iframe>
                </div>
            </div>
        </div>
    );
}
