import perkrouletteBindings from "./perkroulette.js"

function trimLeft (string, charlist) {
    if (charlist === undefined)
        charlist = "\s";
    return string.replace(new RegExp("^" + charlist + "+"), "");
}

function buildCommand({ trigger, handler}) {
    return {
        isExecutable: message => message.content.startsWith(trigger),
        execute: handler,
    }
}

const commands = perkrouletteBindings.map(buildCommand)

export default commands
