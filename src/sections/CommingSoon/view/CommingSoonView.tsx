import classNames from 'classnames/bind';
import { CommingSoonComponent } from '../components';
import styled from './CommingSoonView.module.scss';


const cx= classNames.bind(styled);
const CommingSoonView = () => {
  return (
    <div className={cx("main")}>
        <CommingSoonComponent />
    </div>
  )
}

export default CommingSoonView
