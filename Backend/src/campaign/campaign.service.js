const db = require("../helpers/db.helper");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");

// Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('campaign_image')

module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
  upload,
};
async function create(params) {
  // Call the upload middleware to handle file upload
  
      // Extract file path from req.file
      const filePath = params.req.file.path;

      let info = {
        campaign_title: params.campaign_title,
        campaign_description: params.campaign_description,
        campaign_image: filePath, // Set the file path as campaign image
        campaign_location: params.campaign_location,
        campaign_category: params.campaign_category,
        campaign_duration: params.campaign_duration,
        user_id: 1
      }

      try {
        // Create campaign with the provided information
        const campaign = await db.Campaign.create(info);
        console.log(campaign);
        return campaign;
      } catch (error) {
        console.error("Error creating campaign:", error);
        return "Error creating campaign";
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
