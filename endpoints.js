const {response} = require("express");
const {MongoClient} = require("mongodb");
const path = require('path');

const fields = [
	'nome',
	'cargo',
	'data',
	'estado_civil',
	'sexo',
	'email',
	'cel',
	'fixo',
	'cep',
	'rua',
	'numero',
	'complemento',
	'bairro',
	'cidade',
	'estado',
	'identodade',
	'cpf',
	'habilitacao',
	'veiculo',
];

const requireds = [
	'nome',
	'cep',
	'cargo',
	'data',
	'email',
	'cel',
	'cep',
	'rua',
	'numero',
	'bairro',
	'cidade',
	'estado',
	'identidade',
	'cpf',
	'habilitacao',
	'veiculo',
];

module.exports = function (app, db) {
	let resumeCollection = db.collection('resumes')

	// GET Form
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '/index.html'))
	})

	// POST Cadastro
	app.post('/cadastro', (req, res, next) => {
		/*
		#swagger.parameters['nome'] = {
				in: 'body',
				required: true,
				type: 'string',
				description: 'John Doe'
		}
		#swagger.parameters['cargo'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['data'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['estado_civil'] = {
				in: 'body',
				required: false,
				type: 'string',
		}
		#swagger.parameters['sexo'] = {
				in: 'body',
				required: false,
				type: 'string',
		}
		#swagger.parameters['email'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['cel'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['fixo'] = {
				in: 'body',
				required: false,
				type: 'string',
		}
		#swagger.parameters['cep'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['rua'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['numero'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['complemento'] = {
				in: 'body',
				required: false,
				type: 'string',
		}
		#swagger.parameters['bairro'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['cidade'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['estado'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['identidade'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['cpf'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['habilitacao'] = {
				in: 'body',
				required: true,
				type: 'string',
		}
		#swagger.parameters['veiculo'] = {
				in: 'body',
				required: true,
				type: 'string',
		}

		*/

		// Remove campos não solicitados
		Object.keys(req.body).forEach(key => {
			if (!(fields.includes(key))) {
				delete req.body[key]
			}
		});
		// Verifica os campos obrigatórios
		Object.entries(req.body).forEach(entry => {
			const [key, value] = entry;
			if (requireds.includes(key) && value.trim() === '') {
				error = {
					status: 'error',
					message: `O campo ${key} é obrigatório`,
				};
				res.json(error);
			}
		})
		resumeCollection.find({ cpf: req.body.cpf }).limit(1).toArray()
			.then(results => {
				if (Object.keys(results).length === 1){
					error = {
						status: 'error',
						message: `Já tem um cúrriculo cadastrado com esse CPF`,
					};
					res.json(error);
				} else {
					resumeCollection.insertOne(req.body)
						.then(result => {
							resposta = {
								status: 'success',
								message: 'Enviado com sucesso!'
							};
							res.json(resposta)
						})
						.catch(error => {
							resposta = {
								status: 'error',
								message: error
							};
							res.json(resposta)
						})
				}
			})
	})
}