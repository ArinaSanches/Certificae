const mongoose = require('mongoose');
const Participacao = mongoose.model('Participacao');
const Evento = mongoose.model('Evento');
const Texto = mongoose.model('Texto');

module.exports = {
    async index(req, res) {
        // checar as querys que pode ser feitas pelos filtros

        // 1. pega as participacoes dele pelo cpf
        const participacoes = await Participacao.find({"cpf": req.params.cpf});
        const texto = await
        console.log(participacoes)
        // 2. pega os textos dele em Textos


        // 3. pega os eventos que ele participou em Eventos

        // montar dicionario de resposta = 


        const { page = 1 } = req.query;
        
        return res.json(participacoes);
    },
};