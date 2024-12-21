import { AISection } from "../AISection";
import { Contact } from "../Contact";
import { DocumentCatalog } from "../DocumentCatalog";
import DocumentIntroduce from "../DocumentIntroduce/DocumentIntroduce";
import { IntroductionSection } from "../IntroductionSection";
import { News } from "../News";
import { Outstanding } from "../Outstanding";
import styles from "./HomeView.module.scss";
import classnames from "classnames/bind";
import { useGlobalContextLoin } from "../../../layouts/useContext";
import { ScrollToTop } from "../../../components/scrollToTop";

const cx = classnames.bind(styles);
export default function HomeView() {
  const {
    isFormLogin,
    setIsFormLogin,
    setFormLogin,
    formLogin,
    setIsAnimationForm,
  } = useGlobalContextLoin();
  const handleChangeFormLogin = () => {
    if (isFormLogin === true && formLogin === true) {
      setTimeout(() => {
        setIsAnimationForm(true);
        setTimeout(() => {
          setFormLogin(false);
          setIsFormLogin(false);
        }, 1200);
      }, 100);
    }
  };
  return (
    <main
      className={cx("homepage-wrapper", isFormLogin && "home-opacity")}
      onClick={handleChangeFormLogin}
    >
      <IntroductionSection />
      <DocumentCatalog />
      <DocumentIntroduce />
      <AISection />
      <Outstanding />
      <News />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
