
import {NotificationComponents} from "../components";
import { useAppSelector } from "../../../redux/store";
import {WebsocketConnection} from "../../../utils/Websocket";

const NoticationViews = () => {
  const {isLogined}= useAppSelector(state=>state.authentication);
  return (
    <>
      <NotificationComponents />
      {isLogined && <WebsocketConnection />}
    </>
  );
};

export default NoticationViews;
