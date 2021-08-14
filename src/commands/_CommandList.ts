import { CommandInt } from "../interfaces/CommandInt";
import { github } from "./github";
import { link } from "./link";
import { list } from "./list";


export const CommandList: CommandInt[] = [github, link, list];