import classNames from "classnames/bind";
import styles from "./AISection.module.scss";
import { Head } from "./Head";
const cx = classNames.bind(styles);
import AIBackground from "../../../assets/images/homepage.ai.png";
import AIEmoji from "../../../assets/images/homepage.aiEmoji.png";
export default function AISection() {
    return (
        <div className={cx("ai-section")}>
            <Head />
            <div className={cx("content")}>
                <img src={AIBackground} alt="ai-background" />
                <div>
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
                </div>
            </div>
        </div>
    );
}
