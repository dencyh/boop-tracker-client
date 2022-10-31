import Sidebar from "../components/sidebar";
import Bugs from "../features/bugs";
import ProjectsList from "../components/projectsSidebar";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Settings from "../features/settings";
import Milestones from "../features/milestones";
import NotFound from "./notFound";
import BugInside from "../features/bugs/bugInside/bugInside";
import Project from "../features/projects";
import { Context } from "..";
import ConfirmEmail from "./confirmEmail";
import { observer } from "mobx-react-lite";
import Introduction from "../features/introduction";

function Home() {
  const { store } = useContext(Context);
  if (store.user?.emailConfirmed === false) return <ConfirmEmail />;

  return (
    <div className="flex">
      <Introduction />
      <Sidebar />
      <ProjectsList />
      <Routes>
        <Route path="/" element={<Bugs />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/bugs/:id" element={<BugInside />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default observer(Home);
