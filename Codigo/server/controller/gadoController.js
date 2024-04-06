import * as gadoServices from '../services/gadoServices.js'

async function getAll(req, res){
    try {
        const gado = await gadoServices.getAll();

        if(!gado) throw new Error('Nenhum gado encontrado');

        res.status(200).json(gado);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

export {
    getAll
}

