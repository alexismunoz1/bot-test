const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Date timeout a un usuario que eligas")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Usuario a dar timeout`)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName(`time`)
        .setDescription(`Tiempo del timeout en minutos`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName(`razon`).setDescription(`Razon del timeout`)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.timeout),

  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser(`target`);
    const time = interaction.options.getInteger(`time`);
    const { guild } = interaction;

    let razon = interaction.options.getString(`razon`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!razon) razon = "No hay razón";
    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: `No puedes darte timeout a ti mismo`,
        ephemeral: true,
      });
    }
    if (user.id === client.user.id) {
      return interaction.reply({
        content: `No puedes darme timeout a mi`,
        ephemeral: true,
      });
    }
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    ) {
      return interaction.reply({
        content: `No puedes dar timeout a alguien con un rol igual o superior al tuyo`,
        ephemeral: true,
      });
    }
    if (!member.timeout)
      return interaction.reply({
        content: `No puedo dar timeout a alguien con un rol superior al mio`,
        ephemeral: true,
      });

    if (time > 10000)
      return interaction.reply({
        content: `El tiempo no puede superar los 10.000 minutos`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${guild.iconURL({ dynamic: true }) || "imageURL"}`,
      })
      .setTitle(`${user.tag} ha sido timeouted en el servidor`)
      .setColor("#0000FF")
      .setTimestamp()
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        { name: `Razon`, value: `${razon}`, inline: true },
        { name: "Tiempo", value: `${time}`, inline: true }
      );

    await member.timeout(time * 60 * 1000, razon).catch(console.error);

    interaction.reply({ embeds: [embed] });
  },
};
