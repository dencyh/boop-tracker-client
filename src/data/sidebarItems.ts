import {v4 as uuidv4} from "uuid";
import {faBug, faPaperPlane, faStopwatch, faToiletPaper} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface ISidebarMenuItem {
  id: string,
  text: string,
  icon: IconDefinition
}

export const sidebarItems: ISidebarMenuItem[] = [
  {id: uuidv4(), text: "Milestones", icon: faEnvelope},
  {id: uuidv4(), text: "Bugs", icon: faBug},
  {id: uuidv4(), text: "Timesheet", icon: faStopwatch},
  {id: uuidv4(), text: "Feed", icon: faToiletPaper}

];