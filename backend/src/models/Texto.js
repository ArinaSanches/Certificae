const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const TextoSchema = new mongoose.Schema({
    id_evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
        required: true,
    },
    texto: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

TextoSchema.plugin(mongoosePaginate);

mongoose.model('Texto', TextoSchema);
