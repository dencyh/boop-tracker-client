import React from "react";
import Cookie from "js-cookie";

const removeCookie = (name) => {
  Cookie.remove(name);
};

export default removeCookie;
