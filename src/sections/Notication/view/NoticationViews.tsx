import NotiCationComponents from "../components/NoticationComponents";

const listNotication = [
  {
    id: 1,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 2,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 3,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 4,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 5,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 6,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 7,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 8,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 9,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 10,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 11,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 12,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
  {
    id: 13,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Tên thư mục”....",
    time: "Ngay bây giờ",
  },
];
const titleColorHeader = [
  {
    number: 20,
    title: "Tất cả thông báo",
  },
  {
    number: 300,
    title: "Lưu trữ",
  },
  {
    number: 200,
    title: "Thùng rác",
  },
];
const NoticationViews = () => {
  return (
    <>
      <NotiCationComponents
        list={listNotication}
        titleColor={titleColorHeader}
      />
    </>
  );
};

export default NoticationViews;
