const mongoose = require('mongoose');
const Participacao = mongoose.model('Participacao');
const Texto = mongoose.model('Texto');


module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const participacoes = await Participacao.paginate({"id_evento":req.query.id_evento}, { page, limit: 10 });
        return res.json(participacoes);
    },

    async indexCpf(req, res) {

        return res.json();
    },

    async store(req, res) {
        const { page = 1 } = req.query;
        const textos = await Texto.paginate({"numero":req.body.texto}, { page, limit: 10 });
        if(textos['docs'].length > 0){
            const participacaoDuplicada = await Participacao.paginate({"nome_pessoa":req.body.nome_pessoa, "cpf":req.body.cpf, "horas":req.body.horas, "texto":req.body.texto},{page, limit:10});
            if(participacaoDuplicada['docs'].length === 0){
                const participacao = await Participacao.create(req.body);
                return res.json(participacao);
            }else{
                return res.status(404).send("Esta participação já foi cadastrada!");
            }
        }else{
            return res.status(404).send("Texto não encontrado");
        }
        
    },

    async show(req, res) {
        const participacao = await Participacao.findById(req.params.id);
        return res.json(participacao);
    },

    async update(req, res) {
        const participacao = await Participacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(participacao);
    },

    async destroy(req, res) {
        await Participacao.findByIdAndRemove(req.params.id);
        return res.status(200).send("ok");
    },
};