import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
const cx = classNames.bind(styles);

import AddressICON from "../../../assets/images/icons/AddressIcon.png";
import PhoneICON from "../../../assets/images/icons/PhoneIcon.png";
import EmailICON from "../../../assets/images/icons/EmailIcon.png";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideInBottom, slideInRight } from "../../../utils/animations";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef(null);
  const formCurrent = useRef<HTMLFormElement>(null);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "" || email === "" || question === "") {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (formCurrent.current !== null) {
      setLoading(true);
      await emailjs
        .sendForm("service_098shcs", "template_ur5z219", formCurrent.current, {
          publicKey: "qhD4YtB2w9gQKNXa_",
        })
        .then(
          () => {
            setLoading(false);
            toast.success(
              "Câu hỏi của bạn đã được gửi đi, chúng tôi sẽ giải đáp nhanh nhất có thể."
            );
            console.log("Email sent successfully!");
            setEmail("");
            setName("");
            setQuestion("");
          },
          (error) => {
            console.error("Failed to send email", error);
          }
        );
    }
  };

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
    <div id="contact" ref={sectionRef} className={cx("contact")}>
      <div>
        <h1>THÔNG TIN LIÊN HỆ</h1>
        <div className={cx("contact-content")}>
          <motion.div
            variants={slideInBottom}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className={cx("titles")}
          >
            <div>
              <img src={AddressICON} alt="icon" />
              <p>
                Đại học Duy Tân - CS Hòa Khánh Nam 120 Hoàng Minh Thảo, Hoà
                Khánh Nam, Liên Chiểu, Đà Nẵng , Việt Nam
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
              ref={formCurrent}
              onSubmit={handleSubmitForm}
              className={cx("contact-us")}
            >
              <h2>Liên hệ với chúng tôi</h2>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                name="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                name="question"
                id="textarea-content"
                placeholder="Nội dung"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              {loading?<div className={cx("loader")}></div>:<button type="submit">Gửi liên hệ</button>}
              
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
            referrerPolicy="no-referrer-when-downgrade"
          ></motion.iframe>
        </div>
      </div>
    </div>
  );
}
