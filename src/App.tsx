import "./App.css";
import { GlobalStyles } from "./components/GlobalStyles";
import Router from "./routes/section";

function App() {
    return (
        <GlobalStyles>
            <Router />
        </GlobalStyles>
    );
}

export default App;
