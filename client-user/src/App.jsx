import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import CoursePage from "./components/CoursePage";
import PurchasedCourses from "./components/PurchasedCourses";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/purchasedCourses" element={<PurchasedCourses />} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
