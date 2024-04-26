const db = require('../helpers/db.helper');

module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
};

async function create(params) {
  try {
    const { campaignId, ...teamParams } = params;
    const team = await db.Team.create(teamParams);
    if (campaignId) {
      const campaign = await db.Campaign.findByPk(campaignId);
      if (campaign) {
        await team.setCampaign(campaign);
      }
    }
    return team;
  } catch (error) {
    return error;
  }
}

async function getById(id) {
  const team = await db.Team.findByPk(id);
  if (!team) return "Team not found";
  return team;
}

async function update(id, params) {
  const team = await getById(id);
  if (!team) {
    return "Team not found";
  }

  try {
    const { campaignId, ...teamParams } = params;
    if (campaignId) {
      const campaign = await db.Campaign.findByPk(campaignId);
      if (campaign) {
        await team.setCampaign(campaign);
      }
    }
    await team.update(teamParams);
    return team;
  } catch (error) {
    return error;
  }
}

async function getAll() {
  return await db.Team.findAll();
}

async function _delete(id) {
  return await db.Team.destroy({ where: { id: id } });
}
