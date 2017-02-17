var express = require('express');
var router = express.Router();
const charactersDAO = require('../models/charactersDAO');

router.get('/', function(req, res, next) {
  charactersDAO.getCharacters()
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

router.get('/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  charactersDAO.getCharacterOne(id)
  .then((character) => {
    res.status(200)
    .json({
      status: 'success',
      character: character
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
	var name = req.body.character.name;
	var classe = req.body.character.class;
	var position = req.body.character.position;
	var user_id = parseInt(req.body.character.user_id);
	charactersDAO.postCharacter(name, classe, user_id, position)
  .then((character) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one character',
      character: character
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
	charactersDAO.deleteCharacter(id)
  .then((character) => {
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
	var name = req.body.character.name;
  var classe = req.body.character.class;
  var position = req.body.character.position;
  var user_id = parseInt(req.body.character.user_id);
  charactersDAO.putCharacter(id, name, classe, user_id, position)
  .then((character) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'modified a character',
      character: character
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

router.get('/all/:class', function(req,res,next)
{
  var classe = req.params.class;
  charactersDAO.getCharactersWithClass(classe)
  .then((characters) =>{
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
      message: 'error'
    })
    )
});

router.get('/:id/allies/:radius', function(req,res,next)
{
  var id = parseInt(req.params.id);
  var radius = parseInt(req.params.radius);
  charactersDAO.getAlliesInRadius(id, radius)
  .then((characters) =>{
    res.status(200)
    .json({
      status: 'success',
      characters: characters
    })
  })
  .catch((error) => 
    res.status(500)
    .json({
      status: 'Error',
      message: 'error'
    })
    )
});

router.get('/:id/ennemies/:radius', function(req,res,next)
{
  var id = parseInt(req.params.id);
  var radius = parseInt(req.params.radius);
  charactersDAO.getEnnemiesInRadius(id, radius)
  .then((characters) =>{
    res.status(200)
    .json({
      status: 'success',
      characters: characters
    })
  })
  .catch((error) => 
    res.status(500)
    .json({
      status: 'Error',
      message: 'error'
    })
    )
});


module.exports = router;