const express = require('express');
const routes = express.Router();

const EntidadeController = require('./controllers/EntidadeController');
const EventoController = require('./controllers/EventoController');
const ParticipacaoController = require('./controllers/ParticipacaoController');
const TextoController = require('./controllers/TextoController');
const CertificadoController = require('./controllers/CertificadoController');

routes.get('/entidade', EntidadeController.index);
routes.post('/entidade', EntidadeController.store);
routes.get('/entidade/:id', EntidadeController.show);
routes.put('/entidade/:id', EntidadeController.update);
routes.delete('/entidade/:id', EntidadeController.destroy);

routes.get('/evento', EventoController.index);
routes.post('/evento', EventoController.store);
routes.get('/evento/:id', EventoController.show);
routes.put('/evento/:id', EventoController.update);
routes.delete('/evento/:id', EventoController.destroy);

routes.get('/participacao', ParticipacaoController.index);
// routes.get('/participacao/:cpf', ParticipacaoController.indexCpf);
routes.post('/participacao', ParticipacaoController.store);
routes.get('/participacao/:id', ParticipacaoController.show);
routes.put('/participacao/:id', ParticipacaoController.update);
routes.delete('/participacao/:id', ParticipacaoController.destroy);

routes.get('/texto', TextoController.index);
routes.post('/texto', TextoController.store);
routes.get('/texto/:id', TextoController.show);
routes.put('/texto/:id', TextoController.update);
routes.delete('/texto/:id', TextoController.destroy);

routes.get('/certificados', CertificadoController.index);

module.exports = routes;