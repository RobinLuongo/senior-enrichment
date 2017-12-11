const router = require('express').Router();
const { Student } = require('../db/models');

module.exports = router;

router.get('/', function(req, res, next) {
  Student.findAll()
    .then(students => {
      res.json(students)
    })
    .catch(next);
})

router.get('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
    .then(student => res.json(student))
    .catch(next)
})

router.delete('/:studentId', (req, res, next) => {
  const id = req.params.studentId

  Student.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})

router.post('/new-student', (req, res, next) => {
  Student.create(req.body)
    .then((campus) => res.json(campus))
    .catch(next)
})

router.put('/edit', (req, res, next) => {
  const studentId = req.body.id;

  Student.findById(studentId)
    .then(student => student.update(req.body))
    .then(student => res.json(student))
    .catch(next);
})

router.delete('/:studentId', (req, res, next) => {
  Student.destroy({where: {id: Number(req.params.studentId)}})
    .catch(next)
})
