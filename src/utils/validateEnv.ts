

export const validateEnv = () => {

    // check if TOKEN is empty,
    // if so, stop running bot
    if(!process.env.TOKEN) {
        console.warn("Missing Bot Token!");
        return false;
    }

    if(!process.env.PREFIX) {
        console.warn("Missing Prefix, check your ENV");
        return false;
    }

    // if all envs pass, return true
    return true;
}