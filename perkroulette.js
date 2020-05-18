import { MessageEmbed } from "discord.js"
import mergeImg from "merge-img"
import createTempFile from "create-temp-file"
import { perkImageUrl } from "./dbd/images.js"
import { getPerks } from "./dbd/data.js"

function toPerksEmbed(perks, tempFile) {
    return Promise.all(perks.map(perk => perkImageUrl(perk.perk_tag)))
        .then(images => mergeImg(images))
        .then(image => new Promise(resolve => image.write(tempFile.path, resolve)))
        .then(() => new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Perkroulette")
            .addFields(perks.map((perk, perkIndex) => ({ name: `Perk Nr. ${perkIndex + 1}`, value: perk.perk_name, inline: true})))
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
        result: getPerks({ role: "Survivor" })
            .then(perks => randomDistinctElementsOf(perks, 4))
            .then(selection => toPerksEmbed(selection, tempFile)),
        cleanup: tempFile.cleanupSync
    }
}

const handleKillerPerkroulette = () => {
    const tempFile = createTempFile(".png")
    return {
        result: getPerks({ role: "Killer" })
            .then(perks => randomDistinctElementsOf(perks, 4))
            .then(selection => toPerksEmbed(selection, tempFile)),
        cleanup: tempFile.cleanupSync
    }
}

export default [
    { trigger: "perkroulette survivor", handler: handleSurvivorPerkroulette },
    { trigger: "perkroulette killer", handler: handleKillerPerkroulette },
    { trigger: "perkroulette", handler: handleSurvivorPerkroulette }
]