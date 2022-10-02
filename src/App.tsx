import React, { useContext, useEffect, useState } from "react";
import { Auth } from "./pages/auth";
import { Header } from "./pages/views/auth/header";
import { Routes, Route, Link } from "react-router-dom";
import { WorkSpace } from "./pages/workSpace";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Loader from "./components/loader";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading)
    return (
      <div className="contianer h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  return store.isAuth ? <WorkSpace /> : <Auth />;
}

export default observer(App);
