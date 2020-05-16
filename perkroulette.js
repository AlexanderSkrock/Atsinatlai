import { MessageEmbed } from "discord.js"
import mergeImg from "merge-img"
import createTempFile from "create-temp-file"
import SURVIVOR_PERKS from "./res/survivor_perks.json"
import KILLER_PERKS from "./res/killer_perks.json"

const lowercaseFirstChar = string => string.charAt(0).toLowerCase() + string.slice(1)

const toTitleCase = string => string
    .split(/ /g).map(word =>
        `${word.substring(0,1).toUpperCase()}${word.substring(1)}`)
    .join(" ");

const toFileName = string => {
    const normalizedString = string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/&/g, "and")
        .replace(/[-':!]/g, "")
        .replace(/^[H|h]ex/, "");
    return lowercaseFirstChar(toTitleCase(normalizedString).replace(/\s/g, ""))
}

function toPerksEmbed(perkNames, tempFile) {
    const images = perkNames.map(perkName => `./res/perk_icons/iconPerks_${toFileName(perkName)}.png`)
    return mergeImg(images)
        .then(image => new Promise(resolve => image.write(tempFile.path, resolve)))
        .then(() => new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Perkroulette")
            .addFields(perkNames.map((perkName, perkIndex)=> ({ name: `Perk Nr. ${perkIndex + 1}`, value: perkName, inline: true})))
            .attachFiles([{ name: "perks.png", attachment: tempFile.path}])
            .setImage("attachment://perks.png"))
}

function randomElementOf(array) {
    if (!array || array.length < 1) return undefined
    return array[Math.floor(Math.random() * array.length)];
}

function randomDistinctElementsOf(array, n) {
    if (!array) return []
    if (array.length <= n) return [...array]

    const result = new Set()
    while (result.size < n) {
        result.add(randomElementOf(array))
    }
    return Array.from(result)
}

const handleSurvivorPerkroulette = () => {
    const tempFile = createTempFile(".png")
    return {
        result: toPerksEmbed(randomDistinctElementsOf(SURVIVOR_PERKS, 4), tempFile),
        cleanup: tempFile.cleanupSync
    }
}

const handleKillerPerkroulette = () => {
    const tempFile = createTempFile(".png")
    return {
        result: toPerksEmbed(randomDistinctElementsOf(KILLER_PERKS, 4), tempFile),
        cleanup: tempFile.cleanupSync
    }
}

export default [
    { trigger: "perkroulette survivor", handler: handleSurvivorPerkroulette },
    { trigger: "perkroulette killer", handler: handleKillerPerkroulette },
    { trigger: "perkroulette", handler: handleSurvivorPerkroulette }
]