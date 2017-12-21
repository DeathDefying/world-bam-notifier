module.exports = function WorldBamNotifier(dispatch) {
  const bossName = {
    "35": "Nyxarras",
    "9050": "Yunaras Snaggletooth",
    "7011": "Linyphi",
    "33": "Betsael",
    "5011": "Tempest Kanash",
    "99": "Divine Reaver"
  };

  // templateId : huntingZoneId
  const bossId = [
    [35, 38], // Nyxarras
    [9050, 52], // Yunaras Snaggletooth
    [7011, 51], // Linyphi
    [33, 57], // Betsael
    [5011, 4], // Tempest Kanash
    [99, 10], // Divine Reaver
  ], msgObject = {
    unk1: 42, // 42 Blue Shiny Text, 31 Normal Text
    unk2: 0,
    unk3: 27,
    message: ""
  };

  const systemMessage = msg => {
    msgObject.message = msg;
    dispatch.toClient("S_DUNGEON_EVENT_MESSAGE", 1, msgObject);
  };

  dispatch.hook("S_SPAWN_NPC", 5, event => {
    const { templateId, huntingZoneId } = event;
    for (let i = 0, len = bossId.length; i < len; ++i) {
      const boss = bossId[i];
      if (templateId === boss[0] && huntingZoneId === boss[1]) {
        systemMessage("BAM Found: " + bossName[templateId]);
      }            
    }
  });
};
