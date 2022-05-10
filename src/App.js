import "./App.css";
import Dashboard from "./containers/Dashboard/Dashboard";
import Orders from "./containers/Orders/Orders";
import Customers from "./containers/Customers/Customers";
import Reports from "./containers/Reports/Reports";
import Layout from "./Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SingUp/SignUp";
import { useEffect, useState } from "react";
import RequireAuth from "./utils/RequireAuth";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") == "true") {
      setCurrentUser(true);
    }
  }, [currentUser]);
  return (
    <>
      <Routes>
        <Route
          path="/signIn"
          element={<SignIn setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/signUp"
          element={<SignUp setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/panel"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="customers"
            element={
              <RequireAuth>
                <Customers />
              </RequireAuth>
            }
          />
          <Route
            path="reports"
            element={
              <RequireAuth>
                <Reports />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/*" element={<Navigate to="signIn" replace />} />
      </Routes>
    </>
  );
}

export default App;
