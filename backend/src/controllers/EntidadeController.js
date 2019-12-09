const mongoose = require('mongoose');
const Entidade = mongoose.model('Entidade');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const entidades = await Entidade.paginate({}, { page, limit: 10 });
        return res.json(entidades);
    },

    async store(req, res) {
        var entidade = req.body;
        var existe = await Entidade.find({'login': entidade.login});
        // console.log(existe);
        if(existe.length === 0) {
            entidade['foto'] = req.file['filename'];
            entidade = await Entidade.create(entidade);

            const token = jwt.sign({id: entidade._id}, authConfig.secret, {
                expiresIn: 86400,
            });

            res.send({entidade, token});
        } else {
            res.status(400).send({"error": "Este e-mail já existe!"});
        }
        
    },

    async show(req, res) {
        const entidade = await Entidade.findById(req.params.id);
        return res.json(entidade);
    },

    async update(req, res) {
        var entidade = req.body;
        try {
            entidade['foto'] = req.file['filename'];
        } finally {
            entidade = await Entidade.findByIdAndUpdate(req.params.id, req.body, { new: true });   
        }
        return res.json(entidade);
    },

    async destroy(req, res) {
        await Entidade.findByIdAndRemove(req.params.id);
        console.log("AAAAAA");
        console.log(req);
        return res.status(200).send("ok");
    },

    async authenticate(req, res) {
        const {login, password} = req.body;

        const entidade = await Entidade.findOne({login});

        if(!entidade)
            return res.status(400).send({'error': 'User not found'});
        
        if(!(password == entidade.password))
            return res.status(400).send({'error': 'Invalid password'});

        entidade.password = undefined;

        const token = jwt.sign({id: entidade._id}, authConfig.secret, {
            expiresIn: 86400,
        });

        res.send({entidade, token});
    }   
};