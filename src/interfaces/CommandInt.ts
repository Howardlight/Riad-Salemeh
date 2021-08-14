import { Message } from "discord.js";

export interface CommandInt {
    name: string;
    description: string;
    cooldown?: number;
    usage?: string;

    run: (message: Message) => Promise<void>;
}