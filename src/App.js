import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/App.css";

import ToDoList from "./pages/ToDoList";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    // paths are set for certain components
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Routes will detemine which component is shown */}
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<ToDoList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
