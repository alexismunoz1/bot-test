require("dotenv/config");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
  AuditLogEvent,
  EmbedBuilder,
} = require("discord.js");

const { Channel, Message, Reaction, GuildMember, User } = Partials;
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  GuildMessageReactions,
  GuildEmojisAndStickers,
} = GatewayIntentBits;

//3276799 es el total de intents, es mas cencillo que colocar intents por intents
const client = new Client({
  restTimeOffset: 0,
  partials: [Channel, Message, Reaction, GuildMember, User],
  intents: 3276799,
});

const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();

loadEvents(client);
require("./Handlers/antiCrash")(client);

client.login(process.env.DISCORD_TOKEN);

// Logs Events ChannelDelete
client.on(Events.ChannelDelete, async (channel) => {
  channel.guild
    .fetchAuditLogs({
      type: AuditLogEvent.ChannelDelete,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();
      const { name, id } = channel;
      let type = channel.type;

      if (type == 0) type == "text";
      if (type == 2) type == "voice";
      if (type == 4) type == "category";
      if (type == 5) type == "announcement";
      if (type == 13) type == "stage";
      if (type == 15) type == "forum";

      const channelLogsId = process.env.CHANNEL_LOGS_ID;
      const Channel = await channel.guild.channels.cache.get(channelLogsId);

      const embed = new EmbedBuilder()
        .setTitle("Channel deleted")
        .addFields({ name: "Name of channel", value: `${name}` })
        .addFields({ name: "ID of channel", value: `${id}` })
        .addFields({ name: "Deleted by", value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

// Logs Events ChannelCreate
client.on(Events.ChannelCreate, async (channel) => {
  channel.guild
    .fetchAuditLogs({
      type: AuditLogEvent.ChannelCreate,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();
      const { name, id } = channel;
      let type = channel.type;

      const integromat = channel.guild.members.cache.find(
        (members) => members.user.id == "494177474192736270"
      );
      console.log(integromat);

      if (type == 0) type == "text";
      if (type == 2) type == "voice";
      if (type == 4) type == "category";
      if (type == 5) type == "announcement";
      if (type == 13) type == "stage";
      if (type == 15) type == "forum";

      const channelLogsId = process.env.CHANNEL_LOGS_IDTETS;
      const Channel = await channel.guild.channels.cache.get(channelLogsId);

      const embed = new EmbedBuilder()
        .setTitle("Channel created")
        .addFields({ name: "Name of channel", value: `${name} (<#${id}>)` })
        .addFields({ name: "ID of channel", value: `${id}` })
        .addFields({ name: "Created by", value: `${executor.tag}` })
        .addFields({ name: "Integromat", value: `${integromat}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

// Logs Events MessageUpdate
client.on(Events.MessageUpdate, async (message, newMessage) => {
  message.guild
    .fetchAuditLogs({
      type: AuditLogEvent.MessageUpdate,
    })
    .then(async () => {
      const { author } = message;
      console.log({ author });
      const msg = message.content;

      if (!msg) return;

      const channelLogsId = process.env.CHANNEL_LOGS_ID;
      const Channel = await message.guild.channels.cache.get(channelLogsId);

      const embed = new EmbedBuilder()
        .setTitle("Update message")
        .addFields({ name: "Initial message", value: `${msg}` })
        .addFields({ name: "Updated message", value: `${newMessage}` })
        .addFields({ name: "Created by", value: `${author}` })
        .setTimestamp();

      // Channel.send({ embeds: [embed] });
    });
});
