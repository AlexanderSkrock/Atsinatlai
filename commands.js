import perkrouletteBindings from "./perkroulette.js"

function buildCommand({ trigger, handler }) {
    return {
        isExecutable: message => message.content.startsWith(trigger),
        execute: handler,
    }
}

const commands = perkrouletteBindings.map(buildCommand)

export default commands
