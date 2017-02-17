var express = require('express');
var router = express.Router();
const alliancesDAO = require('../models/alliancesDAO');

router.get('/', function(req, res, next) {
	alliancesDAO.getAlliances()
	.then((alliances) => {
		res.status(200)
		.json({
			status: 'success',
			alliances: alliances
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});

router.get('/:id', function(req, res, next){
	var id = parseInt(req.params.id);
	alliancesDAO.getAllianceOne(id)
	.then((alliance) => {
		res.status(200)
		.json({
			status: 'success',
			alliance: alliance
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});

router.post('/', function(req, res, next){
	var name = req.body.alliance.name;
	if(name == undefined)
		res.status(402);
	alliancesDAO.postAlliance(name)
	.then((alliance) => {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted one alliance',
			alliance:alliance
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});

router.delete('/:id', function(req, res, next){
	var id = parseInt(req.params.id);
	alliancesDAO.deleteAlliance(id)
	.then((alliance) => {
		res.status(200)
		.json({
			status: 'success',
			message: []
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});

router.put('/:id', function(req, res, next){
	var id = parseInt(req.params.id);
	var name = req.body.alliance.name;
	alliancesDAO.putAlliance(id, name)
	.then((alliance) => {
		res.status(200)
		.json({
			status: 'success',
			message: 'modified a alliance',
			alliance: alliance
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});


router.get('/:id/users', function(req,res,next){
	var id = parseInt(req.params.id);
	alliancesDAO.getAllianceUsers(id)
	.then((users) => {
		res.status(200)
		.json({
			status: 'success',
			users: users
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});


router.get('/:id/characters', function(req,res,next){
	var id = parseInt(req.params.id);
	alliancesDAO.getAllianceCharacters(id)
	.then((characters) => {
		res.status(200)
		.json({
			status: 'success',
			characters: characters
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});

router.get('/:id/characters/:class', function(req,res,next){
	var id = parseInt(req.params.id);
	var classe = req.params.class
	alliancesDAO.getAllianceCharactersWithClass(id, classe)
	.then((characters) => {
		res.status(200)
		.json({
			status: 'success',
			characters: characters
		});
	})
	.catch((error) =>
		res.status(500)
		.json({
			status: 'Error',
			message: error
		})
		)
});

module.exports = router;