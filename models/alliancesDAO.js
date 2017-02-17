const DB = require('../models/database');

module.exports = {

	getAlliances() {
		return DB.accessor.query('SELECT * FROM alliances')
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		});
	},

	getAllianceOne(id) {
		return DB.accessor.query(
			'SELECT * FROM alliances WHERE id = $(allianceID)',
			{ allianceID: id }
			)
		.then((result) => {
			return result [0]
		})
		.catch((error) => {
			throw error;
		});
	},

	postAlliance(name) {
		console.log(name);
		return DB.accessor.query(
			'INSERT INTO alliances(name) values($(allianceName)) RETURNING *',
			{ allianceName:name }
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	deleteAlliance(id) {
		return DB.accessor.query(
			'DELETE FROM alliances WHERE id = $(allianceID)',
			{
				allianceID:id
			}
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	putAlliance(id, name) {
		return DB.accessor.query(
			'UPDATE alliances SET name = $(allianceName) WHERE id = $(allianceID) RETURNING *',
			{ allianceName: name, allianceID:id 
			}
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	getAllianceUsers(id){
		return DB.accessor.query(
			'SELECT * FROM users WHERE alliance_id = $(allianceID)',
			{
				allianceID:id
			}
			)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	getAllianceCharacters(id){
		return DB.accessor.query(
			'SELECT characters.* from characters, users WHERE users.alliance_id = $(allianceID) AND characters.user_id = users.id',
			{
				allianceID : id
			}
			)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	getAllianceCharactersWithClass(id, classe){
		return DB.accessor.query(
			'SELECT characters.* from characters, users WHERE characters.class = $(classname) AND users.alliance_id = $(allianceID) AND characters.user_id = users.id',
			{
				allianceID : id,
				classname: classe
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

