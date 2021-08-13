

export const validateEnv = () => {

    // check if TOKEN is empty,
    // if so, stop running bot
    if(!process.env.TOKEN) {
        console.warn("Missing Bot Token!");
        return false;
    }

    // if all envs pass, return true
    return true;
}