import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import styled from "./Content.module.scss";
import classNames from "classnames/bind";
import ImgFAQDetail from "../../../../assets/images/faq-detail-image.jpeg"
import { useEffect, useState } from "react";

type ContentStyles = {
  id: number;
  icon: string;
  title: string;
  paragraph: string;
  content: string;
};

const cx = classNames.bind(styled);
const Content = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentStyles | null>(null);

  useEffect(() => {
    if(!content){
        const dataJson = sessionStorage.getItem("faq-detail");
        if (dataJson) {
          const data = JSON.parse(dataJson);
          setContent(data);
        }
    }
  }, [content]);

  if (!content) return null;
  return (
    <div className={cx("container")}>
      <div className={cx("back-button")}>
        <Button
          text="Back"
          paddingX={25}
          paddingY={8}
          fontSize={14}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      {content !== null && (
        <div className={cx("content")}>
          <div className={cx("title")}>
            <img src={content.icon} alt="icon" />
            <h3>{content.title}</h3>
            <hr />
            <p>{content.paragraph}</p>
          </div>
          <div className={cx("wrapper")}>
            <div className={cx("image")}>
              <img src={ImgFAQDetail} alt="icon" />
            </div>
            <div className={cx("paragraph")}>
              <p dangerouslySetInnerHTML={{
                __html: content.content.replace(/\n/g, "<br />")
              }}></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
