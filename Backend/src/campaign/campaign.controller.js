const fs = require('fs');
const path = require('path');
const campaign_service = require("../campaign/campaign.service");

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

exports.createId = async (params) => {
try {
  // Call the campaign service to create the campaign
  const response = await campaign_service.create(params);
  
  // Assuming response contains the created object with an 'id' property
  const id = response.campaign_id;
  
  // Store the retrieved ID
  storeCampaignId(id);
  
  // Return the campaign ID directly
  return id;
} catch (error) {
  console.error("Error creating campaign:", error);
  throw error;
}
};

exports.create = (req, res, next) => {
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
exports.findAll = (req, res, next) => {
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
exports.findOne = (req, res, next) => {
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
exports.update = (req, res, next) => {
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
exports.delete = (req, res, next) => {
  campaign_service
    .changeStatus(req.params.id)
    .then((response) =>
      res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
exports.search = (req, res, next) => {
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

exports.del = (req, res, next) => {
  campaign_service
    .del(req.params.id)
    .then((response) =>
      res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};