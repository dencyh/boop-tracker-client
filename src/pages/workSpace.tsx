import Sidebar from "../components/sidebar/sidebar";
import Bugs from "./views/workspaceContainer/bugs";
import ProjectsList from "../components/sidebar/projects/projectsList";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./views/workspaceContainer/feed";
import Timesheet from "./views/workspaceContainer/timesheet";
import Milestones from "./views/workspaceContainer/milestones";
import NotFound from "./notFound";

export function WorkSpace() {
  return (
    <div className="flex">
      <Sidebar />
      <ProjectsList />
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
