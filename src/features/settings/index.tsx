import React, { useContext } from "react";
import SettingsHeader from "./settingsHeader";
import SettingsForm from "./settingsForm";
import Loader from "../../components/loader";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Settings = () => {
  const { store } = useContext(Context);
  return (
    <>
      <div className="relative w-full p-8 px-12">
        {store.isLoading && (
          <div className="contianer absolute top-0 left-0 z-40 flex h-screen w-full items-center justify-center bg-dark-transparent text-white">
            <Loader />
          </div>
        )}
        <h1 className="mb-4 pb-6 text-2xl font-bold text-gray-600">Settings</h1>
        <SettingsHeader />
        <SettingsForm />
      </div>
    </>
  );
};

export default observer(Settings);
