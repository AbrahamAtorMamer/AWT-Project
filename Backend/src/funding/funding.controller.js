const fundingService = require('./funding.services');

module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
};

async function create(req, res, next) {
  fundingService.create(req.body)
    .then(response => {
      res.status(200).send({
        message: typeof response === 'string' ? 'Error' : 'Success',
        data: response,
      });
    })
    .catch(next);
}

async function getById(req, res, next) {
  fundingService.getById(req.params.id)
    .then(response => {
      res.status(200).send({
        message: typeof response === 'string' ? 'Error' : 'Success',
        data: response,
      });
    })
    .catch(next);
}

async function update(req, res, next) {
  fundingService.update(req.params.id, req.body)
    .then(response => {
      res.status(200).send({
        message: typeof response === 'string' ? 'Error' : 'Success',
        data: response,
      });
    })
    .catch(next);
}

async function getAll(req, res, next) {
  fundingService.getAll()
    .then(response => {
      res.status(200).send({
        message: typeof response === 'string' ? 'Error' : 'Success',
        data: response,
      });
    })
    .catch(next);
}

async function _delete(req, res, next) {
  fundingService.delete(req.params.id)
    .then(response => {
      res.status(200).send({
        message: 'Success',
        data: response,
      });
    })
    .catch(next);
}
