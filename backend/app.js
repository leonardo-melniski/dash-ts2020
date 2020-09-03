const express = require('express');
const app = express();
const { Op } = require('sequelize');

const models = require('./database');

app.use('/api/:offset', async (req, res) => {
    const offset = Number(req.params.offset);
    const ids = [1, 10001, 20001, 30001, 40001, 50001, 60001].map(it => it + offset);
    const result = await models.findAll({
        attributes: ['id', 'alg', 'word', 'summ'],
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });
    
    res.status(200).send(result);
});

module.exports = app;
