import React from "react";
import SettingsHeader from "./settingsHeader";
import { observer } from "mobx-react-lite";
import SettingsForm from "./settingsForm";

const Settings = () => {
  return (
    <>
      <div className="relative w-full p-8 px-12">
        <h1 className="mb-4 pb-6 text-2xl font-bold text-gray-600">Settings</h1>
        <SettingsHeader />
        <SettingsForm />
      </div>
    </>
  );
};

export default Settings;
