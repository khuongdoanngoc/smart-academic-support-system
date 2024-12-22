import classNames from "classnames/bind";
import styles from "./QuestionForm.module.scss";
const cx = classNames.bind(styles);
import emailjs from "@emailjs/browser";
import MessengerICON from "../../../assets/images/icons/MessengerIcon.png";
import ZaloICON from "../../../assets/images/icons/ZaloIcon.png";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function QuestionForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const formCurrent= useRef<HTMLFormElement>(null);
    const [loading,setLoading]= useState(false);
    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(name ==="" || email ==="" || question === ""){
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if(formCurrent.current !== null){
            setLoading(true)
            await emailjs
              .sendForm("service_098shcs","template_ur5z219",formCurrent.current,{
                publicKey: "qhD4YtB2w9gQKNXa_"
              })
              .then(()=>{
                setLoading(false);
                toast.success("Câu hỏi của bạn đã được gửi đi, chúng tôi sẽ giải đáp nhanh nhất có thể.");
                console.log("Email sent successfully!");
                setEmail("");
                setName("");
                setQuestion("");
              },
            (error)=>{
              console.error("Failed to send email", error);
            })
        }
    };

    return (
        <div className={cx("question-form")}>
            <h3>Bạn có thắc mắc cần được chúng tôi giải đáp ?</h3>
            <p>
                Hãy viết câu hỏi của bạn vào dưới đây, chúng tôi sẽ giải đáp
                nhanh nhất có thể cho bạn. Câu trả lời sẽ được gửi về thông báo
                và email của bạn.
            </p>
            <form onSubmit={handleSubmitForm} ref={formCurrent}>
                <div>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên"
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email của bạn"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <textarea
                    placeholder="Nội dung câu hỏi của bạn"
                    name="content"
                    value={question}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                        setQuestion(event.target.value);
                    }}></textarea>
                    {loading ? <div className={cx("loader")}></div>: <button type="submit">Gửi câu hỏi</button>}
                
            </form>
            <span>
                Liên hệ với chúng tôi qua các trang mạng xã hội để được hỗ trợ
                sớm nhất
            </span>
            <div className={cx("socials")}>
                <a href="#">
                    <img src={MessengerICON} alt="messenger" />
                </a>
                <a href="#">
                    <img src={ZaloICON} alt="messenger" />
                </a>
            </div>
        </div>
    );
}
