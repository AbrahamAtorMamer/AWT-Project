const db = require("../helpers/db.helper");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
};

async function create(params) {
  const { user_id, ...campaignParams } = params;

  console.log("user_id:", user_id); // Log user_id to check its value

  try {
    // Validate if required fields are present and not null
    const requiredFields = ['campaign_title', 'campaign_description', 'campaign_image', 'campaign_location', 'campaign_category', 'campaign_duration'];
    for (const field of requiredFields) {
      if (!campaignParams[field]) {
        throw new Error(`Campaign.${field} cannot be null or empty`);
      }
    }

    // Create the campaign
    const campaign = await db.Campaign.create({
      ...campaignParams,
      user_id: user_id // Ensure user_id is included in the creation params
    });

    // If user_id exists, associate user with campaign
    if (user_id) {
      const user = await db.User.findByPk(user_id);
      if (user) {
        await campaign.setUser(user);
      }
    }

    return campaign;
  } catch (error) {
    return error;
  }
}



async function getById(id) {
  const campaign = await db.Campaign.findByPk(id);
  if (!campaign) return "Campaign not found";
  return campaign;
}

async function update(id, params) {
  const { user_id, ...campaignParams } = params;
  const campaign = await getById(id);
  if (!campaign) {
    return "Campaign not found";
  }

  try {
    if (user_id) {
      const user = await db.User.findByPk(user_id);
      if (user) {
        await campaign.setUser(user);
      }
    }
    await campaign.update(campaignParams);
    return campaign;
  } catch (error) {
    return error;
  }
}

async function getAll() {
  return await db.Campaign.findAll({
    include: [
      {
        model: db.User,
        as: "User"
      },
    ],
  });
}

async function _delete(id) {
  return await db.Campaign.destroy({ where: { campaign_id: id } });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images"); // Specify the directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the original filename for uploaded files
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("image");