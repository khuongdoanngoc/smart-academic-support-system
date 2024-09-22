// import React, { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { Footer } from "./footer";

interface PropsType {
    children: React.ReactNode;
}

export default function Layout(props: PropsType) {
    return (
        <>
            <Header />
            <Main>{props.children}</Main>
            <Footer />
        </>
    );
}
