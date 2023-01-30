require("dotenv/config");
const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Create a new suggestion")
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("Describe your suggestion")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const suggestion = interaction.options.getString("suggestion");
    const { guild } = interaction;

    const channel = interaction.guild.channels.cache.find(
      (item) => item.id === process.env.CHANNEL_SUGGESTIONS_LOGS
    );

    const embed = new EmbedBuilder()
      .setTitle(`Suggestion of ${interaction.user.username}`)
      .setColor("0000FF")
      .setDescription(`${suggestion}`)
      .setFooter({ text: `${guild.name}` })
      .setTimestamp();

    const message = await channel.send({ embeds: [embed], fetchReply: true });

    message.react("👍");
    message.react("👎");

    interaction.reply({
      content: "Your suggestion was created successfully",
      ephemeral: true,
    });
  },
};
