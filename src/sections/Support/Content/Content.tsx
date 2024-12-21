import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

type FAQDetail={
    id: number;
    icon: string;
    title: string;
    paragraph: string;
    content:string;
}

const cardsData: FAQDetail[] = [
  {
    id: 0,
    icon: "/src/assets/images/icons/BoxIcon.png",
    title: "Dịch vụ của chúng tôi là gì?",
    paragraph:
      "Giải thích mục đích của nền tảng và lợi ích của việc lưu trữ tài liệu trực tuyến.",
    content: "Dịch vụ của chúng tôi là một nền tảng quản lý và lưu trữ tài liệu trực tuyến, cho phép bạn tổ chức, chia sẻ và tìm kiếm tài liệu một cách dễ dàng. Ngoài ra, chúng tôi tích hợp chatbot hỗ trợ hỏi đáp, được đào tạo từ dữ liệu tài liệu của bạn, giúp bạn tìm kiếm thông tin nhanh chóng và hiệu quả."
  },
  {
    id: 1,
    icon: "/src/assets/images/icons/DocumentUploadIcon.png",
    title: "Loại tài liệu nào được hỗ trợ?",
    paragraph: "Danh sách định dạng tệp được hỗ trợ: PDF.",
    content: "Chúng tôi hỗ trợ hầu hết các định dạng tài liệu phổ biến như: \n  ● Văn bản: PDF, DOC, DOCX, TXT \n ● Bảng tính: XLS, XLSX \n ● Thuyết trình: PPT, PPTX \n  ● Hình ảnh: PNG, JPG, JPEG \nNếu bạn gặp vấn đề với một loại tệp cụ thể, vui lòng liên hệ đội ngũ hỗ trợ."
  },
  {
    id: 2,
    icon: "/src/assets/images/icons/DocumentUploadIcon.png",
    title: "Kích thước tối đa của mỗi tệp là bao nhiêu?",
    paragraph: "Quy định về dung lượng của tệp.",
    content: "Hiện tại, kích thước tối đa cho mỗi tệp là 30MB. Nếu bạn cần tải lên tệp lớn hơn, vui lòng liên hệ chúng tôi để được hỗ trợ giải pháp phù hợp."
  },
  {
    id: 3,
    icon: "/src/assets/images/icons/FolderAddIcon.png",
    title: "Tạo thư mục",
    paragraph:
      "Hướng dẫn tạo thư mục đúng cách và thêm tài liệu phù hợp với thư mục của bạn.",
      content: "Bạn có thể dễ dàng tổ chức tài liệu của mình bằng cách tạo thư mục: \n  1. Truy cập trang quản lý tài liệu. \n  2. Nhấn vào nút \"Tạo thư mục\" hoặc biểu tượng \"+\" ở góc trên. \n  3. Đặt tên cho thư mục và nhấn \"Lưu\". \nThư mục giúp bạn sắp xếp tài liệu khoa học hơn.",
  },
  {
    id: 4,
    icon: "/src/assets/images/icons/BoxIcon.png",
    title: "Dữ liệu của tôi có an toàn không?",
    paragraph: "Giải thích về bảo mật (mã hóa, xác thực hai yếu tố).",
    content: "Chúng tôi cam kết bảo vệ dữ liệu của bạn bằng cách:\n ● Sử dụng mã hóa SSL trong quá trình truyền tải dữ liệu.\n  ● Lưu trữ dữ liệu trên hệ thống máy chủ bảo mật cao.\n  ● Cung cấp các tùy chọn phân quyền cho tài liệu và thư mục.\nHãy yên tâm rằng dữ liệu của bạn luôn được bảo vệ ở mức độ tốt nhất."
  },
  {
    id: 5,
    icon: "/src/assets/images/icons/DocumentUploadIcon.png",
    title: "Tôi gặp lỗi khi tải tài liệu lên, phải làm sao?",
    paragraph: "Các bước khắc phục sự cố.",
    content: "Nếu bạn gặp lỗi khi tải tài liệu lên, hãy thực hiện các bước sau:\n ● Kiểm tra kết nối internet của bạn.\n  ● Đảm bảo kích thước tệp không vượt quá giới hạn.\n ● Kiểm tra định dạng tệp có được hỗ trợ không.\nNếu vấn đề vẫn tiếp diễn, vui lòng liên hệ bộ phận hỗ trợ khách hàng với thông tin chi tiết về lỗi."
  },
  {
    id: 6,
    icon: "/src/assets/images/icons/UserSearchIcon.png",
    title: "Tôi không thể đăng nhập vào tài khoản của mình.",
    paragraph: "Hướng dẫn đặt lại mật khẩu hoặc liên hệ hỗ trợ.",
    content: "Nếu bạn không thể đăng nhập, hãy thử các bước sau:\n  ● Kiểm tra lại email hoặc mật khẩu bạn đã nhập.\n ● Sử dụng tính năng \"Quên mật khẩu\" để đặt lại mật khẩu mới.\n  ● Nếu tài khoản bị khóa, liên hệ với bộ phận hỗ trợ để được kích hoạt lại."
  },
  {
    id: 7,
    icon: "/src/assets/images/icons/chatbot-image.png",
    title: "Chatbot hoạt động như thế nào?",
    paragraph:
      "Hướng dẫn sử dụng chatbot phục vụ cho việc học tập và tìm kiếm...",
      content: "Chatbot của chúng tôi sử dụng công nghệ AI hiện đại để hỗ trợ bạn:\n  ● Chatbot được đào tạo dựa trên dữ liệu tài liệu của bạn.\n ● Bạn chỉ cần nhập câu hỏi, chatbot sẽ tìm kiếm và cung cấp thông tin liên quan.\n  ● Hệ thống hỗ trợ nhiều ngôn ngữ và trả lời nhanh chóng, chính xác.\nNếu bạn có thắc mắc, chatbot sẽ là người trợ lý đắc lực giúp bạn giải đáp trong vài giây."
  },
];

export default function Content() {
    const navigate= useNavigate();
    const handleClickNavigateFAQDetail= (data:FAQDetail)=>{
        navigate(`/document/support/${data.id}`);
        sessionStorage.setItem("faq-detail",JSON.stringify(data));
    }
  return (
    <div className={cx("support-content")}>
      <h3>Bạn cần giúp đỡ ? Chúng tôi luôn hỗ trợ bạn</h3>
      <p>
        Có lẽ bạn có thể tìm thấy câu trả lời trong những hỏi đáp thường gặp
        dưới đây của chùng tôi.
      </p>
      <div className={cx("items")}>
        {cardsData.map((data, index) => (
          <div key={index} className={cx("item")} onClick={()=>handleClickNavigateFAQDetail(data)}>
            <img src={`${data.icon}`} alt="box" />
            <h3>{data.title}</h3>
            <hr style={{ width: "25%" }} />
            <p>{data.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
