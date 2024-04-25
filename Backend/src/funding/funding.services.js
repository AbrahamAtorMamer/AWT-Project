const db = require('../helpers/db.helper');

module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
};

async function create(params) {
  const { campaign_id, ...fundingParams } = params;
  const existingFunding = await db.Funding.findOne({ where: { funding_type: fundingParams.funding_type } });
  if (existingFunding) {
    return "Funding type " + fundingParams.funding_type + " already exists";
  }

  let funding;
  try {
    funding = await db.Funding.create(fundingParams);
    if (campaign_id) {
      const campaign = await db.Campaign.findByPk(campaign_id);
      if (campaign) {
        await funding.setCampaign(campaign);
      }
    }
    return funding;
  } catch (error) {
    return error;
  }
}

async function getById(id) {
  const funding = await db.Funding.findByPk(id);
  if (!funding) return "Funding not found";
  return funding;
}

async function update(id, params) {
  const { campaign_id, ...fundingParams } = params;
  const funding = await getById(id);
  if (!funding) {
    return "Funding not found";
  }

  try {
    if (campaign_id) {
      const campaign = await db.Campaign.findByPk(campaign_id);
      if (campaign) {
        await funding.setCampaign(campaign);
      }
    }
    await funding.update(fundingParams);
    return funding;
  } catch (error) {
    return error;
  }
}

async function getAll() {
  return await db.Funding.findAll();
}

async function _delete(id) {
  return await db.Funding.destroy({ where: { funding_id: id } });
}
