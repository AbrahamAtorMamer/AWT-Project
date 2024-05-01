// const Campaign = require("../campaign/campaign.model");
// const Funding = require("../funding/funding.model");
// const Team = require("../team/team.model");

// class Association {
//   static associateModels() {
//     Campaign.hasOne(Funding, { foreignKey: 'campaign_id' });
//     Funding.belongsTo(Campaign, { foreignKey: 'campaign_id' });

//     Campaign.hasMany(Team, { foreignKey: 'campaign_id' });
//     Team.belongsTo(Campaign, { foreignKey: 'campaign_id' });

//     // Add more associations as needed
//   }
// }

// module.exports = Association;
