import React, { useContext, useEffect } from "react";
import { Auth } from "./pages/auth";
import Home from "./pages/home";
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

  return (
    <>
      {store.isLoading && !store.user.id && (
        <div className="contianer bg-black- fixed z-40 flex h-screen w-full items-center justify-center bg-dark-transparent text-white">
          <Loader />
        </div>
      )}
      {store.isAuth ? (
        store.user?.emailConfirmed ? (
          <Home />
        ) : (
          <ConfirmEmail />
        )
      ) : (
        <Auth />
      )}
    </>
  );
}

export default observer(App);
