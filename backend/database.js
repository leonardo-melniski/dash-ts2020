const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`sqlite::/opt/database/result-2.db`);
(async function() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}) ()

module.exports = sequelize.define('verbnet', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    alg: {
        type: DataTypes.STRING
    },
    word: {
        type: DataTypes.STRING
    },
    summ: {
        type: DataTypes.STRING
    },
    result: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});