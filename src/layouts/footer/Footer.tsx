import styles from "./Footer.module.scss";
import classnames from "classnames/bind";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const cx = classnames.bind(styles);
export default function Footer() {
    return (
        <footer>
            <div className={cx("footer-content")}>
                <div className={cx("footer-top")}>
                    <div className={cx("list-items")}>
                        <h2>Product</h2>
                        <a href="#">Landing page</a>
                        <a href="#">Popup Builder</a>
                        <a href="#">Web-design</a>
                        <a href="#">Content</a>
                        <a href="#">Integrations</a>
                    </div>
                    <div className={cx("list-items")}>
                        <h2>Use Cases</h2>
                        <a href="#">Web-designers</a>
                        <a href="#">Marketers</a>
                        <a href="#">Small Business</a>
                        <a href="#">Website Builder</a>
                    </div>
                    <div className={cx("list-items")}>
                        <h2>Resources</h2>
                        <a href="#">Academy</a>
                        <a href="#">Blog</a>
                        <a href="#">Themes</a>
                        <a href="#">Hosting</a>
                        <a href="#">Developers</a>
                        <a href="#">Support</a>
                    </div>
                    <div className={cx("list-items")}>
                        <h2>Company</h2>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">FAQs</a>
                        <a href="#">Teams</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <div className={cx("list-items","contact")}>
                        <h2>Contact Us</h2>
                        <div className={cx("box")}>
                            <FmdGoodOutlinedIcon />
                            <p>
                                <span>254 Nguyen Van Linh</span>
                                <span>Thanh Khe district, Da Nang</span>
                            </p>
                        </div>
                        <div className={cx("box")}>
                            <MailOutlineOutlinedIcon />
                            <p>
                                <span>c1se.07@gmail.com</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx("social-icons")}>
                    <h3>Follow us</h3>
                    <div className={cx("list-icon")}>
                        <a href="#"><img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="facebook" /></a>
                        <a href="#"><img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="twitter" /></a>
                        <a href="#"><img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="instagram" /></a>
                        <a href="#"><img src="https://img.icons8.com/?size=100&id=kBCrQMzpQDLQ&format=png&color=000000" alt="linkedin" /></a>
                        <a href="#"><img src="https://img.icons8.com/fluent/48/000000/youtube-play.png" alt="youtube" /></a>
                        <a href="#"><img src="https://img.icons8.com/fluent/48/000000/github.png" alt="github" /></a>
                    </div>
                </div>
                <div className={cx("footer-bottom")}>
                    <p>
                        Copyright © 2024 - Bản quyền thuộc về nhóm đồ án
                        Capstone1 C1SE.07
                    </p>
                    <div className={cx("policy")}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Sales and Refunds</a>
                        <a href="#">Legal</a>
                        <a href="#">Site Map</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
