const fs = require('fs');
const path = require('path');
const db = require("../helpers/db.helper");
const multer = require("multer");
const campaign_service = require("../campaign/campaign.service");


const addCampaign = async (req, res) => {

      let info = {
        campaign_title: req.body.campaign_title,
        campaign_description: req.body.campaign_description,
        campaign_amount: req.body.campaign_amount,
        campaign_image: req.file.path,
        campaign_location: req.body.campaign_location,
        campaign_category: req.body.campaign_category,
        campaign_duration: req.body.campaign_duration,
        user_id: 1
      }

  const campaign = await db.Campaign.create(info)
  res.status(200).send(campaign)
  console.log(campaign)

}

// Function to generate and store campaign ID in a JSON file
const storeCampaignId = (campaignId) => {
  const filePath = path.join(__dirname, 'campaign_id.json');
  const data = JSON.stringify({ campaignId });

  fs.writeFile(filePath, data, (err) => {
      if (err) {
          console.error('Error storing campaign ID:', err);
      } else {
          console.log('Campaign ID stored successfully:', campaignId);
      }
  });
};



const create = (req, res, next) => {
  campaign_service
    .create(req.body)
    .then((response) =>
      res.status(200).send({
        message: typeof response === "string" ? "Error" : "Success",
        data: response,
      })
    )
    .catch(next);
};
const findAll = (req, res, next) => {
  campaign_service
    .getAll()
    .then((response) =>
      res.status(200).send({
        message: typeof response === "string" ? "Error" : "Success",
        data: response,
      })
    )
    .catch(next);
};
const findOne = (req, res, next) => {
  campaign_service.getById(req.params.id, (error, response) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: typeof response === "string" ? "Error" : "Success",
        data: response,
      });
    }
  });
};
const update = (req, res, next) => {
  campaign_service
    .update(req.params.id, req.body)
    .then((response) =>
      res.status(200).send({
        message: typeof response === "string" ? "Error" : "Success",
        data: response,
      })
    )
    .catch(next);
};
const _delete = (req, res, next) => {
  campaign_service
    .changeStatus(req.params.id)
    .then((response) =>
      res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
const search = (req, res, next) => {
  campaign_service
    .searchByKeyword(req.params.keyword)
    .then((response) =>
      res.status(200).send({
        message: typeof response === "string" ? "Error" : "Success",
        data: response,
      })
    )
    .catch(next);
};

const del = (req, res, next) => {
  campaign_service
    .del(req.params.id)
    .then((response) =>
      res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};

// 8. Upload Image Controller

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

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('campaign_image')

module.exports = {
addCampaign,
create,
_delete,
update,
findAll,
findOne,
search,
del,
upload,
}