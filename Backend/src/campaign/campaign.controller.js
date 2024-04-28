const campaign_service = require("../campaign/campaign.service");
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
