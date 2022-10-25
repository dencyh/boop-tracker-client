import Cookie from "js-cookie";
import React from "react";

const getCookie = (name) => {
  return Cookie.get(name);
};

export default getCookie;
