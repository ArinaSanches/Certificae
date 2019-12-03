const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const EventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: false,
    },
    dataInicio: {
        type: Date,
        required: true,
    },
    dataFim: {
        type: Date,
        required: true,
    },
    id_entidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entidade',
    },
    foto: {
        type: String,
        required: false,
    },
    background: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

EventoSchema.plugin(mongoosePaginate);

mongoose.model('Evento', EventoSchema);
