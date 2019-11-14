const mongoose = require('mongoose');
const Entidade = mongoose.model('Entidade');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const entidades = await Entidade.paginate({}, { page, limit: 10 });
        return res.json(entidades);
    },

    async store(req, res) {
        const entidade = await Entidade.create(req.body);
        return res.json(entidade);
    },

    async show(req, res) {
        const entidade = await Entidade.findById(req.params.id);
        return res.json(entidade);
    },

    async update(req, res) {
        const entidade = await Entidade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(entidade);
    },

    async destroy(req, res) {
        await Entidade.findByIdAndRemove(req.params.id);
        return res.status(200).send("ok");
    },
};