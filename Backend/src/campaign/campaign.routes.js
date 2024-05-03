const campaignController = require("../campaign/campaign.controller");
const campaignService = require("../campaign/campaign.service");
const express = require("express");
const router = express.Router();

router.post("/", campaignController.upload,campaignController.addCampaign);
router.get("/campaigns", campaignController.findAll);
router.get("/:id", campaignController.findOne);
router.get("/search/:keyword", campaignController.search);
router.put("/update/:id", campaignController.update);
router.delete("/:id", campaignController._delete);
router.delete("/del/:id",campaignController.del);
module.exports = router;