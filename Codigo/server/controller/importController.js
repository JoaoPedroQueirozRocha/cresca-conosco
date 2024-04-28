import * as importServices from '../services/importServices.js';

async function insertMultiple(req, res) {
    try {
        const { headers, data } = req.body;
        const { tableName } = req.params;

        const insert = await importServices.insertMultiple(headers, data, tableName);
        res.status(200).json(insert);
    } catch (e) {
        console.error(e);
        res.status(e.status).send(e.message);
    }
}

export {
    insertMultiple
}