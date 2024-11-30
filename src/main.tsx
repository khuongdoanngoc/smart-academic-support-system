import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>
);
