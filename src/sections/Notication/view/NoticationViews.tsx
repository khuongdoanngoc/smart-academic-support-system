
import NotiCationComponents from "../components/NoticationComponents";
import { useAppSelector } from "../../../redux/store";
import {WebsocketConnection} from "../../../utils/Websocket";

const NoticationViews = () => {
  const {isLogined}= useAppSelector(state=>state.authentication);
  return (
    <>
      <NotiCationComponents />
      {isLogined && <WebsocketConnection />}
    </>
  );
};

export default NoticationViews;
