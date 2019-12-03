const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const EventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        required: true,
    },
    id_entidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entidade',
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

EventoSchema.plugin(mongoosePaginate);

mongoose.model('Evento', EventoSchema);
