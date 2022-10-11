import Sidebar from "../components/sidebar/sidebar";
import Bugs from "../components/workspaceContainer/bugs";
import ProjectsList from "../components/sidebar/projects/projectsList";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "../components/workspaceContainer/feed";
import Timesheet from "../components/workspaceContainer/timesheet";
import Milestones from "../components/workspaceContainer/milestones";
import NotFound from "./notFound";
import BugInside from "../components/mainSection/bugs/bugInside/bugInside";

export function WorkSpace() {
  return (
    <div className="flex">
      <Sidebar />
      <ProjectsList />
      <Routes>
        <Route path="/" element={<Bugs />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/bugs/:id" element={<BugInside />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
