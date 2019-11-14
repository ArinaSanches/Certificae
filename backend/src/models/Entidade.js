const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const EntidadeSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

EntidadeSchema.plugin(mongoosePaginate);

mongoose.model('Entidade', EntidadeSchema);
