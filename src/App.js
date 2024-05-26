import {
  Dashboard,
  HomePage,
  SignIn,
  Teachers,
  Pupils,
  Subjects,
} from "./components/pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="pupils" element={<Pupils />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
