var express = require('express');
var router = express.Router();
const userDAO = require('../models/userDAO');

router.get('/', function(req, res, next) {
	userDAO.getUsers()
	.then((users) => {
		res.status(200)
		.json({
			status: 'success',
			users: users
		})
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
	userDAO.getUserOne(id)
	.then((user) => {
		res.status(200)
		.json({
			status: 'success',
			user: user
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
	var alliance_id = req.body.user.alliance_id;
	var name = req.body.user.name;
	var email = req.body.user.email;
	userDAO.postUser(name, email, alliance_id)
	.then((user) => {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted one user',
			user: user
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
	userDAO.deleteUser(id)
	.then((user) => {
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
	var alliance_id = req.body.user.alliance_id;
	var name = req.body.user.name;
	var email = req.body.user.email;
	var id = parseInt(req.params.id);

	userDAO.putUser(name, email, alliance_id, id)
	.then((user) => {
		res.status(200)
		.json({
			status: 'success',
			message: 'modified a user',
			user: user
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
	userDAO.getUserCharacters(id)
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
