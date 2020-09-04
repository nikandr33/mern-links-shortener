import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";

const RegisterPage = () => {
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

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerSubmit = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Links Shortener - lnks.sh</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Registration</span>
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
              onClick={registerSubmit}
              disabled={loading}
            >
              Register
            </button>
            <Link style={{ marginLeft: 10 }} to="/login">
              Have account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
