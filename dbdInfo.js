import { MessageEmbed } from "discord.js"
import {getPerks, getSurvivors, getKillers} from "./dbd"

const evalControlSequences = string => string
    ? string.replace(/\\n/g, "\n")                 
            .replace(/\\r/g, "\r")
            .replace(/\\t/g, "\t")
            .replace(/\\f/g, "\f")
            .replace(/<br>/g, "\n")
    : "";

const toSuvivorInfoEmbed = survivor => new MessageEmbed()
    .setColor(0x0099ff)
    .setTitle(survivor.name)
    .addFields([
        { name: "Gender", value: survivor.gender, inline: true },
        { name: "Role", value: survivor.role, inline: true },
        { name: "Nationality", value: survivor.nationality, inline: true },
        { name: "Difficulty", value: survivor.difficulty, inline: true },
        { name: "Overview", value: evalControlSequences(survivor.overview), inline: false }
    ])
    .setThumbnail(survivor.icon && survivor.icon.portrait)

const toKillerInfoEmbed = killer => new MessageEmbed()
    .setColor(0x0099ff)
    .setTitle(killer.name)
    .addFields([
        { name: "Gender", value: killer.gender, inline: true },
        { name: "Nationality", value: killer.nationality, inline: true },
        { name: "Realm", value: killer.realm, inline: true },
        { name: "Power", value: killer.power, inline: true },
        { name: "Weapon", value: killer.weapon, inline: true },
        { name: "Speed", value: killer.speed, inline: true },
        { name: "Terror radius", value: killer.terror_radius, inline: true },
        { name: "Height", value: killer.height, inline: true },
        { name: "Difficulty", value: killer.difficulty, inline: true },
        { name: "Overview", value: evalControlSequences(killer.overview), inline: false }
    ])
    .setThumbnail(killer.icon && killer.icon.portrait)

const toPerkInfoEmbed = perk => new MessageEmbed()
    .setColor(0x0099ff)
    .setTitle(perk.perk_name)
    .addFields([
        { name: "Role", value: perk.role, inline: true },
        { name: "Available for", value: perk.name, inline: true },
        { name: "Teachable at", value: `Level: ${perk.teach_level}` || "no teachable perk", inline: true },
        { name: "Description", value: evalControlSequences(perk.description), inline: false },
    ])
    .setThumbnail(perk.icon)

const survivorInfo = message => {
    const survivorName = message.content.replace(/^survivorinfo /, "")
    return getSurvivors({ name_tag: survivorName.toUpperCase() })
        .then(survivors => {
            if (!survivors || survivors.length < 1) {
                message.reply(`No survivor found for query string: ${survivorName}`)
            } else if (survivors.length > 1) {
                message.reply(`Multiple matching survivors found '${survivors.map(survivor => survivor.name).join(",")}' for query string: ${survivorName}`)
            } else {
                message.reply(toSuvivorInfoEmbed(survivors[0]))
            }
        })
}

const killerInfo = message => {
    const killerName = message.content.replace(/^killerinfo /, "")
    return getKillers({ name_tag: killerName.toUpperCase() })
        .then(killers => {
            if (!killers || killers.length < 1) {
                message.reply(`No survivor found for query string: ${killerName}`)
            } else if (killers.length > 1) {1
                message.reply(`Multiple matching survivors found '${killers.map(killer => killer.name).join(",")}' for query string: ${killerName}`)
            } else {
                message.reply(toKillerInfoEmbed(killers[0]))
            }
        })
}

const perkInfo = message => {
    const perkName = message.content.replace(/^perkinfo /, "")
    return getPerks({ perk_name: perkName })
        .then(perks => {
            if (!perks || perks.length < 1) {
                message.reply(`No perk found for query string: ${perkName}`)
            } else if (perks.length > 1) {
                message.reply(`Multiple matching perks found '${perks.map(perk => perk.perk_name).join(",")}' for query string: ${perkName}`)
            } else {
                message.reply(toPerkInfoEmbed(perks[0]))
            }
        })
}

export default [
    { trigger: "survivorinfo", handler: survivorInfo },
    { trigger: "killerinfo", handler: killerInfo },
    { trigger: "perkinfo", handler: perkInfo }
]