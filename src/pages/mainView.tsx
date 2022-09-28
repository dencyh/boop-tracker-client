import Sidebar from "../components/sidebar/sidebar";
import Bugs from "./views/mainContainer/bugs";
import Projects from "../components/projects/projects";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./views/mainContainer/feed";
import Timesheet from "./views/mainContainer/timesheet";
import Milestones from "./views/mainContainer/milestones";
import NotFound from "./notFound";

export function MainView() {
  return (
    <div className="flex">
      <Sidebar />
      <Projects />
      <Routes>
        <Route path="/" element={<Bugs />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
