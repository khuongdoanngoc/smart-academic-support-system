import "./App.css";
import { GlobalStyles } from "./components/GlobalStyles";
import { SharingModal } from "./components/SharingModal";
import { SharingModalProvider } from "./contexts/SharingModalContext";
import Router from "./routes/section";

function App() {
    return (
        <SharingModalProvider>
            <SharingModal />
            <GlobalStyles>
                <Router />
            </GlobalStyles>
        </SharingModalProvider>
    );
}

export default App;
