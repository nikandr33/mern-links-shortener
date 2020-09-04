import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LinksPage from "./views/LinksPage/LinksPage";
import CreateLinkPage from "./views/CreateLinkPage/CreateLinkPage";
import DetailPage from "./views/DetailPage/DetailPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";

export const useRoutes = (isAuth) => {
  if (isAuth)
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreateLinkPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );

  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
