import { CommandInt } from "../interfaces/CommandInt";
import { github } from "./github";
import { link } from "./link";
import { list } from "./list";
import { lbprate } from "./lbprate";
import { help } from "./help";
import { getUptime } from "./getUptime";
import { convert } from "./convert";
import { fuel } from "./fuel";
import {sayrafa} from "./sayrafa";

export const CommandList: CommandInt[] = [github, link, list, lbprate, help, getUptime, convert, fuel, sayrafa];