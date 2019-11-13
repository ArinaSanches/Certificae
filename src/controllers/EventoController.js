const mongoose = require('mongoose');
const Evento = mongoose.model('Evento');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const eventos = await Evento.paginate({}, { page, limit: 10 });
        return res.json(eventos);
    },

    async store(req, res) {
        const evento = await Evento.create(req.body);
        return res.json(evento);
    },

    async show(req, res) {
        const evento = await Evento.findById(req.params.id);
        return res.json(evento);
    },

    async update(req, res) {
        const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(evento);
    },

    async destroy(req, res) {
        await Evento.findByIdAndRemove(req.params.id);
        return res.status(200).send("ok");
    },
};