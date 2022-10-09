import React, { useContext, useEffect } from "react";
import { Auth } from "./pages/auth";
import { WorkSpace } from "./pages/workSpace";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Loader from "./components/misc/loader";

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

  return store.isAuth ? <WorkSpace /> : <Auth />;
}

export default observer(App);
