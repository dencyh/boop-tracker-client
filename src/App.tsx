import React, { useContext, useEffect, useState } from "react";
import { Auth } from "./pages/auth";
import { Header } from "./components/header";
import { Routes, Route, Link } from "react-router-dom";
import { MainView } from "./pages/mainView";
import { Context } from "./index";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return store.isAuth ? <MainView /> : <Auth />;
}

export default observer(App);
