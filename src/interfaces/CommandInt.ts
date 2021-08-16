import { Message } from "discord.js";

export interface BaseCommandInt {
    name: string;
    description: string;
    cooldown?: number;
    usage?: string;
    aliases?: string[];

    // run: ((message: Message) => Promise<void>) 
    // | ((message: Message, args: string[]) => Promise<void>)
    // | ((message: Message, args?: string[]) => Promise<void>) ;

}

//  NOTE // 
// Since Interfaces cannot harbor Logic,
// one way to endure logic is to split and create
// interfaces based on the logic

// CommandInt is for non Arg Commands
export interface CommandIntNoArgs extends BaseCommandInt {
    run: (message: Message) => Promise<void>;
}

// For Command that REQUIRE ARGS
export interface CommandIntArgs extends BaseCommandInt {
    run: (message: Message, args: string[]) => Promise<void>;
}

// For Commands where Args are OPTIONAL
export interface CommandIntOptionalArgs extends BaseCommandInt {
    run: (message: Message, args?: string[]) => Promise<void>;
}

export type CommandInt = CommandIntNoArgs | CommandIntArgs | CommandIntOptionalArgs;
