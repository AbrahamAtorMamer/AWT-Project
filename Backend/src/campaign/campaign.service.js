const db = require("../helpers/db.helper");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const { login } = require('../profile/user.controller');
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
// async function create(params, req) {
  

//   return new Promise((resolve, reject) => {
//     upload(req, null, async function (err) {
//       if (err instanceof multer.MulterError) {
//         // A multer error occurred (e.g., file size exceeded)
//         return reject(err);
//       } else if (err) {
//         // An unknown error occurred
//         return reject(err);
//       }

//       // Multer middleware has successfully handled the file upload
//       const userId = req.user_id;
//       const newCampaign = new db.Campaign({
//         campaign_title: params.campaign_title,
//         campaign_description: params.campaign_description,
//         campaign_image: req.file ? req.file.path : "", // Store file path in the database (assuming file upload succeeded)
//         campaign_location: params.campaign_location,
//         campaign_category: params.campaign_category,
//         campaign_duration: params.campaign_duration,
//         user_id: 1 
//       });

//       try {
//         // Save the campaign to the database
//         await newCampaign.save();
//         resolve(newCampaign);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// }
// Function to handle campaign creation
// async function create(params) {
//   try {
//     // Call the login function to authenticate and retrieve user data
//     const userData = await login(); // Assuming you have credentials
//     console.log(userData);
//     // Extract the user ID from userData
//     const userId = userData.data.user.id;

//     // Now you have the userId, you can proceed with creating the campaign
//     const newCampaign = await create(params, userId); // Assuming create function takes userId

//     // Return the created campaign
//     return newCampaign;
//   } catch (error) {
//     // Handle errors
//     console.error("Error:", error.message);
//     throw error; // Rethrow the error to handle it at a higher level if needed
//   }
// }
async function create(params) {

// Call the login function to authenticate and retrieve user data
     const userData = await login(); // Assuming you have credentials
     console.log(userData);
//     // Extract the user ID from userData
    const userId = userData.data.user.id;
  const newCampaign = new db.Campaign({     
    campaign_title: params.campaign_title, 
    campaign_description: params.campaign_description, 
    campaign_image: params.campaign_image, 
    campaign_location: params.campaign_location, 
    campaign_category: params.campaign_category, 
    campaign_duration: params.campaign_duration,
    user_id: userId 
   });

  // Save the campaign to the database
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
