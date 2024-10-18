import styles from "./Layout.module.scss";
import classnames from "classnames/bind";
// import React, { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { Footer } from "./footer";

const cx = classnames.bind(styles);

interface PropsType {
    children: React.ReactNode;
}

export default function Layout(props: PropsType) {
    return (
        <div className={cx("layout-wrapper")}>
            <Header />
            <Main>{props.children}</Main>
            <Footer />
        </div>
    );
}
