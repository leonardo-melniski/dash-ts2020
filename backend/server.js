
const cors = require('cors');
const express = require('express');
const app = express();
const { Op } = require('sequelize');
const models = require('./database');

app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/:offset', async (req, res) => {
    const offset = Number(req.params.offset);
    const ids = [1, 10001, 20001, 30001, 40001, 50001, 60001].map(it => it + offset);
    const result = await models.findAll({
        attributes: ['id', 'alg', 'word', 'summ', 'result'],
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });
    res.status(200).send(result);
});

app.listen('8080', '0.0.0.0')
