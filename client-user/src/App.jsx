import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
