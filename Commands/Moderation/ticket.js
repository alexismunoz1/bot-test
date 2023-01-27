require("dotenv/config");
const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ticket")
        .setLabel("Nuevo Ticket")
        .setStyle(ButtonStyle.Success)
    );

    const embed = new EmbedBuilder().setTitle(
      `Clickea el boton de abajo para crear un nuevo ticket`
    );

    const embed2 = new EmbedBuilder().setTitle(`Bienvenido a tu ticket`);

    await interaction.channel.send({ embeds: [embed], components: [button] });
    await interaction.reply({
      content: `El mensaje de ticket se envio correctamente`,
      ephemeral: true,
    });

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on(`collect`, async (item) => {
      const channel = await interaction.guild.channels.create({
        name: `Ticket ${item.user.username}`,
        type: ChannelType.GuildText,
        parent: process.env.CATEGORY_TICKETS_ID,
      });

      channel.permissionOverwrites.create(item.user.id, {
        ViewChannel: true,
        SendMessages: true,
      });

      channel.permissionOverwrites.create(channel.guild.roles.everyone, {
        ViewChannel: false,
        SendMessages: false,
      });

      await item.reply({
        content: "Tu ticket se creo con exito",
        ephemeral: true,
      });

      channel.send({ embeds: [embed2] });
    });
  },
};
