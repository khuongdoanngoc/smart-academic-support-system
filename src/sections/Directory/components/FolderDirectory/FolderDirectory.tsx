import classNames from "classnames/bind";
import styles from "./FolderDirectory.module.scss";
const cx = classNames.bind(styles);
import { useState } from "react";
import logoTitle from "../../../../assets/images/Folder.png";
import logoClass from "../../../../assets/images/School.png";
import logoName from "../../../../assets/images/User_box.png";
import logoNumberDocs from "../../../../assets/images/File_dock.png";
import logoNumberStudent from "../../../../assets/images/User_alt.png";
import { Button } from "../../../../components/Button";

interface IDoc {
  title: string;
  class: string;
  name: string;
  numberDocs: string;
  numberStudent: string;
}

interface IDocs {
  title: string;
  docs: IDoc[];
}

export default function FolderDirectory({ title, docs }: IDocs) {
  // configs cho nút xem thêm
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const handleToggle = () => {
    if (visibleCount === 4) {
      setVisibleCount(visibleCount + 6);
    } else {
      setVisibleCount(4);
    }
  };

  return (
    <div className={cx("folder-directory")}>
      <div className={cx("directory-title")}>
        <h2>{title}</h2>
        <span onClick={handleToggle}>
          {visibleCount === 4 ? "Xem thêm" : "Thu gọn"}
        </span>
      </div>
      <div className={cx("directory-cards")}>
        {docs.slice(0, visibleCount).map((data, index) => (
          <div key={index} className={cx("cards-list")}>
            <div className={cx("list-title")}>
              <img src={logoTitle} alt={data.title} />
              <p>{data.title}</p>
            </div>
            <div className={cx("list-class")}>
              <img src={logoClass} alt={data.class} />
              <p>{data.class}</p>
            </div>
            <div className={cx("list-name")}>
              <img src={logoName} alt={data.name} />
              <p>{data.name}</p>
            </div>
            <div className={cx("list-number")}>
              <div className={cx("list-number-docs")}>
                <img src={logoNumberDocs} alt={data.numberDocs} />
                <p>{data.numberDocs}</p>
              </div>
              <div className={cx("list-number-student")}>
                <img src={logoNumberStudent} alt={data.numberStudent} />
                <p>{data.numberStudent}</p>
              </div>
            </div>
            <div className={cx("list-button")}>
              <Button
                text="Theo dõi"
                paddingX={18}
                paddingY={3}
                fontSize={14}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
