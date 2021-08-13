import { Message } from "discord.js";

export interface CommandInt {
    name: string;
    description: string;
    // TODO: Add other optional vars, like cooldown


    run: (message: Message) => Promise<void>;
}