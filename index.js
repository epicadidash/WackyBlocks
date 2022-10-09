import { Client, GatewayIntentBits,REST, SlashCommandBuilder, Routes, GuildMember } from 'discord.js';
import {config} from 'dotenv'
config()
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.Token);

rest.put(Routes.applicationGuildCommands(process.env.cid,process.env.gid), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
    client.on('guildMemberAdd',guildMember=>{
       const message = `Welcome <@${guildMember.id}> to the server!`
       const channelid = 1028271315729268748
       const channel = guildMember.guild.channels.cache.get(channelid)
       channel.send(message)

    })
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        const { commandName } = interaction;
    
        if (commandName === 'ping') {
            await interaction.reply('Pong!');
        } else if (commandName === 'server') {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        } else if (commandName === 'user') {
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
        }
    });
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(process.env.Token);