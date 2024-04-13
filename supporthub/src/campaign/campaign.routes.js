const campaignController = require("../campaign/campaign.controller");
const express = require("express");
const router = express.Router();

router.post("/", campaignController.create);
router.get("/", campaignController.findAll);
router.get("/:id", campaignController.findOne);
router.get("/search/:keyword", campaignController.search);
router.put("/update/:id", campaignController.update);
router.delete("/:id", campaignController.delete);
router.delete("/del/:id",campaignController.del);
module.exports = router;