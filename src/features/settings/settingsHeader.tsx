import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import InitialsAvatar from "../bugs/bugInside/initialsAvatar";

const SettingsHeader = () => {
  const { store } = useContext(Context);

  return (
    <div className="flex items-center gap-5">
      <div className="h-20 w-20">
        <InitialsAvatar
          {...{
            firstName: store.user?.firstName || "",
            lastName: store.user?.lastName || "",
            fontSize: "text-4xl"
          }}
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="text-gray-600">Edit your details</p>
      </div>
    </div>
  );
};

export default observer(SettingsHeader);
