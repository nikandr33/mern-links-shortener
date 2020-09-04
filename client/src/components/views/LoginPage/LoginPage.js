import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";
import { AuthContext } from "../../../context/AuthContext";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginSubmit = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Links Shortener - lnks.sh</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Log In</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter your email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              onClick={loginSubmit}
              disabled={loading}
            >
              Login
            </button>
            <Link style={{ marginLeft: 10 }} to="/register">
              First time here?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
