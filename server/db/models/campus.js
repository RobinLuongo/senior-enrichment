const Sequelize = require('sequelize');
const db = require('../../db');

const Campus = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://placem.at/places?w=300&h=400&random=1'
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Campus;
