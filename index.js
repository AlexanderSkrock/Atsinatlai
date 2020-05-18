import { Client } from 'discord.js'
import { config as envConfig } from 'dotenv'
import commandHandlers from "./commands.js"

const client = new Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Invite: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=52224`)
});

client.on('message', msg => {
    const handler = commandHandlers.find(handler => handler.isExecutable(msg))
    if(handler) {
        handler.execute(msg)
    }
})

envConfig()
client.login(process.env.token)