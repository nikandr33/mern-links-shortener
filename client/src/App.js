import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./components/routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "materialize-css";
import NavBar from "./components/views/NavBar/NavBar";
import Loader from "./components/views/Loader/Loader";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) return <Loader />;

  return (
    <AuthContext.Provider value={{ token, login, logout, userId }}>
      <Router>
        {isAuth && <NavBar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
