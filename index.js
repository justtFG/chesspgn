const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ActionRowBuilder,
    Events,
    StringSelectMenuBuilder,
    ActivityType,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    MessageEmbed,
    StringSelectMenuOptionBuilder
} = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});
//#endregion  CONSTRUCTOR

//#region SLASH ET READY
client.on('ready', () => {

    //& Help
    client.application.commands.create({
        name: "help",
        description: "Need help ?"
    });

    //& FG
    client.application.commands.create({
        name: "fg",
        description: "FG"
    });

    client.application.commands.create({
        name: "chess",
        description: "chess pgn",
        options: [{
            name: 'test',
            description: "Music name or URL",
            type: 3,
            required: false,
        }]
    });



    //#region ACTIVITE
    //* Activité
    client.user.setActivity({
        name: "tester des commandes",
        type: ActivityType.Playing
    });
    //#endregion ACTIVITE


    //#region VERIF
    //* Verif si co
    console.log("Le BOT ${client.user.tag} est en ligne !");
    //#endregion VERIF

});
//#endregion SLASH ET READY
//#endregion CONFIG


//#region FICHIERS
client.on("interactionCreate", interaction => require("./commandes.js")(client, interaction))

//#region TOKEN
client.login("MTEzNDA3MzIyNjIwOTc4NzkxNg.GVgP5B.DkpACNdh0AB6t-X4KukZbNFHPlxpIHKueZKPwg");
//#endregion token