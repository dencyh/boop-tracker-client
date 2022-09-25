import Sidebar from "../components/sidebar/sidebar";
import Bugs from "../components/bugs/bugs";
import Projects from "../components/projects/projects";
import React from "react";

export function Welcome() {
  return (
    <div className="flex">
      <Sidebar />
      <Projects />
      <Bugs />
    </div>
  );
}
