import "./App.css";
import { GlobalStyles } from "./components/GlobalStyles";
import { SharingModal } from "./components/SharingModal";
import { SharingModalProvider } from "./contexts/SharingModalContext";
import Router from "./routes/section";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <SharingModalProvider>
      <SharingModal />
      <ToastContainer autoClose={3000} />
      <GlobalStyles>
        <Router />
      </GlobalStyles>
    </SharingModalProvider>
  );
}

export default App;
