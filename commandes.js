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
    const { Chess } = require('chess.js');
    const intents = [
        GatewayIntentBits.Guilds,           // To receive guild events
        GatewayIntentBits.GuildMessages,    // To receive messages in guilds
        GatewayIntentBits.MessageContent,
    ];
    const client = new Client({ intents });
    
    const chessCommand = {
        data: new SlashCommandBuilder()
            .setName('chess')
            .setDescription('Load a chessboard from a PGN string')
            .addStringOption(option =>
                option.setName('pgn')
                    .setDescription('The PGN string representing the chess game')
                    .setRequired(true) // Set to true to make the pgn option mandatory
            ),
        async execute(client, interaction) {
            const chess = new Chess();
            const pgn = interaction.options.getString('pgn');
    
            if (!pgn) {
                interaction.reply("Please provide a PGN string using the 'pgn' option.");
                return;
            }
    
            const moves = pgn.split('\n').filter(line => line.trim() !== '');
            chess.load_pgn(moves.join(' '));
    
            // Now you can display the chessboard
            console.log(chess.ascii());
            interaction.reply(`Chessboard loaded from PGN:\n\`\`\`\n${chess.ascii()}\n\`\`\``);
        },
    };
    
    client.commands = new Map();
    client.commands.set(chessCommand.data.name, chessCommand);
    
    
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        const { commandName } = interaction;
    
        if (!client.commands.has(commandName)) return;
    
        try {
            await client.commands.get(commandName).execute(client, interaction);
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while executing the command.');
        }
    });
    