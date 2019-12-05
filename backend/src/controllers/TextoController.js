const mongoose = require('mongoose');
const Texto = mongoose.model('Texto');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const textos = await Texto.paginate({"numero":req.query.numero}, { page, limit: 10 });
        return res.json(textos);
    },

    async store(req, res) {
        const texto = await Texto.create(req.body);
        return res.json(texto);
    },

    async show(req, res) {
        const texto = await Texto.findById(req.params.id);
        return res.json(texto);
    },

    async update(req, res) {
        const texto = await Texto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(texto);
    },

    async destroy(req, res) {
        await Texto.findByIdAndRemove(req.params.id);
        return res.status(200).send("ok");
    },
};