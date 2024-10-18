import classNames from "classnames/bind";
import styles from "./QuestionForm.module.scss";
const cx = classNames.bind(styles);

import MessengerICON from "../../../assets/images/icons/MessengerIcon.png";
import ZaloICON from "../../../assets/images/icons/ZaloIcon.png";
import { ChangeEvent, FormEvent, useState } from "react";

export default function QuestionForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [question, setQuestion] = useState<string>("");

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(
            `Submit form with data: name = ${name} / email = ${email} / question = ${question}`
        );
    };

    return (
        <div className={cx("question-form")}>
            <h3>Bạn có thắc mắc cần được chúng tôi giải đáp ?</h3>
            <p>
                Hãy viết câu hỏi của bạn vào dưới đây, chúng tôi sẽ giải đáp
                nhanh nhất có thể cho bạn. Câu trả lời sẽ được gửi về thông báo
                và email của bạn.
            </p>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Email của bạn"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <textarea
                    placeholder="Nội dung câu hỏi của bạn"
                    name="note"
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                        setQuestion(event.target.value);
                    }}></textarea>
                <button>Gửi câu hỏi</button>
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
