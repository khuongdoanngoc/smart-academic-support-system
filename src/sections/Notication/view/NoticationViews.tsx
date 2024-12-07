
import { useEffect } from "react";
import NotiCationComponents from "../components/NoticationComponents";
import { axiosInstance } from "../../../utils/AxiosInterceptor";
import { useAppSelector } from "../../../redux/store";
import {WebsocketConnection} from "../../../utils/Websocket";

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
const listStorageNotication = [
  {
    id: 1,
    title:
      "Tài liệu “Tên tài liệu” của bạn đã được phê duyệt vào thư mục “Cao vanan”....",
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

  const {isLogined}= useAppSelector(state=>state.authentication);
  
  useEffect(()=>{
    const fetchData= async ()=>{
      const message= "hello"
      const respose = await axiosInstance.post(`/notification/notify?message=${message}`);
      console.log(respose);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    if(isLogined){
      WebsocketConnection();
    }
  },[isLogined]);
  // useEffect(() => {
  //   let stompClient: Client;

  //   const connectWebSocket = () => {
  //     const token= JsCookie.get("accessToken");
  //     console.log(token);
      
  //     try {
  //       if (!token) {
  //         throw new Error('No access token found');
  //       }
  //       stompClient = new Client({
  //         webSocketFactory: () => new SockJS(`http://localhost:8088/api/v1/ws`),
  //         connectHeaders: {
  //           token: token
  //         },
  //         reconnectDelay: 5000, // Auto-reconnect after 5 seconds
  //         debug: (str) => console.log(str), // Debug output
  //       });

  //       stompClient.onConnect = () => {
  //         console.log('Connected to WebSocket!');

  //         stompClient.subscribe('/topic/notifications', (message) => {
  //           console.log('Received:', message.body);
  //         });
  //       };

  //       stompClient.onStompError = (frame) => {
  //         console.error('Broker reported error:', frame.headers['message']);
  //         console.error('Additional details:', frame.body);
  //       };

  //       stompClient.activate(); // Establish the connection
  //     } catch (error) {
  //       console.error('Error connecting to WebSocket:', error);
  //     }
  //   };

  //   connectWebSocket();

  //   return () => {
  //     if (stompClient) {
  //       stompClient.deactivate(); // Gracefully disconnect
  //       console.log('Disconnected from WebSocket.');
  //     }
  //   };
  // }, []);

  return (
    <>
      <NotiCationComponents
        list={listNotication}
        listStore={listStorageNotication}
        titleColor={titleColorHeader}
      />
    </>
  );
};

export default NoticationViews;
