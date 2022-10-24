import React, { useContext, useEffect } from "react";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Loader from "./components/loader";
import ConfirmEmail from "./pages/confirmEmail";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading)
    return (
      <div className="contianer flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  if (store.user?.emailConfirmed === false) return <ConfirmEmail />;
  return store.isAuth ? <Home /> : <Auth />;
}

export default observer(App);
