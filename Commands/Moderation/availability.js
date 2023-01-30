const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("availability")
    .setDescription("Students will be able to choose their time availability")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {},
};
