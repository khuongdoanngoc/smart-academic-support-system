import { FAQDetailComponent } from '../components';
import styled from "./FAQDetailView.module.scss";
import classNames from 'classnames/bind';

const cx= classNames.bind(styled);
const FAQDetailView = () => {
  return (
    <div className={cx("faq-detail-view")}>
      <FAQDetailComponent />
    </div>
  )
}

export default FAQDetailView
