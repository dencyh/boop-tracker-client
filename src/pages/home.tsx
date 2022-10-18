import Sidebar from "../components/sidebar/sidebar";
import Bugs from "../features/bugs";
import ProjectsList from "../components/projectsSidebar/projectsList";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Settings from "../features/settings/settings";
import Milestones from "../features/milestones/milestones";
import NotFound from "./notFound";
import BugInside from "../features/bugs/bugInside/bugInside";

export function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <ProjectsList />
      <Routes>
        <Route path="/" element={<Bugs />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/bugs/:id" element={<BugInside />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
