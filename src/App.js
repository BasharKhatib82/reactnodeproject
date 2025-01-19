import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/MyRoutes";

function App() {
  return (
    <div className="appClass">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
