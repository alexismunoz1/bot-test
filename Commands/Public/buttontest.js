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
    .setName("buttontest")
    .setDescription("Replies with Pong!"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`test1`)
        .setLabel(`Menu`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`test2`)
        .setLabel(`Pagina 1`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId(`test3`)
        .setLabel(`Pagina 2`)
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setTitle("Menu")
      .setDescription(
        "Pagina 1 comandos de utilidad, Pagina 2 comandos de moderacion"
      );

    const embed2 = new EmbedBuilder()
      .setTitle("Comandos de utilidad")
      .setFields({
        name: "/user",
        value: "Te mostrare la informacion sobre el usuario",
      });

    const embed3 = new EmbedBuilder()
      .setTitle("Comandos de moderacion")
      .setFields({
        name: "/ban",
        value: "Baneare a algun usuario",
      });

    await interaction.reply({ embeds: [embed], components: [button] });
    const collector = interaction.channel.createMessageComponentCollector();

    collector.on(`collect`, async (item) => {
      if (item.customId === "test1") {
        if (item.user.id !== interaction.user.id) {
          return await item.reply({
            content:
              "Solamente la persona que ejecuto el comando pueda elegir las opciones",
            ephemeral: true,
          });
        }
        await item.update({ embeds: [embed], components: [button] });
      }

      if (item.customId === "test2") {
        if (item.user.id !== interaction.user.id) {
          return await item.reply({
            content:
              "Solamente la persona que ejecuto el comando pueda elegir las opciones",
            ephemeral: true,
          });
        }
        await item.update({ embeds: [embed2], components: [button] });
      }

      if (item.customId === "test3") {
        if (item.user.id !== interaction.user.id) {
          return await item.reply({
            content:
              "Solamente la persona que ejecuto el comando pueda elegir las opciones",
            ephemeral: true,
          });
        }
        await item.update({ embeds: [embed3], components: [button] });
      }
    });
  },
};
