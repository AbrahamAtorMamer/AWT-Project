const db = require('../helpers/db.helper');

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
