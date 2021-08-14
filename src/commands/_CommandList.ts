import { CommandInt } from "../interfaces/CommandInt";
import { github } from "./github";
import { link } from "./link";
import { list } from "./list";
import { lbprate } from "./lbprate";


export const CommandList: CommandInt[] = [github, link, list, lbprate];