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
    // include: [
    //   {
    //     model: db.Category,
    //   },
    // ],
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
  // Check if user with the same email already exists
  // const existingCampaign = await db.Campaign.findOne({ where: { campaign_title } });
  // if (existingCampaign) {
  //   return "Campaign " + campaign_title + " already exists";
  // }

  // Create a new campaign
  const newCampaign = new db.Campaign({ campaign_title: params.campaign_title, 
    campaign_description: params.campaign_description, 
    campaign_image: params.campaign_image, campaign_location: params.campaign_location, 
    campaign_category: params.campaign_category, campaign_duration: params.
    campaign_duration });

  // Save the user to the database
  await newCampaign.save()


  return newCampaign;
}
// async function create(params) {
//   const { campaign_name, ...campaignParams } = params;
//   // const existingCampaign = await db.Campaign.findOne({ where: { campaign_name } });
//   // if (existingCampaign) {
//   //   return "Campaign " + campaign_name + " already exists";
//   // }

//   let campaign;
//   try {
//     campaign = await db.Campaign.create(campaignParams);
//     return campaign;
//   } catch (error) {
//     return error;
//   }
// }

async function update(id, params) {
  const campaign = await getCampaign(id);
  if (!campaign) {
    return "Campaign not found";
  }

  try {
    await campaign.update(params);
    return campaign;
  } catch (error) {
    return error;
  }
}

async function changeStatus(id) {
  const Campaign = await getCampaign(id);
  if (Campaign.campaign_status) {
    Campaign.campaign_status = false;
    console.log("Campaign inactivated");
  } else {
    Campaign.campaign_status = true;
    console.log("Campaign activated");
  }
  await Campaign.save();
  return Campaign;
}

async function searchByKeyword(searchKeyword) {
  const Campaign = await db.Campaign.findAll({
    where: { campaign_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!Campaign || Campaign.length === 0) return "No campaigns found";
  return Campaign;
}

async function getCampaign(id) {
  const Campaign = await db.Campaign.findByPk(id);
  if (!Campaign) return "Campaign not found";
  return Campaign;
}

async function del(id) {
  return await db.Campaign.destroy({
    where: {
      id,
    },
  });
}
