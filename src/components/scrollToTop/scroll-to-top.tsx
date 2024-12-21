import {useEffect,useState} from 'react';
import styles from './scroll-to-top.module.scss';
import classNames from 'classnames/bind';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const cx= classNames.bind(styles);
const ScrollToTop = () => {
    const [isScroll,setIsScroll] = useState(false);
    const handleClickScrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }
    useEffect(()=>{
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        }
        window.addEventListener('scroll',handleScroll);
        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    })
  return (
    <div className={cx('button-scroll-top')} style={{display : `${isScroll?'flex':'none'}`}} onClick={handleClickScrollToTop}>
      <ArrowUpwardIcon/>
    </div>
  )
}

export default ScrollToTop;
