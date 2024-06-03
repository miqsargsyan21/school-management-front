import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ProtectedRoute from "./components/shared/ProtectedRoutes";
import { getUser } from "./services/apollo/users/queries";
import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { AppProvider } from "./AppContext";
import {
  Dashboard,
  HomePage,
  Teachers,
  Subjects,
  Pupils,
  SignIn,
} from "./components/pages";

function App() {
  const [token, setToken] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  const [getUserData] = useLazyQuery(getUser, {
    variables: {
      token: localStorage.getItem("token"),
    },
  });

  const handleSetToken = useCallback((newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await getUserData();

        setUser(response.data.user);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (token) {
      handleGetUserData();
    }
  }, [getUserData, token]);

  return (
    <AppProvider
      handleSetToken={handleSetToken}
      setUser={setUser}
      token={token}
      user={user}
    >
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route
            path="/signin"
            element={<ProtectedRoute element={<SignIn />} isAuth />}
          />
          <Route
            path="/Dashboard"
            element={<ProtectedRoute element={<DashboardLayout />} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="pupils" element={<Pupils />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
