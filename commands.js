import perkrouletteBindings from "./perkroulette.js"
import dbdInfoBindings from "./dbdInfo.js"

function buildCommand({ trigger, handler }) {
    return {
        isExecutable: message => message.content.startsWith(trigger),
        execute: handler,
    }
}

const commands = [
    ...perkrouletteBindings.map(buildCommand),
    ...dbdInfoBindings.map(buildCommand)
]

export default commands
