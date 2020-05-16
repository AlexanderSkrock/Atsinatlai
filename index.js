import { Client, MessageEmbed } from 'discord.js'
import CONF from "./config.json"
import commandHandlers from "./commands.js"

const client = new Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Invite: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=52224`)
});

client.on('message', msg => {
    const handler = commandHandlers.find(handler => handler.isExecutable(msg))
    if (handler) {
        const {result, cleanup} = handler.execute(msg)
        result
            .then(response => msg.reply(response))
            .then(() => {
                if (cleanup)
                    cleanup()
            })
    }
})

client.login(CONF.token)