import { useEffect, useState } from "react";
import styled from "./CommingSoonComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styled);
const CommingSoonComponent = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const currentTime = () => {
      const endDate = new Date(2025, 0, 1);
      const now = new Date();
      const timeDifference = endDate.getTime() - now.getTime();
      const day = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minute = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const second = Math.floor((timeDifference % (1000 * 60)) / 1000);
      setDays(day);
      setHours(hour);
      setMinutes(minute);
      setSeconds(second);
    };
    const intervalId = setInterval(currentTime, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box-content")}>
          <h1>Page Coming Soon</h1>
          <div className={cx("content")}>
            <p className={cx("paragraph")}>
              We're working on the final touches to give you the best experience
              possible. Our website will be live soon, and we can't wait for you
              to explore it.
            </p>
          </div>
          <div className={cx("box-time")}>
            <div className={cx("timer", "days")}>
              <p>{days <= 99 ? "0" + days : days}</p>
              <span>DAYS</span>
            </div>
            <div className={cx("divided")}>:</div>
            <div className={cx("timer", "hours")}>
              <p>{hours <= 9 ? "0" + hours : hours}</p>
              <span>HOURS</span>
            </div>
            <div className={cx("divided")}>:</div>
            <div className={cx("timer", "minutes")}>
              <p>{minutes <= 9 ? "0" + minutes : minutes}</p>
              <span>MINUTES</span>
            </div>
            <div className={cx("divided")}>:</div>
            <div className={cx("timer", "seconds")}>
              <p>{seconds <= 9 ? "0" + seconds : seconds}</p>
              <span>SECONDS</span>
            </div>
          </div>
          <div className={cx("box-content-footer")}>
            <div className={cx("paragraph-notify")}>
              <p>
                <span>🔔 Sign up to receive Newsletter</span>
                <span>
                  to be the first to know about special updates when we launch!
                </span>
              </p>
            </div>
            <div className={cx("input-notify")}>
              <input type="text" placeholder="Enter your email" />
              <button>SUBCRIBE</button>
            </div>
            <div className={cx("congratulation-notify")}>
              <p>
                Thank you for your support and patient waiting. Get ready to
                start a new journey with us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommingSoonComponent;
