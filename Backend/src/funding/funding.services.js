const db = require('../helpers/db.helper');
const campaignController = require("../campaign/campaign.controller");
module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
};


// async function create(params) {
//   // Check if user with the same email already exists
//   // const existingCampaign = await db.Campaign.findOne({ where: { campaign_name } });
//   // if (existingCampaign) {
//   //   return "Campaign " + campaign_name + " already exists";
//   // }

  
//   const newFunding = new db.Funding({ funding_type: params.funding_type, 
//     funding_location: params.funding_location, 
//     bank_account_location: params.bank_account_location});

//   // Save the user to the database
//   await newFunding.save()


//   return newFunding;
// }

async function create(params) {

  let funding;
  try {
    funding = await db.Funding.create({
      ...params // Ensure campaign_id is included in the creation params
    });

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
  return await db.Funding.findAll({
    include: [
      {
        model: db.Campaign,
        as: "Campaign"
      },
    ],
  });
}

async function _delete(id) {
  return await db.Funding.destroy({ where: { funding_id: id } });
}
