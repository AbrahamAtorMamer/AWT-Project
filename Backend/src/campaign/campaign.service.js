const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchByKeyword,
};
async function getAll() {
  return await db.Campaign.findAll({
    include: [
      {
        model: db.Category,
      },
    ],
  });
}
async function getById(id, callback) {
  getCampaign(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function create(params) {
  const { funding_id, ...campaignParams } = params;
  const existingCampaign = await db.Campaign.findOne({ where: { campaign_name: campaignParams.campaign_name } });
  if (existingCampaign) {
    return "Campaign " + campaignParams.campaign_name + " already exists";
  }

  let campaign;
  try {
    campaign = await db.Campaign.create(campaignParams);
    if (funding_id) {
      const funding = await db.Funding.findByPk(funding_id);
      if (funding) {
        await campaign.setFunding(funding);
      }
    }
    return campaign;
  } catch (error) {
    return error;
  }
}

async function update(id, params) {
  const { funding_id, ...campaignParams } = params;
  const campaign = await getCampaign(id);
  if (!campaign) {
    return "Campaign not found";
  }

  try {
    if (funding_id) {
      const funding = await db.Funding.findByPk(funding_id);
      if (funding) {
        await campaign.setFunding(funding);
      }
    }
    await campaign.update(campaignParams);
    return campaign;
  } catch (error) {
    return error;
  }
}

async function changeStatus(id) {
  const Campaign = await getCampaign(id);
  //    const ret_msg = '';
  if (Campaign.campaign_status) {
    Campaign.campaign_status = false;
    // ret_msg = 'Camp Inactivated';
    console.log("from true");
  } else {
    Campaign.campaign_status = true;
    console.log("from false");
    // ret_msg = 'Camp Activated';
  }
  await Campaign.save();
  return Campaign;
}
async function searchByKeyword(searchKeyword) {
  const Campaign = await db.Campaign.findAll({
    where: { campaign_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!Campaign || Campaign == []) return "no Campaign found";
  return Campaign;
}
async function getCampaign(id) {
  const Campaign = await db.Campaign.findByPk(id);
  if (!Campaign) return "Campaign not found";
  return Campaign;
}
async function del(did){
  return await db.Campaign.destroy({
    where:{
      id:did
    }
  });
}