import React, { createContext, useContext, useState } from "react";

interface SharingModalContextType {
    open: boolean;
    url: string;
    setUrl: (url: string) => void;
    openSharingModal: () => void;
    closeSharingModal: () => void;
}

const SharingModalContext = createContext<SharingModalContextType | undefined>(
    undefined
);

export const SharingModalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");

    const openSharingModal = () => {
        console.log("open modal");
        setOpen(true);
    };
    const closeSharingModal = () => setOpen(false);

    return (
        <SharingModalContext.Provider
            value={{ open, url, setUrl, openSharingModal, closeSharingModal }}>
            {children}
        </SharingModalContext.Provider>
    );
};

export const useSharingModal = () => {
    const context = useContext(SharingModalContext);
    if (!context) {
        throw new Error(
            "useSharingModal must be used within a SharingModalProvider"
        );
    }
    return context;
};
