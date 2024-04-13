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
async function update(id, params) {
  const Campaign = await getCampaign(id);
  const nameChanged = params.Campaign_name && params.campaign_name !== Campaign.campaign_name;
  if (
    nameChanged &&
    (await db.Campaign.findOne({ where: { campaign_name: params.campaign_name } }))
  ) {
    return "Campaign with name " + params.campaign_name + " is already exists";
  }
  Object.assign(Campaign, params);
  await Campaign.save();
  return Campaign;
}
async function create(params) {
  if (await db.Campaign.findOne({ where: { campaign_name: params.campaign_name } })) {
    return "Campaign " + params.campaign_name + " is already exists";
  }
  const Campaign = new db.Campaign(params);

  await Campaign.save();
  return Campaign;
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