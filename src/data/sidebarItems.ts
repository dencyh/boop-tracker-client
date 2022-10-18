import { v4 as uuidv4 } from "uuid";
import {
  faBug,
  faStopwatch,
  faCog,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ISidebarMenuItem {
  id: string;
  text: string;
  link: string;
  icon: IconDefinition;
}

export const sidebarItems: ISidebarMenuItem[] = [
  { id: uuidv4(), text: "Milestones", link: "milestones", icon: faEnvelope },
  { id: uuidv4(), text: "Bugs", link: "bugs", icon: faBug },
  { id: uuidv4(), text: "Settings", link: "settings", icon: faCog }
];
