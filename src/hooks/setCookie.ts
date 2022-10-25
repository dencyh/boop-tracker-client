import React from "react";
import Cookie from "js-cookie";

const setCookie = (name, value) => {
  Cookie.set(name, "foo", {
    expires: 10,
    sameSite: "none",
    domain: "localhost"
  });
};

export default setCookie;
