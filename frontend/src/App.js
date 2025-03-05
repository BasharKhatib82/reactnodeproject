// Bashar Khatib    ID : 066043167
// Tareq Shaltaf    ID : 315483032

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
