const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const TextoSchema = new mongoose.Schema({
    id_evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
    },
    texto: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

TextoSchema.plugin(mongoosePaginate);
//autoIncrement.initialize('Number');
//TextoSchema.plugin(autoIncrement.plugin, 'Texto');

TextoSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'numero'});

mongoose.model('Texto', TextoSchema);
