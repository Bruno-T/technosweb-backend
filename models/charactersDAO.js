const DB = require('../models/database');

module.exports = {

	getCharacters() {
		return DB.accessor.query('SELECT * FROM characters')
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		});
	},

	getCharacterOne(id) {
		return DB.accessor.query(
			'SELECT * FROM characters WHERE id = $(characterID)',
			{ characterID: id }
			)
		.then((result) => {
			return result [0]
		})
		.catch((error) => {
			throw error;
		});
	},

	postCharacter(name, classe, user_id, position) {
		return DB.accessor.query(
			'INSERT INTO characters(name, user_id, class, position) values ($(characterName), $(userID), $(classChar), POINT(${x}, ${y})) RETURNING *',
			{ 
				characterName:name, 
				classChar:classe,
				userID:user_id, 
				x:position.x,
				y:position.y
			}
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	deleteCharacter(id) {
		return DB.accessor.query(
			'DELETE FROM characters WHERE id = $(characterID)',
			{
				characterID:id
			}
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	putCharacter(id, name, classe, user_id, position) {
		return DB.accessor.query(
			'UPDATE characters SET name = $(characterName), class = $(classChar), user_id = $(userID), position = POINT(${x}, ${y}) WHERE id = $(characterID) RETURNING *',
			{ 
				characterName: name, classChar:classe, userID:user_id, x:position.x, y:position.y, characterID:id
			}
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	getCharactersWithClass(classe){
		return DB.accessor.query(
			'SELECT * from characters WHERE class = $(classChar)',
			{
				classChar : classe
			}
			)
		.then((result)=>{
			return result;
		})
		.catch((error) =>{
			throw error;
		})
	},

	getAlliesInRadius(id, radius){
		return DB.accessor.query(
			'SELECT characters.* FROM characters, users '
			+ 'WHERE users.id = characters.user_id AND users.alliance_id = '
			+ '(SELECT users.alliance_id FROM users, characters '
			+ 'WHERE users.id = characters.user_id AND characters.id = $(characterID)) '
			+ 'AND characters.id <> $(characterID) '
			+ 'AND (acos( '
			+ 'sin(radians(characters.position[0])) '
			+ '* sin(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID)))) '
			+ '+ cos(radians(characters.position[0]))'
			+ '* cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID))))'
			+ '* cos(radians((SELECT characters.position[1] FROM characters WHERE id = $(characterID))) - radians(characters.position[1]))'
			+ ')'
			+ '* 6371) < $(allyRadius) ORDER BY acos ( '
			+ 'sin(radians(characters.position[0])) '
			+ '* sin(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID)))) '
			+ '+ cos(radians(characters.position[0]))'
			+ '* cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID))))'
			+ '* cos(radians((SELECT characters.position[1] FROM characters WHERE id = $(characterID))) - radians(characters.position[1]))'
			+ ')',
			{
				characterID : id,
				allyRadius: radius/1000,
			}
			)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	getEnnemiesInRadius(id, radius){
		return DB.accessor.query(
			'SELECT characters.* FROM characters, users '
			+ 'WHERE users.id = characters.user_id AND users.alliance_id <> '
			+ '(SELECT users.alliance_id FROM users, characters '
			+ 'WHERE users.id = characters.user_id AND characters.id = $(characterID)) '
			+ 'AND characters.id <> $(characterID) '
			+ 'AND (acos( '
			+ 'sin(radians(characters.position[0])) '
			+ '* sin(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID)))) '
			+ '+ cos(radians(characters.position[0]))'
			+ '* cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID))))'
			+ '* cos(radians((SELECT characters.position[1] FROM characters WHERE id = $(characterID))) - radians(characters.position[1]))'
			+ ')'
			+ '* 6371) < $(enemyRadius) ORDER BY acos ( '
			+ 'sin(radians(characters.position[0])) '
			+ '* sin(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID)))) '
			+ '+ cos(radians(characters.position[0]))'
			+ '* cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(characterID))))'
			+ '* cos(radians((SELECT characters.position[1] FROM characters WHERE id = $(characterID))) - radians(characters.position[1]))'
			+ ')',
			{
				characterID : id,
				enemyRadius: radius/1000,
			}
			)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	}

};

