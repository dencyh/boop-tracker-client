import React, { useContext, useEffect, useState } from "react";
import { Auth } from "./pages/auth";
import { Header } from "./components/header";
import { Routes, Route, Link } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Context } from "./index";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={store.isAuth ? <Welcome /> : <Auth />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default observer(App);
