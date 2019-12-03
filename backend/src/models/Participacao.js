const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ParticipacaoSchema = new mongoose.Schema({
    id_evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
        required: true,
    },
    nome_pessoa: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    horas: {
        type: Number,
        required: true,
    },
    texto: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ParticipacaoSchema.plugin(mongoosePaginate);

mongoose.model('Participacao', ParticipacaoSchema);
