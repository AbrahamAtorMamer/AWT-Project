const teamService = require('./team.service');

module.exports = {
  create,
  getById,
  update,
  getAll,
  delete: _delete,
};

async function create(req, res, next) {
  teamService.create(req.body)
    .then(team => {
      res.status(200).send({
        message: 'Success',
        data: team,
      });
    })
    .catch(next);
}

async function getById(req, res, next) {
  teamService.getById(req.params.id)
    .then(team => {
      res.status(200).send({
        message: team ? 'Success' : 'Team not found',
        data: team,
      });
    })
    .catch(next);
}

async function update(req, res, next) {
  teamService.update(req.params.id, req.body)
    .then(team => {
      res.status(200).send({
        message: team ? 'Success' : 'Team not found',
        data: team,
      });
    })
    .catch(next);
}

async function getAll(req, res, next) {
  teamService.getAll()
    .then(teams => {
      res.status(200).send({
        message: 'Success',
        data: teams,
      });
    })
    .catch(next);
}

async function _delete(req, res, next) {
  teamService.delete(req.params.id)
    .then(() => {
      res.status(200).send({
        message: 'Success',
      });
    })
    .catch(next);
}
