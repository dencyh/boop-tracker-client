import dayjs from "dayjs";
import { IBug } from "../models/IBug";

/**
 *
 * @param bug IBug
 * @returns number is floored different between now and bug due value in days
 */
export const checkBugTime = (bug: IBug) =>
  Math.floor(dayjs(bug.due).diff(dayjs(), "day", true));
