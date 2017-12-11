const router = require('express').Router();
const { Campus } = require('../db/models');

module.exports = router;

router.get('/', function(req, res, next) {
  Campus.findAll()
    .then(campuses => {
      res.json(campuses)
    })
    .catch(next);
})

router.get('/:campusId', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then(campus => res.json(campus))
    .catch(next)
})

router.delete('/:campusId', (req, res, next) => {
  const id = req.params.campusId

  Campus.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})

router.post('/new-campus', (req, res, next) => {
  Campus.create(req.body)
    .then((campus) => res.json(campus))
    .catch(next)
})

router.put('/edit', (req, res, next) => {
  const studentId = req.body.id;

  Campus.findById(studentId)
    .then(campus => campus.update(req.body))
    .then(campus => res.json(campus))
    .catch(next);
})

router.delete('/:campusId', (req, res, next) => {
  Campus.destroy({where: {id: Number(req.params.campusId)}})
    .catch(next)
})
