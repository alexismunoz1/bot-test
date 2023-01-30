const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoroles")
    .setDescription("Autorole method"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setImage(
        "https://cdn.discordapp.com/attachments/1060631264811569233/1068210071294717993/Onboarding_Preu_Filadd_Discord_3.png"
      )
      .setTitle("Selecciona tu disponibilidad")
      .setColor("#0000FF");

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("am")
        .setLabel("Mañana")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("pm")
        .setLabel("Tarde")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      embeds: [embed],
      components: [button],
    });
  },
};
